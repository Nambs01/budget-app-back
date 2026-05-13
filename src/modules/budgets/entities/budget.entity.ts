import { BaseEntity } from '@app/common/entities/base-entity';
import { DateTransformer } from '@app/utils/date-transformer.utils';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BudgetStatus } from '../enum/budget.enum';
import { User } from '@app/modules/users/entities/user.entity';

@Entity()
export class Budget extends BaseEntity {
    @ManyToOne(() => User, (user) => user.expenses)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column()
    title!: string;

    @Column({ type: 'int' })
    amount!: number;

    @Column({ type: 'timestamp', transformer: new DateTransformer() })
    startDate!: Date;

    @Column({ type: 'timestamp', transformer: new DateTransformer() })
    endDate!: Date;

    @Column({ type: 'enum', enum: BudgetStatus, default: BudgetStatus.ACTIVE })
    status!: BudgetStatus;
}
