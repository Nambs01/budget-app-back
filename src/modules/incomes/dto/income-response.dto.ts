import { IncomeCategory } from '../enum/income.enum';

export class IncomeResponseDto {
    id!: number;
    title!: string;
    source!: string;
    category!: IncomeCategory;
    amount!: number;
    date!: Date;
    createdAt!: Date;
    updatedAt!: Date;
}
