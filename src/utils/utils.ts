import { DEFAULT_USER } from "./constants";

export const generateUserKey = (userName?:string) => btoa(userName ?? DEFAULT_USER);