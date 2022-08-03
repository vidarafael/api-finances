import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateVideoService } from '../../../services/CreateVideoService'
import { ListVideosService } from '../../../services/ListVideosService'

class VideosController {
  async create(request: Request, response: Response) {
    const { url, category } = request.body

    const createVideoService = container.resolve(CreateVideoService)

    const video = await createVideoService.execute({ url, category })

    response.status(201).json(video)
  }

  async list(request: Request, response: Response) {
    const listVideosService = container.resolve(ListVideosService)

    const videos = await listVideosService.execute()

    response.status(200).json(videos)
  }
}

export { VideosController }