import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class Credential {
    @ApiProperty()
    @IsEmail()
    email!: string;

    @ApiProperty()
    @IsStrongPassword()
    password!: string;
}
