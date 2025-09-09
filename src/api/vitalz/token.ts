import { API_URLS } from "@/config";
import axios from "axios";

const vitalzTokenApi = {
    refreshToken: `${API_URLS.vitalz}/refresh_token`
}

export const refreshTokenApi = async (accessToken: string): Promise<string> => {
    try{
        const response = await axios.post(vitalzTokenApi.refreshToken, {}, {
            headers: {
                Authorization: accessToken
            }
        })

        const newAccessToken = response.data.accessToken;
        return newAccessToken
    }
    catch(error){
        console.error("Refresh Token Error:", error);
        throw error;
    }
}