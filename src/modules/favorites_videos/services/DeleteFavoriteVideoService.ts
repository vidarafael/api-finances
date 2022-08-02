import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "../../users/repositories/IUsersRepository"
import { IFavoritesVideosRepository } from "../repositories/IFavoritesVideosRepository"

interface IRequest {
  user_id: string;
  favorite_video_id: string;
}

@injectable()
class DeleteFavoriteVideoService {
  constructor(
    @inject("FavoritesVideosRepository")
    private favoritesVideosRepository: IFavoritesVideosRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ user_id, favorite_video_id }: IRequest): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findById(user_id)

    if (!userAlreadyExists) {
      throw new Error("User not found")
    }

    await this.favoritesVideosRepository.delete({ id: favorite_video_id, user_id })
  }
}

export { DeleteFavoriteVideoService }