import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findOneByEmail(email: string) {
        return await this.userRepository.findOneBy({ email });
    }

    async create(createUserDto: CreateUserDto) {
        const existingUser = await this.findOneByEmail(createUserDto.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }

    async findAll() {
        return await this.userRepository.find({});
    }

    async findOne(id: number) {
        return await this.userRepository.findOneBy({ id });
    }

    async updateInfoUser(id: number, updateUserDto: UpdateUserDto) {
        return await this.userRepository.update(id, updateUserDto);
    }

    async remove(id: number) {
        return await this.userRepository.softDelete(id);
    }
}
