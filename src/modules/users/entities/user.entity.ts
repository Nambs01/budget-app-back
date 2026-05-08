import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@app/common/entities/base-entity';

@Entity()
export class User extends BaseEntity {
    @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 255 })
    password!: string;

    @Column()
    name!: string;

    @Column({ nullable: true })
    firstname?: string;
}
