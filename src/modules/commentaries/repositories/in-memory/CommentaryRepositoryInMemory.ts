import { ICommentaryDTO } from "../../dtos/ICommentaryDTO";
import { IDeleteCommentaryDTO } from "../../dtos/IDeleteCommentaryDTO";
import { Commentary } from "../../infra/typeorm/entities/Commentary";
import { ICommentaryRepository } from "../ICommentaryRepository";


class CommentaryRepositoryInMemory implements ICommentaryRepository {
  private commentaries: Commentary[]

  async create({ user_id, video_id, description }: ICommentaryDTO): Promise<ICommentaryDTO> {
    const commentary = new Commentary()

    Object.assign(commentary, {
      user_id,
      video_id,
      description
    })

    this.commentaries.push(commentary)

    return commentary
  }

  async listCommentariesByVideo(video_id: string): Promise<ICommentaryDTO[]> {
    const commentaries = this.commentaries.filter(commentary => commentary.video_id === video_id)

    return commentaries
  }

  async delete({ id, user_id }: IDeleteCommentaryDTO): Promise<void> {
    const commentaryIndex = this.commentaries.findIndex(commentary => commentary.id === id && commentary.user_id === user_id)
    const newCommentaries = this.commentaries.splice(commentaryIndex, 1)

    this.commentaries = newCommentaries
  }

}

export { CommentaryRepositoryInMemory }