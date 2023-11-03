import { DEFAULT_USER } from "./constants";

export const generateUserKey = (userName?:string) => encodeURIComponent(userName ?? DEFAULT_USER);
