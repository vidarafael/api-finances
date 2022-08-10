import { AppError } from "../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../users/repositories/in-memory/UsersRepositoryInMemory";
import { CategoryType } from "../../videos/infra/typeorm/entities/Video";
import { VideosRepositoryInMemory } from "../../videos/repositories/in-memory/VideosRepositoryInMemory";
import { CommentaryRepositoryInMemory } from "../repositories/in-memory/CommentaryRepositoryInMemory"
import { CreateCommentaryService } from "./CreateCommentaryService"

describe("Create Commentary", () => {
  let commentaryRepositoryInMemory: CommentaryRepositoryInMemory;
  let videosRepositoryInMemory: VideosRepositoryInMemory;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createCommentaryService: CreateCommentaryService;

  beforeEach(async () => {
    commentaryRepositoryInMemory = new CommentaryRepositoryInMemory()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    videosRepositoryInMemory = new VideosRepositoryInMemory()
    createCommentaryService = new CreateCommentaryService(
      commentaryRepositoryInMemory,
      usersRepositoryInMemory,
      videosRepositoryInMemory
    );
  })

  it("Should be able create a commentary", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const video = await videosRepositoryInMemory.create({ url: 'http://www.teste.com', category: 'FIIS' as CategoryType })

    const commentary = await createCommentaryService.execute({
      user_id: user.id,
      video_id: video.id,
      description: 'Vídeo muito bom!!'
    })

    expect(commentary).toMatchObject({
      id: commentary.id,
      user_id: user.id,
      video_id: video.id,
      description: 'Vídeo muito bom!!'
    })
  })

  it("Should not be able create a commentary because no have user", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const video = await videosRepositoryInMemory.create({ url: 'http://www.teste.com', category: 'FIIS' as CategoryType })

    expect(createCommentaryService.execute(
      {
        user_id: user.id + 'id_not_exists',
        video_id: video.id,
        description: 'Vídeo muito bom!!'
      }
    )).rejects.toEqual(new AppError("User not found"))
  })

  it("Should not be able create a commentary because no have video", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const video = await videosRepositoryInMemory.create({ url: 'http://www.teste.com', category: 'FIIS' as CategoryType })

    expect(createCommentaryService.execute(
      {
        user_id: user.id,
        video_id: video.id + 'id_not_exists',
        description: 'Vídeo muito bom!!'
      }
    )).rejects.toEqual(new AppError("Video not found"))
  })
})