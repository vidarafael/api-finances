import { inject, injectable } from "tsyringe"
import { AppError } from "../../../shared/errors/AppError"
import { IWalletsRepository } from "../../wallets/repositories/IWalletsRepository"
import { ITransactionsWalletsRepository } from "../repositories/ITransactionsWalletsRepository"

@injectable()
class DeleteTransactionWalletService {
  constructor(
    @inject("TransactionsWalletsRepository")
    private transactionsWalletsRepository: ITransactionsWalletsRepository,

    @inject("WalletsRepository")
    private walletsRepository: IWalletsRepository,
  ) { }

  async execute(transactions_wallets_id: string): Promise<void> {
    const transactionWallet = await this.transactionsWalletsRepository.findById(transactions_wallets_id)

    if (!transactionWallet) {
      throw new AppError("Transaction Wallet not found")
    }

    await this.transactionsWalletsRepository.delete(transactions_wallets_id)

    const totalValueOfTransactionsWallets = await this.transactionsWalletsRepository.getTotalValue(transactionWallet.wallet_id)

    await this.walletsRepository.update({ id: transactionWallet.wallet_id, value: totalValueOfTransactionsWallets })

  }
}

export { DeleteTransactionWalletService }