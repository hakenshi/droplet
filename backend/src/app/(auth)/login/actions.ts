'use server'

import { ServiceFactory } from '@/lib/factories/service.factory';
import { LoginCredentials } from '@/lib/interfaces/auth.interface';
import { getAuthUser } from '@/utils/getAuthUser';
import { destroySession, saveSession } from '@/utils/session';
import jwt from 'jsonwebtoken';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function loginAction(credentials: LoginCredentials) {
    const authService = ServiceFactory.getAuthService();
    
    try {
        const authResponse = await authService.login(credentials);
        const result = await storeToken(authResponse);
        
        if (result.status === 200) {
            redirect('/home');
        }
        
        return result;
    } catch (error) {
        throw error;
    }
}

export async function storeToken({ token, user }: AuthResponse) {
    const webToken = jwt.sign(token, `${process.env.NEXT_JWT_SECRET}`);
    
    await saveSession({ token: webToken, user });

    return {
        status: 200,
        message: 'Token stored'
    };
}

export async function handleLogout() {
    const authService = ServiceFactory.getAuthService();
    
    try {
        await authService.logout();
        await destroySession();
        revalidateTag('auth');
        redirect('/');
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}