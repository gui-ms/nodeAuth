import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET, UserPayload } from "./generateToken";
import path from "path";
import { httpStatusCode } from ".";


// Here we gotta verify if user has authorization on header;
// validate token;
export function authMiddleware (req: Request, res: Response, next: NextFunction){
    const authorization = req.headers.authorization;

    if(!authorization){
        return res.status(httpStatusCode.badRequest).json({message: "Token não informado"})
    }

    const token = authorization.replace("Bearer",'');

    if(!token) {
        return res.status(httpStatusCode.badRequest).json({message: "Token inválido!"})
    }

    try {
        jwt.verify(token, JWT_SECRET)
    } catch (error) {
        res.status(httpStatusCode.unauthorized).json({message: "Token inválido!"})
    }

    next();
}

// verify if user has permission
export function permissionMiddleware(req: Request, res: Response, next: NextFunction) {
    const path = req.path.replace('/','')
    const token = req.headers.authorization?.replace("Bearer",'') ?? "";
    const payload = jwt.decode(token) as UserPayload;

    if(!payload.permissions.includes(path)) {
        res.status(httpStatusCode.unauthorized).json({message: "Usuário não tem permissão de acesso!"})
    };

    next();
}