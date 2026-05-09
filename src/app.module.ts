import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfModule } from './conf/conf.module';

@Module({
    imports: [AuthModule, UsersModule, DatabaseModule, ConfModule],
})
export class AppModule {}
