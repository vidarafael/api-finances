import { AppError } from "../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../users/repositories/in-memory/UsersRepositoryInMemory";
import { CategoryType } from "../../videos/infra/typeorm/entities/Video";
import { VideosRepositoryInMemory } from "../../videos/repositories/in-memory/VideosRepositoryInMemory";
import { FavoritesVideosRepositoryInMemory } from "../repositories/in-memory/FavoritesVideosRepositoryInMemory";
import { CreateFavoriteVideoService } from "./CreateFavoriteVideoService";
import { DeleteFavoriteVideoService } from "./DeleteFavoriteVideoService";

describe("Delete Favorite Video", () => {
  let favoritesVideosRepositoryInMemory: FavoritesVideosRepositoryInMemory;
  let videosRepositoryInMemory: VideosRepositoryInMemory;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createFavoriteVideoService: CreateFavoriteVideoService;
  let deleteFavoriteVideoService: DeleteFavoriteVideoService;

  beforeEach(async () => {
    favoritesVideosRepositoryInMemory = new FavoritesVideosRepositoryInMemory()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    videosRepositoryInMemory = new VideosRepositoryInMemory()
    createFavoriteVideoService = new CreateFavoriteVideoService(
      favoritesVideosRepositoryInMemory,
      usersRepositoryInMemory,
      videosRepositoryInMemory
    );
    deleteFavoriteVideoService = new DeleteFavoriteVideoService(
      favoritesVideosRepositoryInMemory,
      usersRepositoryInMemory,
    )
  })

  it("Should be able delete a favorite video", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const video = await videosRepositoryInMemory.create({ url: 'http://www.teste.com', category: 'FIIS' as CategoryType })

    const favoriteVideo = await createFavoriteVideoService.execute({
      user_id: user.id,
      video_id: video.id,
    })

    await deleteFavoriteVideoService.execute({ user_id: user.id, favorite_video_id: favoriteVideo.id })

    const favoritesVideos = await favoritesVideosRepositoryInMemory.listByUser(user.id)

    expect(favoritesVideos.length).toBe(0)
  })

  it("Should not be able delete a favorite video because no have an user", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const video = await videosRepositoryInMemory.create({ url: 'http://www.teste.com', category: 'FIIS' as CategoryType })

    const favoriteVideo = await createFavoriteVideoService.execute({
      user_id: user.id,
      video_id: video.id,
    })

    expect(deleteFavoriteVideoService.execute({
      user_id: user.id + 'id_not_exists',
      favorite_video_id: favoriteVideo.id,
    })).rejects.toEqual(new AppError("User not found"))
  })
})