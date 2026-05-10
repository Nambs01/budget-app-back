import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    email!: string;

    @ApiProperty()
    password!: string;

    @ApiProperty()
    name!: string;

    constructor(partial: Partial<CreateUserDto>) {
        Object.assign(this, partial);
    }
}
