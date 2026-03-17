import jwt from 'jsonwebtoken';
import { getSession } from './session';

export async function getAuthUser() {

    const session = await getSession()

    const token = jwt.decode(session.token) as string
    const user = JSON.parse(session.user) as User

    return { user, token }
}

