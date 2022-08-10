import { IVideoDTO } from "../../dtos/IVideoDTO";
import { Video } from "../../infra/typeorm/entities/Video";
import { IVideosRepository } from "../IVideosRepository";

class VideosRepositoryInMemory implements IVideosRepository {
  private videos: Video[] = [];

  async create({ url, category }: IVideoDTO): Promise<IVideoDTO> {
    const video = new Video()

    Object.assign(video, { url, category })

    this.videos.push(video)

    return video
  }

  async findById(id: string): Promise<IVideoDTO> {
    const video = this.videos.find(v => v.id === id)

    return video
  }

  async find(): Promise<IVideoDTO[]> {
    return this.videos
  }

}

export { VideosRepositoryInMemory }