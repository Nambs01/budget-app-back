import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@app/common/entities/base-entity';
import { Expense } from '@app/modules/expenses/entities/expense.entity';
import { Budget } from '@app/modules/budgets/entities/budget.entity';
import { Income } from '@app/modules/incomes/entities/income.entity';

@Entity()
export class User extends BaseEntity {
    @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 255 })
    password!: string;

    @Column()
    name!: string;

    @OneToMany(() => Expense, (expense) => expense.user)
    expenses!: Expense[];

    @OneToMany(() => Budget, (budget) => budget.user)
    budgets!: Budget[];

    @OneToMany(() => Income, (income) => income.user)
    incomes!: Income[];
}
