import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../data-source";
import { ICreateTransactionsWalletsDTO } from "../../../dto/ICreateTransactionsWalletsDTO";
import { ITransactionsWalletsDTO } from "../../../dto/ITransactionsWalletsDTO";
import { ITransactionsWalletsRepository } from "../../../repositories/ITransactionsWalletsRepository";
import { TransactionWallet } from "../entities/TransactionWallet";

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

  async findByWallet(wallet_id: string): Promise<ITransactionsWalletsDTO[]> {
    const transactionsWallet = await this.repository.findBy({ wallet_id })

    return transactionsWallet
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id })
  }
}

export { TransactionsWalletsRepository }