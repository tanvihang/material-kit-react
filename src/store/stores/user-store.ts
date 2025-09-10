
import { UserTypeEnum } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type UserState = {
    userEmail: string;
    userType: UserTypeEnum;
}

type UserAction = {
    setUserEmail: (email: string) => void;
    setUserType: (type: UserTypeEnum) => void;
    
    clearAllUserStore: () => void;
}

const initialState: UserState = {
    userEmail: '',
    userType: UserTypeEnum.USER
}

//* Persisted to localStorage - non-sensitive info only
const useUserStore = create<UserState & UserAction>()(
    devtools(
        persist(
            (set) => ({
                ...initialState,
                setUserEmail: (email: string) => set(() => ({ userEmail: email })),
                setUserType: (type: UserTypeEnum) => set(() => ({ userType: type })),
                clearAllUserStore: () => set(() => ({ ...initialState }))
            }),
            {
                name: 'user-store'
            }
        )
    )
)



export default useUserStore;
