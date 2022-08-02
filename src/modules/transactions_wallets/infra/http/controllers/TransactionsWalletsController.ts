import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateTransactionsWalletsService } from '../../../services/CreateTransactionsWalletsService'
import { DeleteTransactionWalletService } from '../../../services/DeleteTransactionWalletService'
import { ListTransactionsWalletsService } from '../../../services/ListTransactionsWalletsService'

class TransactionsWalletsController {
  async create(request: Request, response: Response) {
    const { wallet_id } = request.params
    const { value, category, description } = request.body

    const createTransactionsWalletsService = container.resolve(CreateTransactionsWalletsService)

    const transactionWallet = await createTransactionsWalletsService.execute({ wallet_id, value, category, description })

    response.status(201).json(transactionWallet)
  }

  async list(request: Request, response: Response) {
    const { wallet_id } = request.params

    const listTransactionsWalletsService = container.resolve(ListTransactionsWalletsService)

    const transactionWallet = await listTransactionsWalletsService.execute(wallet_id)

    response.status(200).json(transactionWallet)
  }

  async delete(request: Request, response: Response) {
    const { transactions_wallets_id } = request.params

    const deleteTransactionsWalletsService = container.resolve(DeleteTransactionWalletService)

    await deleteTransactionsWalletsService.execute(transactions_wallets_id)

    response.status(200).send()
  }

}

export { TransactionsWalletsController }