import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateFavoriteVideoService } from '../../../services/CreateFavoriteVideoService'
import { DeleteFavoriteVideoService } from '../../../services/DeleteFavoriteVideoService'
import { ListFavoriteVideoService } from '../../../services/ListFavoriteVideoService'

class FavoritesVideosController {
  async create(request: Request, response: Response): Promise<void> {
    const { id: user_id } = request.user
    const { video_id } = request.params

    const createFavoriteVideoService = container.resolve(CreateFavoriteVideoService)

    const favoriteVideo = await createFavoriteVideoService.execute({
      user_id,
      video_id,
    })

    response.status(201).json(favoriteVideo)
  }

  async list(request: Request, response: Response): Promise<void> {
    const { id: user_id } = request.user

    const listFavoriteVideoService = container.resolve(ListFavoriteVideoService)

    const favoritesVideos = await listFavoriteVideoService.execute(user_id)

    response.status(200).json(favoritesVideos)
  }

  async delete(request: Request, response: Response): Promise<void> {
    const { id: user_id } = request.user
    const { favorite_video_id } = request.params

    const deleteFavoriteVideoService = container.resolve(DeleteFavoriteVideoService)

    await deleteFavoriteVideoService.execute({ user_id, favorite_video_id })

    response.status(200).send()
  }
}

export { FavoritesVideosController }