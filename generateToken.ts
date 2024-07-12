import jwt from "jsonwebtoken";

export interface UserPayload {
    userId: number;
    name: string;
    permissions: string[];
}

//This must be an environment variable outside of practice
const SECRET = "umafrasemuitograndeparaadivinhar";

export function generateToken (payload: UserPayload): string {
    const EXPIRES_IN_ONE_HOUR = 60*60;
    return jwt.sign(payload, SECRET, {
        expiresIn: EXPIRES_IN_ONE_HOUR,
    })
}