import { inject, injectable } from "tsyringe"
import { AppError } from "../../../shared/errors/AppError"
import { IUsersRepository } from "../../users/repositories/IUsersRepository"
import { IFavoritesVideosDTO } from "../dtos/IFavoritesVideosDTO"
import { IFavoritesVideosRepository } from "../repositories/IFavoritesVideosRepository"

@injectable()
class ListFavoriteVideoService {
  constructor(
    @inject("FavoritesVideosRepository")
    private favoritesVideosRepository: IFavoritesVideosRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }

  async execute(user_id: string): Promise<IFavoritesVideosDTO[]> {
    const userAlreadyExists = await this.usersRepository.findById(user_id)

    if (!userAlreadyExists) {
      throw new AppError("User not found")
    }

    const favoritesVideos = await this.favoritesVideosRepository.listByUser(user_id)

    return favoritesVideos
  }
}

export { ListFavoriteVideoService }