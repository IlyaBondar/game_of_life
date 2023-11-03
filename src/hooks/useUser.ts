import { DEFAULT_USER } from "@/utils/constants";
import { useUser as useAuth0User } from "@auth0/nextjs-auth0/client";

export const useUser = () => {
    const { user } = useAuth0User();
    return user?.nickname ?? DEFAULT_USER;
}