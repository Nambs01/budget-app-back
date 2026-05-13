import { ValueTransformer } from 'typeorm';

export class DateTransformer implements ValueTransformer {
    // Vers la base de données (Insert/Update)
    to(value: any): Date | null {
        if (!value) return null;
        return typeof value === 'string' ? new Date(value) : value;
    }

    // De la base de données vers votre code (Select)
    from(value: any): Date | null {
        if (!value) return null;
        return new Date(value);
    }
}
