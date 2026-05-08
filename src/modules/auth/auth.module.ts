import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWTModule } from '../jwt/jwt.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [JWTModule, UsersModule],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
