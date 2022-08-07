import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { IUsersRepository } from "../../users/repositories/IUsersRepository";
import { ICommentaryRepository } from "../repositories/ICommentaryRepository";

interface IRequest {
  user_id: string;
  commentary_id: string;
}

@injectable()
class DeleteCommentaryService {
  constructor(
    @inject("CommentaryRepository")
    private commentaryRepository: ICommentaryRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ user_id, commentary_id }: IRequest): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findById(user_id)

    if (!userAlreadyExists) {
      throw new AppError("User not found")
    }

    await this.commentaryRepository.delete({ id: commentary_id, user_id })
  }
}

export { DeleteCommentaryService }