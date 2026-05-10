import { Response } from 'express';
import { COOKIE_KEYS } from '@app/constants/cookie.constant';

const isProduction = process.env.NODE_ENV === 'production';

export function setAccessTokenCookie(res: Response, accessToken: string): void {
    res.cookie(COOKIE_KEYS.ACCESS_TOKEN, accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        path: '/',
        maxAge: 1000 * 60 * 60 * 24,
    });
}

export function clearAccessTokenCookie(res: Response): void {
    res.clearCookie(COOKIE_KEYS.ACCESS_TOKEN, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
    });
}
