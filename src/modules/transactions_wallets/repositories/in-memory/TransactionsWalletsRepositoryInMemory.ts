import { ICreateTransactionsWalletsDTO } from "../../dto/ICreateTransactionsWalletsDTO";
import { ITransactionsWalletsDTO } from "../../dto/ITransactionsWalletsDTO";
import { TransactionWallet } from "../../infra/typeorm/entities/TransactionWallet";
import { ITransactionsWalletsRepository } from "../ITransactionsWalletsRepository";


class TransactionsWalletsRepositoryInMemory implements ITransactionsWalletsRepository {
  private transactionsWallets: TransactionWallet[] = [];

  async create({ wallet_id, value, category, description, type }: ICreateTransactionsWalletsDTO): Promise<ITransactionsWalletsDTO> {
    const transactionWallet = new TransactionWallet()

    Object.assign(transactionWallet, {
      wallet_id,
      value,
      category,
      description,
      type
    })

    this.transactionsWallets.push(transactionWallet)

    return transactionWallet
  }

  async findByWallet(wallet_id: string): Promise<ITransactionsWalletsDTO[]> {
    const transactionsWallets = this.transactionsWallets.filter(transactionWallet => transactionWallet.wallet_id === wallet_id)

    return transactionsWallets
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getTotalValue(wallet_id: string): Promise<number> {
    throw new Error("Method not implemented.");
  }

  findById(id: string): Promise<ITransactionsWalletsDTO> {
    throw new Error("Method not implemented.");
  }
}

export { TransactionsWalletsRepositoryInMemory }