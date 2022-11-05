import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { AppError } from "../../../shared/errors/AppError";

@injectable()
class DeleteUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }

  async execute(email: string): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (!userAlreadyExists) {
      throw new AppError("User not found")
    }

    await this.usersRepository.delete(userAlreadyExists.id)
  }
}

export { DeleteUserService }