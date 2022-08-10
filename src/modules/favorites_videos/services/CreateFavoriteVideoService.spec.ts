import { AppError } from "../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../users/repositories/in-memory/UsersRepositoryInMemory";
import { CategoryType } from "../../videos/infra/typeorm/entities/Video";
import { VideosRepositoryInMemory } from "../../videos/repositories/in-memory/VideosRepositoryInMemory";
import { FavoritesVideosRepositoryInMemory } from "../repositories/in-memory/FavoritesVideosRepositoryInMemory";
import { CreateFavoriteVideoService } from "./CreateFavoriteVideoService";

describe("Create Favorite Video", () => {
  let favoritesVideosRepositoryInMemory: FavoritesVideosRepositoryInMemory;
  let videosRepositoryInMemory: VideosRepositoryInMemory;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createFavoriteVideoService: CreateFavoriteVideoService;

  beforeEach(async () => {
    favoritesVideosRepositoryInMemory = new FavoritesVideosRepositoryInMemory()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    videosRepositoryInMemory = new VideosRepositoryInMemory()
    createFavoriteVideoService = new CreateFavoriteVideoService(
      favoritesVideosRepositoryInMemory,
      usersRepositoryInMemory,
      videosRepositoryInMemory
    );
  })

  it("Should be able create a favorite video", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const video = await videosRepositoryInMemory.create({ url: 'http://www.teste.com', category: 'FIIS' as CategoryType })

    const favoriteVideo = await createFavoriteVideoService.execute({
      user_id: user.id,
      video_id: video.id,
    })

    expect(favoriteVideo).toMatchObject({
      id: favoriteVideo.id,
      user_id: user.id,
      video_id: video.id,
    })
  })

  it("Should not be able create a favorite video because no have an user", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const video = await videosRepositoryInMemory.create({ url: 'http://www.teste.com', category: 'FIIS' as CategoryType })

    expect(createFavoriteVideoService.execute({
      user_id: user.id + 'id_not_exists',
      video_id: video.id,
    })).rejects.toEqual(new AppError("User not found"))

  })

  it("Should not be able create a commentary because no have a video", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const video = await videosRepositoryInMemory.create({ url: 'http://www.teste.com', category: 'FIIS' as CategoryType })

    expect(createFavoriteVideoService.execute(
      {
        user_id: user.id,
        video_id: video.id + 'id_not_exists',
      }
    )).rejects.toEqual(new AppError("Video not found"))
  })

  it("Should not be able create a commentary because already exists a favorite video", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const video = await videosRepositoryInMemory.create({ url: 'http://www.teste.com', category: 'FIIS' as CategoryType })
    await createFavoriteVideoService.execute({ user_id: user.id, video_id: video.id })

    expect(createFavoriteVideoService.execute(
      {
        user_id: user.id,
        video_id: video.id,
      }
    )).rejects.toEqual(new AppError("Favorite video already exists"))
  })
})