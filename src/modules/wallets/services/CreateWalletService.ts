import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { IUsersRepository } from "../../users/repositories/IUsersRepository";
import { ICreateWalletDTO } from "../dtos/ICreateWalletDTO";
import { IWalletsRepository } from "../repositories/IWalletsRepository";

interface IRequest {
  user_id: string;
  value: number;
}

@injectable()
class CreateWalletService {
  constructor(
    @inject("WalletsRepository")
    private walletsRepository: IWalletsRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ user_id, value }: IRequest): Promise<ICreateWalletDTO> {
    const userAlreadyExists = await this.usersRepository.findById(user_id)

    if (!userAlreadyExists) {
      throw new AppError("User not found")
    }

    const walletAlreadyExists = await this.walletsRepository.findByUserId(user_id)

    if (walletAlreadyExists) {
      throw new AppError("Wallet already exists")
    }

    const wallet = await this.walletsRepository.create({ user_id, value })

    return wallet
  }
}

export { CreateWalletService }