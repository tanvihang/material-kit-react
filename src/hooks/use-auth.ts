import { loginGraphQLApi, resetPasswordGraphQLApi } from "@/api/graphql/auth"
import { STORAGE_KEYS } from "@/config";
import { UserFacadeClearAllUserStore, UserFacadeSetUserEmail } from "@/store/facade/user-facade";
import { LoginParams, ResetPasswordParams } from "@/types/api/graphql/auth-type"
import { getGraphQLErrorMessage } from "@/utils/graphql/graph-ql-client-util";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAuth = () => {

    const queryClient = useQueryClient();

    const signIn = useMutation({
        mutationFn: (params: LoginParams) => {
            return loginGraphQLApi(params);
        },
        onSuccess: async (data) => {
            localStorage.setItem(STORAGE_KEYS.accessToken, data.AccessToken);
            UserFacadeSetUserEmail(data.LoginEmail);
        },
        onError: (error) => {
            const errorMessage = getGraphQLErrorMessage(error);
            throw new Error(errorMessage, { cause: error } );
        }
    })

    const signOut = useMutation({
        mutationFn: async() => {
            localStorage.removeItem(STORAGE_KEYS.accessToken);
        },
        onSuccess: () => {
            UserFacadeClearAllUserStore();
            queryClient.clear();
        }
    })

    const resetPassword = useMutation({
        mutationFn: (params: ResetPasswordParams) => {
            return resetPasswordGraphQLApi(params);
        },
        onSuccess: (data) => {
            console.log("Reset Password Successful:", data);
        },
        onError: (error) => {
            const errorMessage = getGraphQLErrorMessage(error);
            throw new Error(errorMessage, { cause: error } );
        }
    })

    return {
        signIn,
        signOut,
        resetPassword
    }
}