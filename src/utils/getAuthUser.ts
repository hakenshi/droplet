import jwt from 'jsonwebtoken';
import { cookies } from "next/headers"

export async function getAuthUser() {
    
    const cookie = await cookies()
    const jwtToken = cookie.get('token')?.value as string
    const jwtUser = cookie.get('user')?.value as string
    const token = jwt.decode(jwtToken) as string
    const user = JSON.parse(jwtUser) as User

    return { user, token }
}

