import { unauthenticatedGraphQLClient } from "@/graphql"
import { LoginParams, LoginResponse, ResetPasswordParams, ResetPasswordResponse } from "@/types/api/graphql/auth-type"

const LoginDocument = `
    mutation Login($email: String!, $password: String!) {  
    login(email: $email, password: $password)
    }

`

export const loginGraphQLApi = async(params: LoginParams): Promise<LoginResponse> => {
    try{
        const response = await unauthenticatedGraphQLClient<{login: LoginResponse}>(LoginDocument, params);

        return response.login;
    }
    catch(error){
        console.error("Login Error:", error);
        throw error;
    }
}

const ResetPasswordDocument = `
    mutation resetPassword($email: String!){
        resetPassword(email: $email)   
    }
`

export const resetPasswordGraphQLApi = async (params: ResetPasswordParams): Promise<ResetPasswordResponse> => {
    try{
        const response = await unauthenticatedGraphQLClient<{resetPassword: ResetPasswordResponse}>(ResetPasswordDocument, params);

        return response.resetPassword;
    }
    catch(error){
        console.error("Reset Password Error:", error);
        throw error;
    }
}