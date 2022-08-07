import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";
import auth from '../../../configs/auth'
import { AppError } from "../../../shared/errors/AppError";

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }

  async execute(email: string): Promise<string> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (!userAlreadyExists) {
      throw new AppError("User not found")
    }

    const token = sign({}, auth.secret_token, {
      subject: userAlreadyExists.id,
      expiresIn: auth.expires_in_token
    })

    return token
  }
}

export { AuthenticateUserService }