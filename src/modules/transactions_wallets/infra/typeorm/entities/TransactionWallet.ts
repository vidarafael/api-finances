import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Wallet } from "../../../../wallets/infra/typeorm/entities/Wallet";

@Entity("wallets_transactions")
class TransactionWallet {
  @PrimaryColumn({ type: "varchar" })
  id: string;

  @Column({ type: "numeric" })
  value: number;

  @Column({ type: "varchar" })
  category: string;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "varchar" })
  wallet_id: string;

  @ManyToOne(() => Wallet, { cascade: true })
  @JoinColumn({ name: "wallet_id" })
  wallet: Wallet;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { TransactionWallet }