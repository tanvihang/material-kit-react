import { create } from "zustand";

type UserState = {
    userEmail: string;
}

type UserAction = {
    setUserEmail: (email: string) => void;
    
    clearAllUserStore: () => void;
}

const initialState: UserState = {
    userEmail: ''
}

const useUserStore = create<UserState & UserAction>((set) => ({
    ...initialState,
    setUserEmail: (email: string) => set(() => ({ userEmail: email })),
    clearAllUserStore: () => set(() => ({ ...initialState }))
}))

export default useUserStore;
