import { BaseEntity } from '@app/common/entities/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IncomeCategory } from '../enum/income.enum';
import { DateTransformer } from '@app/utils/date-transformer.utils';
import { User } from '@app/modules/users/entities/user.entity';

@Entity()
export class Income extends BaseEntity {
    @ManyToOne(() => User, (user) => user.incomes)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column()
    title!: string;

    @Column()
    source!: string;

    @Column({
        type: 'enum',
        enum: IncomeCategory,
    })
    category!: IncomeCategory;

    @Column({ type: 'int' })
    amount!: number;

    @Column({ type: 'timestamp', transformer: new DateTransformer() })
    date!: Date;
}
