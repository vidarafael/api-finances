import { inject, injectable } from "tsyringe";
import { IWalletsRepository } from "../repositories/IWalletsRepository";

@injectable()
class DeleteWalletService {
  constructor(
    @inject("WalletsRepository")
    private walletsRepository: IWalletsRepository,
  ) { }

  async execute(wallet_id: string): Promise<void> {
    await this.walletsRepository.delete(wallet_id)
  }
}

export { DeleteWalletService }