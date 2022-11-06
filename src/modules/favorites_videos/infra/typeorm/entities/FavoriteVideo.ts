import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { User } from "../../../../users/infra/typeorm/entities/User";
import { Video } from "../../../../videos/infra/typeorm/entities/Video";

@Entity("favorites_videos")
class FavoriteVideo {
  @PrimaryColumn({ type: "varchar" })
  id: string;

  @Column({ type: "varchar" })
  video_id: string;

  @OneToOne(() => Video, { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true })
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

export { FavoriteVideo }