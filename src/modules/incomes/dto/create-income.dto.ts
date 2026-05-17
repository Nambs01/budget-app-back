import { IsDateString, IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';
import { IncomeCategory } from '../enum/income.enum';

export class CreateIncomeDto {
    @IsString()
    title!: string;

    @IsString()
    source!: string;

    @IsEnum(IncomeCategory)
    category!: IncomeCategory;

    @IsNumber()
    @IsPositive()
    amount!: number;

    @IsDateString()
    date!: string;
}
