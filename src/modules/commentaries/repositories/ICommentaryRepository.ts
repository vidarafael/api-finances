import { ICommentaryDTO } from "../dtos/ICommentaryDTO";
import { IDeleteCommentaryDTO } from "../dtos/IDeleteCommentaryDTO";

interface ICommentaryRepository {
  create({ user_id, video_id, description }: ICommentaryDTO): Promise<ICommentaryDTO>
  listCommentariesByVideo(video_id: string): Promise<ICommentaryDTO[]>
  delete({ id, user_id }: IDeleteCommentaryDTO): Promise<void>
}

export { ICommentaryRepository }