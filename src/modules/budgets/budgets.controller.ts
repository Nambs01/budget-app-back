import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import type { RequestWithUser } from '@app/guards/auth.guard';

@Controller('budgets')
export class BudgetsController {
    constructor(private readonly budgetsService: BudgetsService) {}

    @Post()
    create(@Req() req: RequestWithUser, @Body() payload: CreateBudgetDto) {
        return this.budgetsService.create(req.userId, payload);
    }

    @Get()
    findAll() {
        return this.budgetsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.budgetsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBudgetDto: UpdateBudgetDto) {
        return this.budgetsService.update(+id, updateBudgetDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.budgetsService.remove(+id);
    }
}
