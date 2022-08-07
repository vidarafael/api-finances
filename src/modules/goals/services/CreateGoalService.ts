import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { IUsersRepository } from "../../users/repositories/IUsersRepository";
import { IGoalDTO } from "../dtos/IGoalDTO";
import { IGoalsRepository } from "../repositories/IGoalsRepository";

interface IRequest {
  name: string;
  amount: number;
  user_id?: string;
}

@injectable()
class CreateGoalService {
  constructor(
    @inject("GoalsRepository")
    private goalsRepository: IGoalsRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ name, amount, user_id }: IRequest): Promise<IGoalDTO> {
    const userAlreadyExists = await this.usersRepository.findById(user_id);

    if (!userAlreadyExists) {
      throw new AppError("User not found");
    }

    const goal = await this.goalsRepository.create({ name, amount, user_id })

    return goal
  }
}

export { CreateGoalService }