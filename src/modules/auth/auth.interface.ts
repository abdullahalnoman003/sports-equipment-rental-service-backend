export interface ILoginUser {
    email: string;
    password: string;
}
export interface IRegisterUser {
    name : string;
    email: string;
    password: string;
    role: "CUSTOMER" | "PROVIDER" ;
}

export interface IGoogleUser {
    /** Google ID token issued to the browser. Verified server side. */
    idToken: string;
    role?: "CUSTOMER" | "PROVIDER";
}

export interface UserInfo{
    id: string;
    email: string;
    role: string;
}