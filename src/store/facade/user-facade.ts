import { UserTypeEnum } from "@/types";
import useUserStore from "../stores/user-store";

export const UserFacadeGetUserEmail = () => {
    return useUserStore(t => t.userEmail)
}

export const UserFacadeSetUserEmail = (email: string) => {
    useUserStore.getState().setUserEmail(email);
}

export const UserFacadeGetUserType = () => {
    return useUserStore(t => t.userType)
}

export const UserFacadeSetUserType = (type: UserTypeEnum) => {
    useUserStore.getState().setUserType(type);
}

export const UserFacadeClearAllUserStore = () => {
    useUserStore.getState().clearAllUserStore();
}
