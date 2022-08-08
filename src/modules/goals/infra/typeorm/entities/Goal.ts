import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { ColumnNumericTransformer } from "../../../../../shared/transformers/ColumnNumericTransformer";
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

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;

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