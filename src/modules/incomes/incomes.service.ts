import { Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { Repository } from 'typeorm';
import { Income } from './entities/income.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IncomesService {
    constructor(
        @InjectRepository(Income)
        private readonly incomesRepository: Repository<Income>,
    ) {}

    async create(userId: number, data: CreateIncomeDto) {
        const income = this.incomesRepository.create({ ...data, user: { id: userId } });
        return await this.incomesRepository.save(income);
    }

    findAll() {
        return `This action returns all incomes`;
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
}
