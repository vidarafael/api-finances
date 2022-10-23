import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { ColumnNumericTransformer } from "../../../../../shared/infra/typeorm/transformers/ColumnNumericTransformer";
import { Goal } from "../../../../goals/infra/typeorm/entities/Goal";
import { TransactionInvestment } from "../../../../transactions_investments/infra/typeorm/entities/TransactionInvestment";

@Entity("investments")
class Investment {
  @PrimaryColumn({ type: "varchar" })
  id: string;

  @Column({ type: "numeric", transformer: new ColumnNumericTransformer() })
  value: number;

  @Column({ type: "timestamp" })
  dayOfInvestment: Date;

  @Column({ type: "varchar" })
  goal_id: string;

  @OneToOne(() => Goal, (goal) => goal.investment, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: "goal_id", referencedColumnName: "id" })
  goal: Goal;

  @OneToMany(() => TransactionInvestment, (transaction_investment) => transaction_investment.investment, { eager: true })
  transaction_investment: TransactionInvestment;

  @Column({ type: "varchar" })
  priority: string;

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

export { Investment }