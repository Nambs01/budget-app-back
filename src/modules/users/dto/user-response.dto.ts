import { Expose } from 'class-transformer';

export class UserResponseDto {
    @Expose()
    id!: number;

    @Expose()
    email!: string;

    @Expose()
    firstname?: string;

    @Expose()
    name!: string;

    @Expose()
    createdAt!: Date;

    @Expose()
    updatedAt!: Date;

    @Expose()
    deletedAt?: Date;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}
