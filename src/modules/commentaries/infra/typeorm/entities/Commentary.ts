import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { User } from "../../../../users/infra/typeorm/entities/User";
import { Video } from "../../../../videos/infra/typeorm/entities/Video";

@Entity('commentaries')
class Commentary {
  @PrimaryColumn({ type: "varchar" })
  id: string;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "varchar" })
  video_id: string;

  @ManyToOne(() => Video, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: "video_id", referencedColumnName: "id" })
  video: Video;

  @Column({ type: "varchar" })
  user_id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
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

export { Commentary }