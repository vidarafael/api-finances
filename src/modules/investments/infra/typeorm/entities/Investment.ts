import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { ColumnNumericTransformer } from "../../../../../shared/transformers/ColumnNumericTransformer";
import { Goal } from "../../../../goals/infra/typeorm/entities/Goal";

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

  @OneToOne(() => Goal)
  @JoinColumn({ name: "goal_id", referencedColumnName: "id" })
  goal: Goal;

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