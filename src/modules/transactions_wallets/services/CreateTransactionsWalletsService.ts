import { injectable, inject } from "tsyringe";
import { OperationType } from "../../../shared/dto/IOperationTypeDTO";
import { AppError } from "../../../shared/errors/AppError";
import { IWalletsRepository } from "../../wallets/repositories/IWalletsRepository";
import { ITransactionsWalletsDTO } from "../dto/ITransactionsWalletsDTO";
import { ITransactionsWalletsRepository } from "../repositories/ITransactionsWalletsRepository";

interface IRequest {
  wallet_id: string;
  value: number;
  category: string;
  description: string;
  type: OperationType;
}

@injectable()
class CreateTransactionsWalletsService {
  constructor(
    @inject("WalletsRepository")
    private walletsRepository: IWalletsRepository,

    @inject("TransactionsWalletsRepository")
    private transactionsWalletsRepository: ITransactionsWalletsRepository,
  ) { }

  async execute({ wallet_id, value, category, description, type }: IRequest): Promise<ITransactionsWalletsDTO> {
    const walletAlreadyExists = await this.walletsRepository.findById(wallet_id);

    if (!walletAlreadyExists) {
      throw new AppError("Wallet does not exist")
    }

    const transactionWallet = await this.transactionsWalletsRepository.create({ wallet_id, value, category, description, type })

    // await this.walletsRepository.update({ id: wallet_id, value })

    return transactionWallet
  }
}

export { CreateTransactionsWalletsService }