import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../users/repositories/IUsersRepository";
import { IVideosRepository } from "../../videos/repositories/IVideosRepository";
import { IFavoritesVideosDTO } from "../dtos/IFavoritesVideosDTO";
import { IFavoritesVideosRepository } from "../repositories/IFavoritesVideosRepository";

interface IRequest {
  user_id: string;
  video_id: string;
}

@injectable()
class CreateFavoriteVideoService {
  constructor(
    @inject("FavoritesVideosRepository")
    private favoritesVideosRepository: IFavoritesVideosRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("VideosRepository")
    private videosRepository: IVideosRepository,
  ) { }

  async execute({ user_id, video_id }: IRequest): Promise<IFavoritesVideosDTO> {
    const userAlreadyExists = await this.usersRepository.findById(user_id)

    if (!userAlreadyExists) {
      throw new Error("User not found")
    }

    const videoAlreadyExists = await this.videosRepository.findById(video_id)

    if (!videoAlreadyExists) {
      throw new Error("Video not found")
    }

    const favoriteVideoAlreadyExists = await this.favoritesVideosRepository.findByUserAndVideo({ user_id, video_id })

    if (favoriteVideoAlreadyExists) {
      throw new Error("Favorite video already exists")
    }

    const favoriteVideo = await this.favoritesVideosRepository.create({ user_id, video_id })

    return favoriteVideo
  }
}

export { CreateFavoriteVideoService }