import { CategoryType } from "../infra/typeorm/entities/Video";

export interface IVideoDTO {
  id?: string;
  url: string;
  category: CategoryType;
  created_at?: Date;
  updated_at?: Date;
}