'use server'

import { getAuthUser } from '@/utils/getAuthUser';
import { destroySession, saveSession } from '@/utils/session';
import jwt from 'jsonwebtoken';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function storeToken({ token, user }: AuthSuccessResponse) {
    const webToken = jwt.sign(token, `${process.env.NEXT_JWT_SECRET}`)    
    
    await saveSession({token: webToken, user})

    return {
        status: 200,
        message: 'Token stored'
    }

}

export async function handleLogout() {

    const { token } = await getAuthUser()
    
    const respose = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })

    if (respose.status === 204) {

        await destroySession()
        
        revalidateTag('auth')
        redirect("/")
    }
}