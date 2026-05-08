import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { JWTModule } from '../jwt/jwt.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), JWTModule],
    controllers: [UsersController, RegisterController],
    providers: [UsersService, RegisterService],
    exports: [UsersService],
})
export class UsersModule {}
