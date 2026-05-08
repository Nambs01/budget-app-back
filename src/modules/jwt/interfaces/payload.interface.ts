export interface IToken {
    token: string;
    userId: number;
}

export interface IJwtPayload {
    id: number;
    email: string;
}
