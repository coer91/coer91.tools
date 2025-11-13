import type { ILoginResponse } from "./login-response.interface";

export interface IUserStorage extends ILoginResponse { 
    remember: boolean,
    logOutMessage?: string;
}