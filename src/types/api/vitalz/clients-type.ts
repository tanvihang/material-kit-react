import { DeviceCompanyEnum, GenderEnum, UserRelationshipEnum } from "@/types/enums";

export type UserListApiType = {
    LoginEmail: string;
    UserName: string;
    AcceptorEmail: string;
    RelationShip: UserRelationshipEnum;
    UserID: string;
    ID: string;
    DeviceCompany: DeviceCompanyEnum;
    CreatedAt: string;
    HPNo: string | null;
    LastSyncAt: string | null;
    UI_Dob: string | null;
    UI_Gender: GenderEnum | null;
    UI_HeightCM: number | null;
    UI_WeightKG: number | null;
    UI_State: string | null;
    UI_Country: string | null;
    UI_BMI: number | null;
    UI_WeightCategory: string | null;
    UI_PhotoURL: string | null;
}

export type UserListResponse = UserListApiType[]