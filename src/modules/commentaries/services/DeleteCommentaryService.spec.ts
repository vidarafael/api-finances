import { AppError } from "../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../users/repositories/in-memory/UsersRepositoryInMemory";
import { CategoryType } from "../../videos/infra/typeorm/entities/Video";
import { VideosRepositoryInMemory } from "../../videos/repositories/in-memory/VideosRepositoryInMemory";
import { CommentaryRepositoryInMemory } from "../repositories/in-memory/CommentaryRepositoryInMemory"
import { CreateCommentaryService } from "./CreateCommentaryService"
import { DeleteCommentaryService } from "./DeleteCommentaryService";

describe("Delete Commentary", () => {
  let commentaryRepositoryInMemory: CommentaryRepositoryInMemory;
  let videosRepositoryInMemory: VideosRepositoryInMemory;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createCommentaryService: CreateCommentaryService;
  let deleteCommentaryService: DeleteCommentaryService;

  beforeEach(async () => {
    commentaryRepositoryInMemory = new CommentaryRepositoryInMemory()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    videosRepositoryInMemory = new VideosRepositoryInMemory()
    createCommentaryService = new CreateCommentaryService(
      commentaryRepositoryInMemory,
      usersRepositoryInMemory,
      videosRepositoryInMemory
    );
    deleteCommentaryService = new DeleteCommentaryService(
      commentaryRepositoryInMemory,
      usersRepositoryInMemory,
    )
  })

  it("Should be able delete a commentary", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const video = await videosRepositoryInMemory.create({ url: 'http://www.teste.com', category: 'FIIS' as CategoryType })

    const commentary = await createCommentaryService.execute({
      user_id: user.id,
      video_id: video.id,
      description: 'Vídeo muito bom!!'
    })

    let commentaries = await commentaryRepositoryInMemory.listCommentariesByVideo(video.id)

    expect(commentaries.length).toBe(1)

    await deleteCommentaryService.execute({ user_id: user.id, commentary_id: commentary.id })

    commentaries = await commentaryRepositoryInMemory.listCommentariesByVideo(video.id)

    expect(commentaries.length).toBe(0)
  })

  it("Should not be able delete a commentary because no have an user", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const video = await videosRepositoryInMemory.create({ url: 'http://www.teste.com', category: 'FIIS' as CategoryType })

    const commentary = await createCommentaryService.execute({
      user_id: user.id,
      video_id: video.id,
      description: 'Vídeo muito bom!!'
    })

    await commentaryRepositoryInMemory.listCommentariesByVideo(video.id)

    expect(deleteCommentaryService.execute(
      {
        user_id: user.id + 'id_not_exists',
        commentary_id: commentary.id
      }
    )).rejects.toEqual(new AppError("User not found"))
  })
})