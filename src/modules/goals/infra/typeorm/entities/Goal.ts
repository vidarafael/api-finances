import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { ColumnNumericTransformer } from "../../../../../shared/infra/typeorm/transformers/ColumnNumericTransformer";
import { Investment } from "../../../../investments/infra/typeorm/entities/Investment";
import { User } from "../../../../users/infra/typeorm/entities/User";

@Entity("goals")
class Goal {
  @PrimaryColumn({ type: "varchar" })
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "numeric", transformer: new ColumnNumericTransformer() })
  amount: number;

  @Column({ type: "varchar" })
  user_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;

  @OneToOne(() => Investment, (investment) => investment.goal, { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true })
  investment: Investment;

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

export { Goal }