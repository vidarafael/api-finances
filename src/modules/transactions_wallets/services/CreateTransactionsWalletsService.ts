import { injectable, inject } from "tsyringe";
import { IWalletsRepository } from "../../wallets/repositories/IWalletsRepository";
import { ITransactionsWalletsDTO } from "../dto/ITransactionsWalletsDTO";
import { ITransactionsWalletsRepository } from "../repositories/ITransactionsWalletsRepository";

interface IRequest {
  wallet_id: string;
  value: number;
  category: string;
  description: string;
}

@injectable()
class CreateTransactionsWalletsService {
  constructor(
    @inject("WalletsRepository")
    private walletsRepository: IWalletsRepository,

    @inject("TransactionsWalletsRepository")
    private transactionsWalletsRepository: ITransactionsWalletsRepository,
  ) { }

  async execute({ wallet_id, value, category, description }: IRequest): Promise<ITransactionsWalletsDTO> {
    const walletAlreadyExists = await this.walletsRepository.findById(wallet_id);

    if (!walletAlreadyExists) {
      throw new Error("Wallet does not exist")
    }

    const transactionWallet = await this.transactionsWalletsRepository.create({ wallet_id, value, category, description })

    return transactionWallet
  }
}

export { CreateTransactionsWalletsService }