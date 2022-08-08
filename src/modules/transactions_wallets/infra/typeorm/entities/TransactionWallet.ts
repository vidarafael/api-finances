import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { OperationType } from "../../../../../shared/dto/IOperationTypeDTO";
import { ColumnNumericTransformer } from "../../../../../shared/transformers/ColumnNumericTransformer";
import { Wallet } from "../../../../wallets/infra/typeorm/entities/Wallet";

@Entity("wallets_transactions")
class TransactionWallet {
  @PrimaryColumn({ type: "varchar" })
  id: string;

  @Column({ type: "numeric", transformer: new ColumnNumericTransformer() })
  value: number;

  @Column({ type: "varchar" })
  category: string;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "varchar" })
  wallet_id: string;

  @Column({
    type: "enum",
    enum: OperationType,
    default: OperationType.DEPOSIT
  })
  type: OperationType;

  @ManyToOne(() => Wallet, { onDelete: 'CASCADE' })
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