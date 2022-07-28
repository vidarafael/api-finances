import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateWalletService } from '../../../services/CreateWalletService'

class WalletsController {
  async create(request: Request, response: Response): Promise<void> {
    const { id: user_id } = request.user
    const { value } = request.body

    const createWalletService = container.resolve(CreateWalletService)

    const wallet = await createWalletService.execute({ user_id, value })

    response.status(201).json(wallet)

  }
}

export { WalletsController }