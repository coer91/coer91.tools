export interface ILoginResponse { 
    userId: number; 
    user: string;
    userNumber: string;   
    role: string;
    partner: string;
    fullName: string;
    nickname: string;
    email: string;
    jwt: string; 
    message: string;
    roles: string[];
}