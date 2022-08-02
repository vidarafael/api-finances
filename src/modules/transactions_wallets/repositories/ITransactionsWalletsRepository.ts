import { ICreateTransactionsWalletsDTO } from "../dto/ICreateTransactionsWalletsDTO"
import { ITransactionsWalletsDTO } from "../dto/ITransactionsWalletsDTO"

interface ITransactionsWalletsRepository {
  create({
    wallet_id,
    value,
    category,
    description
  }: ICreateTransactionsWalletsDTO): Promise<ITransactionsWalletsDTO>
  findByWallet(wallet_id: string): Promise<ITransactionsWalletsDTO[]>
  delete(id: string): Promise<void>
}

export { ITransactionsWalletsRepository }