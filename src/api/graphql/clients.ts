import { authenticatedGraphQLClient } from "@/graphql"
import { GetUserSelectedDayStatusResponse } from "@/types/api/graphql/clients-type"

export const GetUserSelectedDayStatusDocument = `
    query GetUserSelectedDayStatus($HRVDate: String!) {
        GetUserSelectedDayStatus(HRVDate: $HRVDate) 
    }
`

export const getUserSelectedDayStatusApi = async (HRVDate: string): Promise<GetUserSelectedDayStatusResponse> => {
    try{
        const response = await authenticatedGraphQLClient<{GetUserSelectedDayStatus: GetUserSelectedDayStatusResponse}>(GetUserSelectedDayStatusDocument, { HRVDate });

        return response.GetUserSelectedDayStatus;
    }
    catch(error){
        console.error("Get User Selected Day Status Error:", error);
        throw error;
    }
}