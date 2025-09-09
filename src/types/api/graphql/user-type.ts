import { GenderEnum, UserTypeEnum } from "@/types/enums";

export type UserInfoByLoginContextResponse = {
CreatedAt?: Date;
  CreatedBy?: Date;
  HPNo?: string;
  ID?: string;
  IsResearcher: false;
  LoginEmail?: string;
  ModifiedAt?: Date;
  ModifiedBy?: Date;
  UserInfo: UserInfoTypes;
  UserName?: string;
  UserType?: UserType;
  PhotoURL?: string;
}


export type UserInfoTypes = {
  Address1?: string;
  Address2?: string;
  City?: string;
  Country?: string;
  CountryCode?: string;
  Dob?: string;
  Gender?: GenderEnum;
  HeightCM?: number;
  ID?: string;
  ModifiedAt?: Date;
  NRIC?: string;
  Passport?: string;
  PersonName?: string;
  PhotoURL?: string;
  Postcode?: string;
  State?: string;
  StateCode?: string;
  UserID?: string;
  WeightKG?: number;
}

type UserType = {
  ID: string;
  Subject: UserTypeEnum;
}