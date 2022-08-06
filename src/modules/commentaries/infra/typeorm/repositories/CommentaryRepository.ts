import { Repository } from "typeorm"
import { AppDataSource } from "../../../../../data-source"
import { ICommentaryDTO } from "../../../dtos/ICommentaryDTO"
import { IDeleteCommentaryDTO } from "../../../dtos/IDeleteCommentaryDTO"
import { ICommentaryRepository } from "../../../repositories/ICommentaryRepository"
import { Commentary } from "../entities/Commentary"

class CommentaryRepository implements ICommentaryRepository {
  private repository: Repository<Commentary>

  constructor() {
    this.repository = AppDataSource.getRepository(Commentary)
  }

  async create({ user_id, video_id, description }: ICommentaryDTO): Promise<Commentary> {
    const commentary = this.repository.create({ user_id, video_id, description })

    await this.repository.save(commentary)

    return commentary
  }

  async listCommentariesByVideo(video_id: string): Promise<Commentary[]> {
    const commentaries = await this.repository.findBy({ video_id })

    return commentaries
  }

  async delete({ id, user_id }: IDeleteCommentaryDTO): Promise<void> {
    await this.repository.delete({ id, user_id })
  }
}

export { CommentaryRepository }