import { inject, injectable } from "tsyringe"
import { ITransactionsWalletsRepository } from "../repositories/ITransactionsWalletsRepository"

injectable()
class DeleteTransactionWalletService {
  constructor(
    @inject("TransactionsWalletsRepository")
    private transactionsWalletsRepository: ITransactionsWalletsRepository,
  ) { }

  async execute(transactions_wallets_id: string): Promise<void> {
    await this.transactionsWalletsRepository.delete(transactions_wallets_id)
  }
}

export { DeleteTransactionWalletService }