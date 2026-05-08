import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Credential } from './dtos/credential.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-in')
    signIn(@Body() data: Credential) {
        return this.authService.signByEmail(data);
    }
}
