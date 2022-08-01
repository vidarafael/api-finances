import { IFavoritesVideosDTO } from "../dtos/IFavoritesVideosDTO";

interface IFavoritesVideosRepository {
  create({ user_id, video_id }: IFavoritesVideosDTO): Promise<IFavoritesVideosDTO>
  findByUserAndVideo({ user_id, video_id }: IFavoritesVideosDTO): Promise<IFavoritesVideosDTO>
  listByUser(user_id: string): Promise<IFavoritesVideosDTO[]>
  delete(id: string): Promise<void>
}

export { IFavoritesVideosRepository }