'use server'

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function storeToken({token, user}: AuthSuccessResponse) {
    const cookie = await cookies()
    const webToken = jwt.sign(token, `${process.env.NEXT_JWT_SECRET}`)

    cookie.set('token', webToken, { httpOnly: true, sameSite: 'strict' })
    cookie.set('user', JSON.stringify(user), { httpOnly: true, sameSite: 'strict' })

    return {
        status: 200,
        message: 'Token stored'
    }

}