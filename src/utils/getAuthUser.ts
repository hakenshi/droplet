import jwt from 'jsonwebtoken';
import { getSession } from './session';

let cachedUser: AuthSuccessResponse

export async function getAuthUser() {

    if (cachedUser) return cachedUser

    const session = await getSession()

    const token = jwt.decode(session.token) as string
    const user = JSON.parse(session.user) as User

    cachedUser = { user, token }

    return cachedUser
}

