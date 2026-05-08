import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    email!: string;

    @ApiProperty()
    password!: string;

    @ApiProperty()
    name!: string;

    @ApiPropertyOptional()
    @IsOptional()
    firstname?: string;
}
