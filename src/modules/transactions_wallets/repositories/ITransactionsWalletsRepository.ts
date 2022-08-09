import { ICreateTransactionsWalletsDTO } from "../dto/ICreateTransactionsWalletsDTO"
import { ITransactionsWalletsDTO } from "../dto/ITransactionsWalletsDTO"

interface ITransactionsWalletsRepository {
  create({
    wallet_id,
    value,
    category,
    description,
    type
  }: ICreateTransactionsWalletsDTO): Promise<ITransactionsWalletsDTO>
  findByWallet(wallet_id: string): Promise<ITransactionsWalletsDTO[]>
  delete(id: string): Promise<void>
  getTotalValue(wallet_id: string): Promise<number>
  findById(id: string): Promise<ITransactionsWalletsDTO>
}

export { ITransactionsWalletsRepository }