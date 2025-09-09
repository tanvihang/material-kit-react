import { fetchUserInfoByLoginContextApi } from "@/api/graphql/user"
import { useMutation } from "@tanstack/react-query"

export const useAppInitialization = () => {

    const fetchUserInfoByLoginContext = useMutation({
        mutationFn: async() => {
            return fetchUserInfoByLoginContextApi();
        },
        onSuccess: (data) => {
            console.log("Fetch User Info By Login Context Successful:", data);
        },
        onError: (error) => {
            console.error("Fetch User Info By Login Context Error:", error);
        }
    })

    const initializeApp = useMutation({
        mutationFn: async() => {
            const results = await Promise.allSettled([
                fetchUserInfoByLoginContext.mutateAsync()
            ]);

            const errors = results.filter((result) => result.status === 'rejected');
            if (errors.length > 0) {
                throw new Error('One or more initialization tasks failed.');
            }

            return results;
        }
    })

    return {
        initializeApp
    }

}