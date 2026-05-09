import { COOKIE_KEYS } from '@app/constants/cookie.constant';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import type { Request } from 'express';

export type RequestWithUser = Request & { userId: number };

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const accessToken = request.cookies[COOKIE_KEYS.ACCESS_TOKEN];

        if (!accessToken) throw new UnauthorizedException('Aucun jeton trouvé');

        request.userId = this.authService.authenticate(accessToken);
        return true;
    }
}
