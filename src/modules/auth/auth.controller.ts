import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Credential } from './dtos/credential.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { COOKIE_KEYS } from '@app/constants/cookie.constant';
import type { Response } from 'express';
import type { RequestWithUser } from './auth.guard';
import { plainToInstance } from 'class-transformer';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async signIn(@Res({ passthrough: true }) res: Response, @Body() data: Credential) {
        const response = await this.authService.signByEmail(data);

        res.cookie(COOKIE_KEYS.ACCESS_TOKEN, response.acces_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
    }

    @Get('user')
    async getUser(@Req() req: RequestWithUser) {
        const user = await this.authService.fetchCurrentUser(req.userId);
        return plainToInstance(UserResponseDto, user, {
            excludeExtraneousValues: true, // Ignore tout ce qui n'a pas @Expose()
        });
    }
}
