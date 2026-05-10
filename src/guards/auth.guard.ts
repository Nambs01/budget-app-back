import { COOKIE_KEYS } from '@app/constants/cookie.constant';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/auth.service';
import type { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@app/decorators/public.docorator';

export type RequestWithUser = Request & { userId: number };

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly reflector: Reflector,
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const accessToken = request.cookies[COOKIE_KEYS.ACCESS_TOKEN] as string;

        if (!accessToken) throw new UnauthorizedException('Aucun jeton trouvé');

        request.userId = this.authService.authenticate(accessToken);
        return true;
    }
}
