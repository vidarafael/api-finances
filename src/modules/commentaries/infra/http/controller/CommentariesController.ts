import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCommentaryService } from '../../../services/CreateCommentaryService'
import { DeleteCommentaryService } from '../../../services/DeleteCommentaryService'
import { ListCommentaryService } from '../../../services/ListCommentaryService'

class CommentariesController {
  async create(request: Request, response: Response): Promise<void> {
    const { id: user_id } = request.user
    const { video_id } = request.params
    const { description } = request.body

    const createCommentaryService = container.resolve(CreateCommentaryService)

    const commentary = await createCommentaryService.execute({
      user_id,
      video_id,
      description
    })

    response.status(201).json(commentary)
  }

  async list(request: Request, response: Response): Promise<void> {
    const { video_id } = request.params

    const listCommentaryService = container.resolve(ListCommentaryService)

    const commentaries = await listCommentaryService.execute(video_id)

    response.status(200).json(commentaries)
  }

  async delete(request: Request, response: Response): Promise<void> {
    const { id: user_id } = request.user
    const { commentary_id } = request.params

    const deleteCommentaryService = container.resolve(DeleteCommentaryService)

    await deleteCommentaryService.execute({ user_id, commentary_id })

    response.status(200).send()
  }
}

export { CommentariesController }