import { BaseEntity } from '@app/common/entities/base-entity';
import { User } from '@app/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ExpenseCategory } from '../enum/expense.enum';

@Entity()
export class Expense extends BaseEntity {
    @ManyToOne(() => User, (user) => user.expenses)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column()
    name!: string;

    @Column()
    descrption!: string;

    @Column({ type: 'int' })
    amount!: Number;

    @Column({ type: 'enum', enum: ExpenseCategory })
    category!: ExpenseCategory;

    // @Col
}
