import { API_URLS } from "@/config";
import apiClient from "../api-client";
import { UserListResponse } from "@/types/api/vitalz/clients-type";

const clientsApi = {
    getUserList: `${API_URLS.vitalz}/getuserList`
}

export const getUserListApi = async (): Promise<UserListResponse> => {
    try{
        const response = await apiClient.get<UserListResponse>(clientsApi.getUserList);

        return response.data;

    }
    catch(error){
        console.error("Get User List Error", error)
        throw error;
    }
}