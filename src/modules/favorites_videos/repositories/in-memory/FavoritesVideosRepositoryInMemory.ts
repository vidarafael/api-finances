import { IDeleteFavoritesVideosDTO } from "../../dtos/IDeleteFavoritesVideosDTO";
import { IFavoritesVideosDTO } from "../../dtos/IFavoritesVideosDTO";
import { FavoriteVideo } from "../../infra/typeorm/entities/FavoriteVideo";
import { IFavoritesVideosRepository } from "../IFavoritesVideosRepository";

class FavoritesVideosRepositoryInMemory implements IFavoritesVideosRepository {
  private favoritesVideos: FavoriteVideo[] = []

  async create({ user_id, video_id }: IFavoritesVideosDTO): Promise<IFavoritesVideosDTO> {
    const favoriteVideo = new FavoriteVideo()

    Object.assign(favoriteVideo, {
      user_id,
      video_id
    })

    this.favoritesVideos.push(favoriteVideo)

    return favoriteVideo
  }

  async findByUserAndVideo({ user_id, video_id }: IFavoritesVideosDTO): Promise<IFavoritesVideosDTO> {
    const favoriteVideo = this.favoritesVideos.find(favoritesVideos => favoritesVideos.video_id === video_id && favoritesVideos.user_id === user_id)

    return favoriteVideo
  }

  async listByUser(user_id: string): Promise<IFavoritesVideosDTO[]> {
    const favoriteVideo = this.favoritesVideos.filter(favoritesVideos => favoritesVideos.user_id === user_id)

    return favoriteVideo
  }

  async delete({ id, user_id }: IDeleteFavoritesVideosDTO): Promise<void> {
    this.favoritesVideos = this.favoritesVideos.filter(favoritesVideos => favoritesVideos.id !== id && favoritesVideos.user_id !== user_id)
  }
}

export { FavoritesVideosRepositoryInMemory }