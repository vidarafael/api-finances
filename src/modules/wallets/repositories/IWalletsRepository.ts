import { ICreateWalletDTO } from "../dtos/ICreateWalletDTO"
import { IUpdateWalletDTO } from "../dtos/IUpdateWalletDTO"

interface IWalletsRepository {
  create({ user_id, value }: ICreateWalletDTO): Promise<ICreateWalletDTO>
  findByUserId(user_id: string): Promise<ICreateWalletDTO>
  findById(wallet_id: string): Promise<ICreateWalletDTO>
  delete(id: string): Promise<void>
  update({ id, value }: IUpdateWalletDTO): Promise<void>
}

export { IWalletsRepository }