import { Module } from '@nestjs/common';
import { JWTService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('jwt.secret'),
                signOptions: {
                    expiresIn: configService.get<string>('jwt.expiresIn') as any,
                },
            }),
        }),
    ],
    providers: [JWTService],
    exports: [JWTService],
})
export class JWTModule {}
