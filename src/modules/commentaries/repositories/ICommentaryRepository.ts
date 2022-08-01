import { ICommentaryDTO } from "../dtos/ICommentaryDTO";


interface ICommentaryRepository {
  create({ video_id, description }: ICommentaryDTO): Promise<ICommentaryDTO>
  listCommentariesByVideo(video_id: string): Promise<ICommentaryDTO[]>
  delete(id: string): Promise<void>
}

export { ICommentaryRepository }