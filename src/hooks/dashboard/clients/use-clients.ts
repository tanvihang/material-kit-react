import { getUserSelectedDayStatusApi } from "@/api/graphql/clients";
import { getUserListApi } from "@/api/vitalz/clients";
import { QUERY_KEYS } from "@/config/query-key";
import { ClientsType } from "@/types/clients/clients-type";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useMemo } from "react";

export const useClients = () => {

    const today = dayjs()

    const getUserListQuery = useQuery({
        queryKey: QUERY_KEYS.clients.userList,
        queryFn: async() => {
            return getUserListApi();
        },
        staleTime: 1000 * 60 * 10, // Data is fresh for 10 minutes
        refetchInterval: 1000 * 60 * 10, // Refetch every 10 minutes
        refetchIntervalInBackground: true, // Continue refetching even when tab is not active
        refetchOnWindowFocus: false, // Don't refetch when window gains focus (since we have interval)
    })

    const getUserSelectedDayStatusQuery = useQuery({
        queryKey: QUERY_KEYS.clients.userSelectedDayStatus(today.format("YYYY-MM-DD")),
        queryFn: () => {
            return getUserSelectedDayStatusApi(today.format("YYYY-MM-DD"))
        },
        staleTime: 1000 * 60 * 10, // Data is fresh for 10 minutes
        refetchInterval: 1000 * 60 * 10, // Refetch every 10 minutes
        refetchIntervalInBackground: true, // Continue refetching even when tab is not active
        refetchOnWindowFocus: false, // Don't refetch when window gains focus (since we have interval)
    })

    //* Combine data with memo
    const clientList: ClientsType[] = useMemo(() => {
        if(!getUserListQuery.data || !getUserSelectedDayStatusQuery.data){
            return [];
        }

        const userList = getUserListQuery.data;
        const userStatusList = getUserSelectedDayStatusQuery.data;

        const combined: ClientsType[] = userList.map(user => {
            const statusForDay = userStatusList.find(status => status.LoginEmail === user.LoginEmail);

            
            if(!statusForDay){
                return user;
            }

            const updatedUser: ClientsType = {
                ...user,
                HRVDate: statusForDay?.HRVDate,
                VitalzScore: statusForDay?.VitalzScore,
                ScoreType: statusForDay?.ScoreType,
                Alarm: statusForDay?.Alarm || false
            }

            return updatedUser;
        })

        return combined;

    }, [getUserListQuery.data, getUserSelectedDayStatusQuery.data])


    const isLoading = getUserListQuery.isLoading || getUserSelectedDayStatusQuery.isLoading;
    const isError = getUserListQuery.isError || getUserSelectedDayStatusQuery.isError;
    const error = getUserListQuery.error || getUserSelectedDayStatusQuery.error;
    

    return {
        clientList,
        isLoading,
        isError,
        error,
        
    };
}