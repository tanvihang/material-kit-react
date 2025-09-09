import { ClientError } from "graphql-request"

export const getGraphQLErrorMessage = (error: any): string => {
    if(error instanceof ClientError){
        const firstError = error.response.errors?.[0];

        if(firstError?.message){
            return firstError.message;
        }
    }

    return error.message || "An unknown error occurred";
}