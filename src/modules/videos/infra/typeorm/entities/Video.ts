import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

export enum CategoryType {
  RENDA_FIXA = "Renda Fixa",
  ACOES = "Ações",
  FIIS = "FIIS",
  APLICATIVO = "Aplicativo",
  CRIPTOMOEDA = "Criptomoeda",
  ECONOMIA = "Economia"
}

@Entity("videos")
class Video {
  @PrimaryColumn({ type: "varchar" })
  id: string;

  @Column({ type: "varchar" })
  url: string;

  @Column({
    type: "enum",
    enum: CategoryType,
    default: CategoryType.ECONOMIA
  })
  category: CategoryType;

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

export { Video }