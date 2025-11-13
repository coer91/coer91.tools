export interface IJWT {
    jwt: string;
    expirationDate: Date | null;
    timeRemaining: number;
    isExpired: boolean;
}