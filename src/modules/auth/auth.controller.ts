import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Credential } from './dtos/credential.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import type { Response } from 'express';
import type { RequestWithUser } from '@app/guards/auth.guard';
import { plainToInstance } from 'class-transformer';
import { Public } from '@app/decorators/public.docorator';
import { setAccessTokenCookie } from '@app/utils/cookie.utils';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    async signIn(@Res({ passthrough: true }) res: Response, @Body() data: Credential) {
        const response = await this.authService.signByEmail(data);

        setAccessTokenCookie(res, response.accessToken);
    }

    @Get('user')
    async getUser(@Req() req: RequestWithUser) {
        const user = await this.authService.fetchCurrentUser(req.userId);
        const response = plainToInstance(UserResponseDto, user, {
            excludeExtraneousValues: true,
        });
        return response;
    }
}
