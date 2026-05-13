import { IsDateString, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateBudgetDto {
    @IsString()
    title!: string;

    @IsNumber()
    @IsPositive()
    amount!: number;

    @IsDateString()
    startDate!: string;

    @IsDateString()
    endDate!: string;
}
