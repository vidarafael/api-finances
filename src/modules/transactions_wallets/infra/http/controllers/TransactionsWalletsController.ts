import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateTransactionsWalletsService } from '../../../services/CreateTransactionsWalletsService'

class TransactionsWalletsController {
  async create(request: Request, response: Response) {
    const { wallet_id } = request.params
    const { value, category, description } = request.body

    const createTransactionsWalletsService = container.resolve(CreateTransactionsWalletsService)

    const transactionWallet = await createTransactionsWalletsService.execute({ wallet_id, value, category, description })

    response.status(201).json(transactionWallet)
  }
}

export { TransactionsWalletsController }