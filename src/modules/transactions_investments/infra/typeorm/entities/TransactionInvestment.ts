import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { OperationType } from "../../../../../shared/dto/IOperationTypeDTO";
import { ColumnNumericTransformer } from "../../../../../shared/transformers/ColumnNumericTransformer";
import { Investment } from "../../../../investments/infra/typeorm/entities/Investment";

@Entity("investments_transactions")
class TransactionInvestment {
  @PrimaryColumn({ type: "varchar" })
  id: string;

  @Column({ type: "numeric", transformer: new ColumnNumericTransformer() })
  value: number;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "varchar" })
  category: string;

  @Column({ type: "varchar" })
  investment_id: string;

  @ManyToOne(() => Investment, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: "investment_id", referencedColumnName: "id" })
  investment: Investment;

  @Column({
    type: "enum",
    enum: OperationType,
    default: OperationType.DEPOSIT
  })
  type: OperationType;

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

export { TransactionInvestment }