export interface ICommentaryDTO {
  id?: string;
  description: string;
  video_id: string;
  user_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}