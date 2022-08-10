import { AppError } from "../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../users/repositories/in-memory/UsersRepositoryInMemory";
import { CategoryType } from "../../videos/infra/typeorm/entities/Video";
import { VideosRepositoryInMemory } from "../../videos/repositories/in-memory/VideosRepositoryInMemory";
import { CommentaryRepositoryInMemory } from "../repositories/in-memory/CommentaryRepositoryInMemory";
import { CreateCommentaryService } from "./CreateCommentaryService";
import { ListCommentaryService } from "./ListCommentaryService";

describe("List Commentary", () => {
  let commentaryRepositoryInMemory: CommentaryRepositoryInMemory;
  let videosRepositoryInMemory: VideosRepositoryInMemory;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createCommentaryService: CreateCommentaryService;
  let listCommentaryService: ListCommentaryService;

  beforeEach(async () => {
    commentaryRepositoryInMemory = new CommentaryRepositoryInMemory()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    videosRepositoryInMemory = new VideosRepositoryInMemory()
    createCommentaryService = new CreateCommentaryService(
      commentaryRepositoryInMemory,
      usersRepositoryInMemory,
      videosRepositoryInMemory
    );

    listCommentaryService = new ListCommentaryService(
      commentaryRepositoryInMemory,
      videosRepositoryInMemory
    )
  })

  it("Should be able to list commentaries", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const video = await videosRepositoryInMemory.create({ url: 'http://www.teste.com', category: 'FIIS' as CategoryType })

    await createCommentaryService.execute({
      user_id: user.id,
      video_id: video.id,
      description: 'Vídeo muito bom!!'
    })

    await createCommentaryService.execute({
      user_id: user.id,
      video_id: video.id,
      description: 'Vídeo muito sensacional'
    })

    const commentaries = await listCommentaryService.execute(video.id)

    expect(commentaries.length).toBe(2)
  })

  it("Should not be able to list commentaries because no have a video", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const video = await videosRepositoryInMemory.create({ url: 'http://www.teste.com', category: 'FIIS' as CategoryType })

    await createCommentaryService.execute({
      user_id: user.id,
      video_id: video.id,
      description: 'Vídeo muito bom!!'
    })

    await createCommentaryService.execute({
      user_id: user.id,
      video_id: video.id,
      description: 'Vídeo muito sensacional'
    })

    expect(listCommentaryService.execute(video.id + 'id_not_exists')).rejects.toEqual(new AppError("Video not found"))

  })
})