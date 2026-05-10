import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import type { Response } from 'express';
import { Public } from '@app/decorators/public.docorator';
import { setAccessTokenCookie } from '@app/utils/cookie.utils';

@Public()
@Controller('register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) {}

    @Post()
    async signUp(@Res({ passthrough: true }) res: Response, @Body() createUserDto: CreateUserDto) {
        const response = await this.registerService.signUp(createUserDto);

        setAccessTokenCookie(res, response.accessToken);
        return response;
    }
}
