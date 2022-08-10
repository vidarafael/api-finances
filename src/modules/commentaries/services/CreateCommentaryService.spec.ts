import { CommentaryRepositoryInMemory } from "../repositories/in-memory/CommentaryRepositoryInMemory"
import { CreateCommentaryService } from "./CreateCommentaryService"

describe("Create Commentary", () => {
  let commentaryRepositoryInMemory: CommentaryRepositoryInMemory;
  let createCommentaryService: CreateCommentaryService;

  beforeEach(async () => {
    commentaryRepositoryInMemory = new CommentaryRepositoryInMemory()
    // createCommentaryService = new CreateCommentaryService(commentaryRepositoryInMemory);
  })

})