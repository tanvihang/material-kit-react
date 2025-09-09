import useUserStore from "../stores/user-store";

export const UserFacadeGetUserEmail = () => {
    return useUserStore(t => t.userEmail)
}

export const UserFacadeSetUserEmail = (email: string) => {
    useUserStore.getState().setUserEmail(email);
}

export const UserFacadeClearAllUserStore = () => {
    useUserStore.getState().clearAllUserStore();
}
