import { inject, injectable } from "tsyringe";
import { IVideosRepository } from "../../videos/repositories/IVideosRepository";
import { ICommentaryDTO } from "../dtos/ICommentaryDTO";
import { ICommentaryRepository } from "../repositories/ICommentaryRepository";

@injectable()
class ListCommentaryService {
  constructor(
    @inject("CommentaryRepository")
    private commentaryRepository: ICommentaryRepository,

    @inject("VideosRepository")
    private videosRepository: IVideosRepository,
  ) { }

  async execute(video_id: string): Promise<ICommentaryDTO[]> {
    const videoAlreadyExists = await this.videosRepository.findById(video_id)

    if (!videoAlreadyExists) {
      throw new Error("Video not found");
    }

    const commentaries = await this.commentaryRepository.listCommentariesByVideo(video_id)

    return commentaries
  }
}

export { ListCommentaryService }