import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { hash } from 'bcrypt';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';

@Injectable()
export class RegisterService {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    async signUp(createUserDto: CreateUserDto) {
        const { password } = createUserDto;

        const hashedPassword = await this.hashPassword(password);
        const userPayload = { ...createUserDto, password: hashedPassword };

        const user = await this.usersService.create(userPayload);
        return this.authService.generateJwtToken({ ...user });
    }

    private async hashPassword(password: string): Promise<string> {
        return await hash(password, 10);
    }
}
