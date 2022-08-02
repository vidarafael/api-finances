import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../users/repositories/IUsersRepository";
import { IGoalDTO } from "../dtos/IGoalDTO";
import { IGoalsRepository } from "../repositories/IGoalsRepository";

@injectable()
class ListGoalService {
  constructor(
    @inject("GoalsRepository")
    private goalsRepository: IGoalsRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }

  async execute(user_id: string): Promise<IGoalDTO[]> {
    const userAlreadyExists = await this.usersRepository.findById(user_id);

    if (!userAlreadyExists) {
      throw new Error("User not found");
    }

    const goals = await this.goalsRepository.list(user_id)

    return goals
  }
}

export { ListGoalService }