import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { IUsersRepository } from "../../users/repositories/IUsersRepository";
import { IGoalsRepository } from "../repositories/IGoalsRepository";

interface IRequest {
  user_id: string;
  goal_id: string;
}

@injectable()
class DeleteGoalService {
  constructor(
    @inject("GoalsRepository")
    private goalsRepository: IGoalsRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ user_id, goal_id }: IRequest): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findById(user_id);

    if (!userAlreadyExists) {
      throw new AppError("User not found");
    }

    await this.goalsRepository.delete({ id: goal_id, user_id })
  }
}

export { DeleteGoalService }