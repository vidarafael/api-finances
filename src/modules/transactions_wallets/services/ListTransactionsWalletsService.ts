import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { IWalletsRepository } from "../../wallets/repositories/IWalletsRepository";
import { ITransactionsWalletsDTO } from "../dto/ITransactionsWalletsDTO";
import { ITransactionsWalletsRepository } from "../repositories/ITransactionsWalletsRepository";


@injectable()
class ListTransactionsWalletsService {
  constructor(
    @inject("WalletsRepository")
    private walletsRepository: IWalletsRepository,

    @inject("TransactionsWalletsRepository")
    private transactionsWalletsRepository: ITransactionsWalletsRepository,
  ) { }

  async execute(wallet_id: string): Promise<ITransactionsWalletsDTO[]> {
    const walletAlreadyExists = await this.walletsRepository.findById(wallet_id);

    if (!walletAlreadyExists) {
      throw new AppError("Wallet does not exist")
    }

    const transactionsWallets = this.transactionsWalletsRepository.findByWallet(wallet_id)

    return transactionsWallets
  }
}

export { ListTransactionsWalletsService }