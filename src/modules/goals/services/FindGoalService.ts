import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../users/repositories/IUsersRepository";
import { IGoalDTO } from "../dtos/IGoalDTO";
import { IGoalsRepository } from "../repositories/IGoalsRepository";

interface IRequest {
  user_id: string;
  goal_id: string;
}

@injectable()
class FindGoalService {
  constructor(
    @inject("GoalsRepository")
    private goalsRepository: IGoalsRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ user_id, goal_id }: IRequest): Promise<IGoalDTO> {
    const userAlreadyExists = await this.usersRepository.findById(user_id);

    if (!userAlreadyExists) {
      throw new Error("User not found");
    }

    const goals = await this.goalsRepository.findByIdAndUser({ id: goal_id, user_id })

    return goals
  }
}

export { FindGoalService }