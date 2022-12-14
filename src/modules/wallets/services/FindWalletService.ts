import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { IUsersRepository } from "../../users/repositories/IUsersRepository";
import { ICreateWalletDTO } from "../dtos/ICreateWalletDTO";
import { IWalletsRepository } from "../repositories/IWalletsRepository";

@injectable()
class FindWalletService {
  constructor(
    @inject("WalletsRepository")
    private walletsRepository: IWalletsRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }

  async execute(user_id: string): Promise<ICreateWalletDTO> {
    const userAlreadyExists = await this.usersRepository.findById(user_id)

    if (!userAlreadyExists) {
      throw new AppError("User not found")
    }

    const wallet = await this.walletsRepository.findByUserId(user_id)

    if (!wallet) {
      throw new AppError("Wallet not found")
    }

    return wallet

  }
}

export { FindWalletService }