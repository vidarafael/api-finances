import { inject, injectable } from "tsyringe";
import { IVideoDTO } from "../dtos/IVideoDTO";
import { IVideosRepository } from "../repositories/IVideosRepository";

@injectable()
class ListVideosService {
  constructor(
    @inject("VideosRepository")
    private videosRepository: IVideosRepository,
  ) { }

  async execute(): Promise<IVideoDTO[]> {
    const videos = await this.videosRepository.find()

    return videos
  }
}

export { ListVideosService }