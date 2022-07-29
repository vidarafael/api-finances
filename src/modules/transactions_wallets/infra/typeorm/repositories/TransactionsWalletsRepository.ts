import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../data-source";
import { ICreateTransactionsWalletsDTO } from "../../../dto/ICreateTransactionsWalletsDTO";
import { ITransactionsWalletsDTO } from "../../../dto/ITransactionsWalletsDTO";
import { ITransactionsWalletsRepository } from "../../../repositories/ITransactionsWalletsRepository";
import { TransactionWallet } from "../entity/TransactionWallet";

class TransactionsWalletsRepository implements ITransactionsWalletsRepository {
  private repository: Repository<TransactionWallet>

  constructor() {
    this.repository = AppDataSource.getRepository(TransactionWallet)
  }

  async create({ wallet_id, value, category, description }: ICreateTransactionsWalletsDTO): Promise<ITransactionsWalletsDTO> {
    const transactionWallet = this.repository.create({ wallet_id, value, category, description })

    await this.repository.save(transactionWallet)

    return transactionWallet
  }
}

export { TransactionsWalletsRepository }