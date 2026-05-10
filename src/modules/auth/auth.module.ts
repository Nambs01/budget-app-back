import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { RegisterService } from './register/register.service';
import { RegisterController } from './register/register.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('jwt.secret'),
                signOptions: {
                    expiresIn: configService.get<string>('jwt.expiresIn') as any,
                },
            }),
        }),
        UsersModule,
    ],
    providers: [AuthService, RegisterService],
    controllers: [AuthController, RegisterController],
    exports: [AuthService],
})
export class AuthModule {}
