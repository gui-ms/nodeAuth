import jwt from "jsonwebtoken";

export interface UserPayload {
    userId: number;
    name: string;
    permissions: string[];
}

//This must be an environment variable outside of practice
export const JWT_SECRET = "umafrasemuitograndeparaadivinhar";

export function generateToken (payload: UserPayload): string {
    const EXPIRES_IN_ONE_HOUR = 60*60;
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: EXPIRES_IN_ONE_HOUR,
    })
}