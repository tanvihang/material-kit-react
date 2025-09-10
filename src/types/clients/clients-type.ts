import { UserListApiType } from "../api/vitalz/clients-type";

export type ClientsType = {
    HRVDate?: string;
    VitalzScore?: string;
    ScoreType?: string;
    Alarm?: boolean;
} & UserListApiType