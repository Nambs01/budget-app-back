import { Inject, Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { DataSource, Repository } from 'typeorm';
import { Income } from './entities/income.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class IncomesService {
    constructor(
        @InjectRepository(Income)
        private readonly incomesRepository: Repository<Income>,
        @InjectDataSource()
        private dataSource: DataSource,
        @Inject()
        private usersService: UsersService,
    ) {}

    async create(userId: number, data: CreateIncomeDto) {
        const income = this.incomesRepository.create({ ...data, user: { id: userId } });
        return await this.incomesRepository.save(income);
    }

    async findAll() {
        return await this.incomesRepository.find({
            order: {
                date: 'DESC',
            },
        });
    }

    findOne(id: number) {
        return `This action returns a #${id} income`;
    }

    update(id: number, updateIncomeDto: UpdateIncomeDto) {
        return `This action updates a #${id} income`;
    }

    remove(id: number) {
        return `This action removes a #${id} income`;
    }

    async addNewIncome(userId: number, data: CreateIncomeDto) {
        return await this.dataSource.transaction(async () => {
            const income = await this.create(userId, data);
            const newAmount = await this.usersService.updateAmountUser(userId, data.amount);

            return { income, amountUser: newAmount };
        });
    }
}
