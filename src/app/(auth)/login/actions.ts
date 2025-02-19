'use server'

import { getAuthUser } from '@/utils/getAuthUser';
import jwt from 'jsonwebtoken';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function storeToken({ token, user }: AuthSuccessResponse) {
    const cookie = await cookies()
    const webToken = jwt.sign(token, `${process.env.NEXT_JWT_SECRET}`)

    cookie.set('token', webToken, { httpOnly: true, sameSite: 'strict' })
    cookie.set('user', JSON.stringify(user), { httpOnly: true, sameSite: 'strict' })

    return {
        status: 200,
        message: 'Token stored'
    }

}

export async function handleLogout() {

    const { token } = await getAuthUser()

    const cookie = await cookies()
    const respose = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })

    if (respose.status === 204) {
        cookie.delete("token")
        cookie.delete("user")
        revalidateTag('auth')
        redirect("/")
    }
}