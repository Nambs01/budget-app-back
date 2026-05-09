import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import type { Response } from 'express';
import { COOKIE_KEYS } from '@app/constants/cookie.constant';

@Controller('register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) {}

    @Post()
    async signUp(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
        const response = await this.registerService.signUp(createUserDto);

        res.cookie(COOKIE_KEYS.ACCESS_TOKEN, response.acces_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
    }
}
