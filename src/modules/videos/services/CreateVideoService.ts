import { inject, injectable } from "tsyringe";
import { IVideoDTO } from "../dtos/IVideoDTO";
import { CategoryType } from "../infra/typeorm/entities/Video";
import { IVideosRepository } from "../repositories/IVideosRepository";

interface IRequest {
  url: string;
  category: CategoryType;
}

@injectable()
class CreateVideoService {
  constructor(
    @inject("VideosRepository")
    private videosRepository: IVideosRepository
  ) { }

  async execute({ url, category }: IRequest): Promise<IVideoDTO> {
    const video = await this.videosRepository.create({ url, category });

    return video
  }
}

export { CreateVideoService }