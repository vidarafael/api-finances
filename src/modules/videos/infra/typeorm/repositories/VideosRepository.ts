import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../data-source";
import { IVideoDTO } from "../../../dtos/IVideoDTO";
import { IVideosRepository } from "../../../repositories/IVideosRepository";
import { Video } from "../entities/Video";

class VideosRepository implements IVideosRepository {
  private repository: Repository<Video>;

  constructor() {
    this.repository = AppDataSource.getRepository(Video);
  }

  async create({ url, category }: IVideoDTO): Promise<Video> {
    const video = this.repository.create({ url, category })

    await this.repository.save(video);

    return video
  }

  async findById(id: string): Promise<Video> {
    const video = await this.repository.findOneBy({ id })

    return video
  }

  async find(): Promise<IVideoDTO[]> {
    const videos = await this.repository.find()

    return videos
  }

}

export { VideosRepository }