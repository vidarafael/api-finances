import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity()
class TransactionWallet {
  @PrimaryColumn()
  id: string;

  @Column()
  value: number;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column()
  wallet_id: string;

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

export { TransactionWallet }