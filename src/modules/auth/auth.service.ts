import { Injectable } from '@nestjs/common';
import { Credential } from './dtos/credential.dto';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload, IToken } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) {}

    async signByEmail(data: Credential) {
        const user = await this.usersService.findOneByEmail(data.email);

        if (!user || user.deletedAt) throw new Error('User not found');

        if (!compareSync(data.password, user.password)) throw new Error('Invalid credentials');

        return this.generateJwtToken({ ...user });
    }

    async fetchCurrentUser(userId: number) {
        const user = await this.usersService.findOne(userId);

        if (!user || user.deletedAt) throw new Error('User not found');

        return user;
    }

    authenticate(token: string): number {
        try {
            const decoded = this.jwtService.verify<IJwtPayload>(token);
            return decoded.id;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    generateJwtToken(payload: IJwtPayload): IToken {
        return { acces_token: this.jwtService.sign(payload) };
    }
}
