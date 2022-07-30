import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity()
class TransactionInvestment {
  @PrimaryColumn()
  id: string;

  @Column()
  value: number;

  @Column()
  description: string;

  @Column()
  investment_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { TransactionInvestment }