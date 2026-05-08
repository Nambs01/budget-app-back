import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) {}

    @Post('sign-up')
    signUp(@Body() createUserDto: CreateUserDto) {
        return this.registerService.signUp(createUserDto);
    }
}
