'use server'
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function storeToken(userData: LoginResponse){
    const cookie = await cookies()
    const webToken = jwt.sign(userData, `${process.env.NEXT_JWT_SECRET}`, {expiresIn: "24h"})
    cookie.set('token', webToken, {httpOnly: true, sameSite: 'strict'})

    return {
        status: 200,
        message: 'Token stored'
    }

}