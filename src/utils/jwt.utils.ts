import jwt from "jsonwebtoken";
import config from "config";
import * as fs from 'fs';

const publicKey = fs.readFileSync(config.get<string>("privateKeyPath"), 'utf-8');

export function signJwt (
    object: Object, 
    options?: jwt.SignOptions | undefined
) {
    
    const privateKeyPath = config.get<string>("privateKeyPath");
    const privateKey = fs.readFileSync(privateKeyPath, 'utf-8');

    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: 'RS256'
    });
}

export function verifyJwt (
    token: string
) {
    try {
    
        const publicKeyPath = config.get<string>("publicKeyPath");
        const publicKey = fs.readFileSync(publicKeyPath, 'utf-8');
    
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded: decoded
        }
    } catch (error : any) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null
        }
    }
}