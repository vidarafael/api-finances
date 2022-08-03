import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateWalletService } from '../../../services/CreateWalletService'
import { DeleteWalletService } from '../../../services/DeleteWalletService'
import { FindWalletService } from '../../../services/FindWalletService'

class WalletsController {
  async create(request: Request, response: Response): Promise<void> {
    const { id: user_id } = request.user
    const { value } = request.body

    const createWalletService = container.resolve(CreateWalletService)

    const wallet = await createWalletService.execute({ user_id, value })

    response.status(201).json(wallet)
  }

  async find(request: Request, response: Response): Promise<void> {
    const { id: user_id } = request.user

    const findWalletService = container.resolve(FindWalletService)

    const wallet = await findWalletService.execute(user_id)

    response.status(200).json(wallet)
  }

  async delete(request: Request, response: Response): Promise<void> {
    const { wallet_id } = request.params

    const deleteWalletService = container.resolve(DeleteWalletService)

    await deleteWalletService.execute(wallet_id)

    response.status(200).send()
  }
}

export { WalletsController }