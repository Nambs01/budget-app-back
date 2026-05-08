import { Injectable } from '@nestjs/common';
import { Credential } from './dtos/credential.dto';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';
import { JWTService } from '../jwt/jwt.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JWTService,
        private readonly usersService: UsersService,
    ) {}

    async signByEmail(data: Credential) {
        const user = await this.usersService.findOneByEmail(data.email);

        if (!user || user.deletedAt) throw new Error('User not found');

        if (!compareSync(data.password, user.password)) throw new Error('Invalid credentials');

        return this.jwtService.generateJwtToken({ ...user });
    }
}
