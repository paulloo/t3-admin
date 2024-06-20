import { encode, decode } from "next-auth/jwt";
import { sys_user } from "@prisma/client";


interface jwtUser {
  user_id: string;
  username: string;
}

export interface AuthUser extends Omit<jwtUser, "password">{}

export const tokenOneDay = 24 * 60 * 60;
export const tokenOnWeek = tokenOneDay * 7 

const craeteJWT = (token:AuthUser, duration: number) => encode({token, secret: process.env.JWT_SECRET || 'secreat', maxAge: duration})

export const jwtHelper = {
  createAcessToken: (token:AuthUser) => craeteJWT(token, tokenOneDay),
  createRefreshToken: (token:AuthUser) => craeteJWT(token, tokenOnWeek),
  verifyToken: (token:string) => decode({token, secret: process.env.JWT_SECRET || 'secreat'})
}