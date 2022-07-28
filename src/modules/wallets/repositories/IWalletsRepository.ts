import { ICreateWalletDTO } from "../dtos/ICreateWalletDTO"

interface IWalletsRepository {
  create({ user_id, value }: ICreateWalletDTO): Promise<ICreateWalletDTO>
  findByUserId(user_id: string): Promise<ICreateWalletDTO>
}

export { IWalletsRepository }