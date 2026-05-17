import { IncomeResponseDto } from '@app/modules/incomes/dto/income-response.dto';
import { Income } from '@app/modules/incomes/entities/income.entity';

export class IncomeMapper {
    static toResponse(income: Income): IncomeResponseDto {
        return {
            id: income.id,
            title: income.title,
            source: income.source,
            category: income.category,
            amount: income.amount,
            date: income.date,
            createdAt: income.createdAt,
            updatedAt: income.updatedAt,
        };
    }

    static toResponseList(incomes: Income[]): IncomeResponseDto[] {
        return incomes.map(IncomeMapper.toResponse);
    }
}
