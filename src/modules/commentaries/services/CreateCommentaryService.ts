import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../users/repositories/IUsersRepository";
import { IVideosRepository } from "../../videos/repositories/IVideosRepository";
import { ICommentaryDTO } from "../dtos/ICommentaryDTO";
import { ICommentaryRepository } from "../repositories/ICommentaryRepository";

interface IRequest {
  user_id: string;
  video_id: string;
  description: string;
}

@injectable()
class CreateCommentaryService {
  constructor(
    @inject("CommentaryRepository")
    private commentaryRepository: ICommentaryRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("VideosRepository")
    private videosRepository: IVideosRepository,
  ) { }

  async execute({ user_id, video_id, description }: IRequest): Promise<ICommentaryDTO> {
    const userAlreadyExists = await this.usersRepository.findById(user_id);

    if (!userAlreadyExists) {
      throw new Error("User not found");
    }

    const videoAlreadyExists = await this.videosRepository.findById(video_id)

    if (!videoAlreadyExists) {
      throw new Error("Video not found");
    }

    const commentary = await this.commentaryRepository.create({ user_id, video_id, description })

    return commentary
  }
}

export { CreateCommentaryService }