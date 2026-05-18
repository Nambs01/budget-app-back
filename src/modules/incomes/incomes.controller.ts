import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import type { RequestWithUser } from '@app/guards/auth.guard';
import { IncomeMapper } from '@app/mappers/income.mapper';

@Controller('incomes')
export class IncomesController {
    constructor(private readonly incomesService: IncomesService) {}

    @Post()
    async create(@Req() req: RequestWithUser, @Body() payload: CreateIncomeDto) {
        const data = await this.incomesService.addNewIncome(req.userId, payload);
        return { income: IncomeMapper.toResponse(data.income), amountUser: data.amountUser };
    }

    @Get()
    async findAll() {
        const data = await this.incomesService.findAll();
        return IncomeMapper.toResponseList(data);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.incomesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
        return this.incomesService.update(+id, updateIncomeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.incomesService.remove(+id);
    }
}
