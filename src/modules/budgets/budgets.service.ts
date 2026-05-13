import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Repository } from 'typeorm';
import { Budget } from './entities/budget.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BudgetsService {
    constructor(
        @InjectRepository(Budget)
        private readonly budgetsRepository: Repository<Budget>,
    ) {}

    async create(userId: number, data: CreateBudgetDto) {
        const budget = this.budgetsRepository.create({ ...data, user: { id: userId } });
        return await this.budgetsRepository.save(budget);
    }

    findAll() {
        return `This action returns all budgets`;
    }

    findOne(id: number) {
        return `This action returns a #${id} budget`;
    }

    update(id: number, updateBudgetDto: UpdateBudgetDto) {
        return `This action updates a #${id} budget`;
    }

    remove(id: number) {
        return `This action removes a #${id} budget`;
    }
}
