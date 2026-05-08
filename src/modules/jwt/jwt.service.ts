import { Injectable } from '@nestjs/common';
import { IJwtPayload, IToken } from './interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTService {
    constructor(private readonly jwtService: JwtService) {}

    generateJwtToken(payload: IJwtPayload): IToken {
        return { userId: payload.id, token: this.jwtService.sign(payload) };
    }
}
