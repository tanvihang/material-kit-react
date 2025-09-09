import { refreshTokenApi } from "@/api/vitalz/token";
import { STORAGE_KEYS } from "@/config";
import { ClientError, GraphQLClient } from "graphql-request";

export const graphQLClient = new GraphQLClient(
    process.env.NEXT_PUBLIC_VITALZ_GRAPHQL_API_URL as string,
    {
        headers: {
            'Content-Type': 'application/json',
        }
    }
)

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async(): Promise<string> => {
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = (async () => {
        try{
            const currentToken = localStorage.getItem(STORAGE_KEYS.accessToken);
            if(!currentToken){
                throw new Error("No access token found");
            }

            const newAccessToken = await refreshTokenApi(currentToken);

            localStorage.setItem(STORAGE_KEYS.accessToken, newAccessToken);
            
            return newAccessToken;
        } catch(error){
            localStorage.removeItem(STORAGE_KEYS.accessToken);
            
            throw error;
        } finally {
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}

export const unauthenticatedGraphQLClient = async<T = any> (graphQLDocument: string, variables?: any): Promise<T> => {
    try{
        return await graphQLClient.request<T>(graphQLDocument, variables);
    }catch (error: unknown){

        console.log("GraphQL Error:", error);
        if(error.response.status === 401){
            localStorage.removeItem(STORAGE_KEYS.accessToken);      
        }
        throw error;
    }
}

export const authenticatedGraphQLClient = async <T = any>(
    graphQLDocument: string, 
    variables?: any
): Promise<T> => {
    const makeRequest = async (token: string): Promise<T> => {
        graphQLClient.setHeader('Authorization', `Bearer ${token}`);
        return await graphQLClient.request<T>(graphQLDocument, variables);
    };

    try {
        const token = localStorage.getItem(STORAGE_KEYS.accessToken);

        if (!token) {
            throw new Error('No access token available');
        }

        return await makeRequest(token);
    } catch (error: any) {
        console.log("Authenticated GraphQL Error:", error);
        
        // 检查是否是认证错误
        const isAuthError = error instanceof ClientError && 
            error.response?.errors?.some((err: any) => 
                ['UNAUTHENTICATED', 'UNAUTHORIZED'].includes(err.extensions?.code)
            ) || error.response?.status === 401;

        if (isAuthError) {
            try {
                console.log("Attempting to refresh token...");
                
                // 尝试刷新 token
                const newToken = await refreshAccessToken();
                
                console.log("Token refreshed successfully, retrying request...");
                
                // 用新 token 重试请求
                return await makeRequest(newToken);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                throw refreshError;
            }
        }

        // 非认证错误，直接抛出
        throw error;
    }
};