import { inject, injectable } from "tsyringe";
import { ICommentaryRepository } from "../repositories/ICommentaryRepository";


@injectable()
class DeleteCommentaryService {
  constructor(
    @inject("CommentaryRepository")
    private commentaryRepository: ICommentaryRepository,
  ) { }

  async execute(id: string): Promise<void> {
    await this.commentaryRepository.delete(id)
  }
}

export { DeleteCommentaryService }