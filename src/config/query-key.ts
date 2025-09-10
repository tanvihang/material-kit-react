export const QUERY_KEYS = {
    clients: {
        userList: ['clients', 'userList'] as const,
        userSelectedDayStatus: (date: string) => ['clients', 'userSelectedDayStatus', date] as const
    }
}