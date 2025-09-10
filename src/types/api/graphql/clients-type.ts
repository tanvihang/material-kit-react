type GetUserSelectedDayStatusItemApiType = {
    ID: string;
    UserID: string;
    HRVDate: string;
    LoginEmail: string;
    Relationship: string;
    FollowingUserID: string;
    ScoreType: string;
    Alarm: boolean;
    VitalzScore: string;
}

export type GetUserSelectedDayStatusResponse = GetUserSelectedDayStatusItemApiType[];