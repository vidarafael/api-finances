import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../data-source";
import { IFavoritesVideosDTO } from "../../../dtos/IFavoritesVideosDTO";
import { IFavoritesVideosRepository } from "../../../repositories/IFavoritesVideosRepository";
import { FavoriteVideo } from "../entities/FavoriteVideo";

class FavoritesVideosRepository implements IFavoritesVideosRepository {
  private repository: Repository<FavoriteVideo>

  constructor() {
    this.repository = AppDataSource.getRepository(FavoriteVideo)
  }

  async create({ user_id, video_id }: IFavoritesVideosDTO): Promise<IFavoritesVideosDTO> {
    const favoriteVideo = this.repository.create({ user_id, video_id })

    await this.repository.save(favoriteVideo)

    return favoriteVideo
  }

  async findByUserAndVideo({ user_id, video_id }: IFavoritesVideosDTO): Promise<IFavoritesVideosDTO> {
    const favoriteVideo = await this.repository.findOneBy({ user_id, video_id })

    return favoriteVideo
  }

  async listByUser(user_id: string): Promise<IFavoritesVideosDTO[]> {
    const favoritesVideos = await this.repository.findBy({ user_id })

    return favoritesVideos
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

export { FavoritesVideosRepository }