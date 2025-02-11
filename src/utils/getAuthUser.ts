import jwt  from 'jsonwebtoken';
import { cookies } from "next/headers"

export async function getAuthUser() {
    const cookie = await cookies()
    const jwtToken = cookie.get('token')?.value as string
    const {user, token} = jwt.decode(jwtToken) as AuthSuccessResponse
    return {user, token}
}