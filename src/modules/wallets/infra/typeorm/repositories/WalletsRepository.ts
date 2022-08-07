import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../data-source";
import { ICreateWalletDTO } from "../../../dtos/ICreateWalletDTO";
import { IUpdateWalletDTO } from "../../../dtos/IUpdateWalletDTO";
import { IWalletsRepository } from "../../../repositories/IWalletsRepository";
import { Wallet } from "../entities/Wallet";


class WalletsRepository implements IWalletsRepository {
  private repository: Repository<Wallet>;

  constructor() {
    this.repository = AppDataSource.getRepository(Wallet);
  }

  async create({ user_id, value }: ICreateWalletDTO): Promise<ICreateWalletDTO> {
    const wallet = this.repository.create({ user_id, value })

    await this.repository.save(wallet)

    return wallet
  }

  async findByUserId(user_id: string): Promise<ICreateWalletDTO> {
    const wallet = await this.repository.findOneBy({ user_id })

    return wallet
  }

  async findById(id: string): Promise<ICreateWalletDTO> {
    const wallet = await this.repository.findOneBy({ id })

    return wallet
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id })
  }

  async update({ id, value }: IUpdateWalletDTO): Promise<void> {
    await this.repository.save({
      id,
      value
    })
  }
}

export { WalletsRepository }