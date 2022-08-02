import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity()
class Investment {
  @PrimaryColumn()
  id: string;

  @Column()
  value: number;

  @Column()
  dayOfInvestment: Date;

  @Column()
  goal_id: string;

  @Column()
  priority: string;

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

export { Investment }