import { CreateDateColumn, DeepPartial, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  [key: string]: any;
  protected constructor(input?: DeepPartial<BaseEntity>) {
    if (input) {
      for (const [key, value] of Object.entries(input)) {
        this[key] = value;
      }
    }
  }

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;
}
