import { AppError } from "../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../users/repositories/in-memory/UsersRepositoryInMemory";
import { CategoryType } from "../../videos/infra/typeorm/entities/Video";
import { VideosRepositoryInMemory } from "../../videos/repositories/in-memory/VideosRepositoryInMemory";
import { FavoritesVideosRepositoryInMemory } from "../repositories/in-memory/FavoritesVideosRepositoryInMemory";
import { CreateFavoriteVideoService } from "./CreateFavoriteVideoService";
import { ListFavoriteVideoService } from "./ListFavoriteVideoService";

describe("List Favorite Video", () => {
  let favoritesVideosRepositoryInMemory: FavoritesVideosRepositoryInMemory;
  let videosRepositoryInMemory: VideosRepositoryInMemory;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createFavoriteVideoService: CreateFavoriteVideoService;
  let listFavoriteVideoService: ListFavoriteVideoService;

  beforeEach(async () => {
    favoritesVideosRepositoryInMemory = new FavoritesVideosRepositoryInMemory()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    videosRepositoryInMemory = new VideosRepositoryInMemory()
    createFavoriteVideoService = new CreateFavoriteVideoService(
      favoritesVideosRepositoryInMemory,
      usersRepositoryInMemory,
      videosRepositoryInMemory
    );
    listFavoriteVideoService = new ListFavoriteVideoService(
      favoritesVideosRepositoryInMemory,
      usersRepositoryInMemory,
    )
  })

  it("Should be able list all favorite video", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const video = await videosRepositoryInMemory.create({ url: 'http://www.teste.com', category: 'FIIS' as CategoryType })
    const video2 = await videosRepositoryInMemory.create({ url: 'http://www.holder.com', category: 'FIIS' as CategoryType })

    await createFavoriteVideoService.execute({
      user_id: user.id,
      video_id: video.id,
    })

    await createFavoriteVideoService.execute({
      user_id: user.id,
      video_id: video2.id,
    })

    const favoritesVideos = await listFavoriteVideoService.execute(user.id)

    expect(favoritesVideos.length).toBe(2)
  })

  it("Should not be able list all favorite video because no have an user", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const video = await videosRepositoryInMemory.create({ url: 'http://www.teste.com', category: 'FIIS' as CategoryType })

    await createFavoriteVideoService.execute({
      user_id: user.id,
      video_id: video.id,
    })

    expect(listFavoriteVideoService.execute(user.id + 'id_not_exists')).rejects.toEqual(new AppError("User not found"))
  })
})