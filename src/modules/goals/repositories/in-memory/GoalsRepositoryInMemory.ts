import { IDeleteGoalDTO } from "../../dtos/IDeleteGoalDTO";
import { IFindByIdAndUserGoalDTO } from "../../dtos/IFindByIdAndUserGoalDTO";
import { IGoalDTO } from "../../dtos/IGoalDTO";
import { Goal } from "../../infra/typeorm/entities/Goal";
import { IGoalsRepository } from "../IGoalsRepository";


class GoalsRepositoryInMemory implements IGoalsRepository {
  private goals: Goal[] = [];

  async create({ name, amount, user_id }: IGoalDTO): Promise<IGoalDTO> {
    const goal = new Goal()

    Object.assign(goal, { name, amount, user_id })

    this.goals.push(goal)

    return goal
  }

  async findById(id: string): Promise<IGoalDTO> {
    const goal = this.goals.find(Goal => Goal.id === id)

    return goal
  }

  async list(user_id: string): Promise<IGoalDTO[]> {
    const goals = this.goals.filter(Goal => Goal.user_id === user_id)

    return goals
  }

  async findByIdAndUser({ id, user_id }: IFindByIdAndUserGoalDTO): Promise<IGoalDTO> {
    const goal = this.goals.find(Goal => Goal.id === id && Goal.user_id === user_id)

    return goal
  }

  async delete({ id, user_id }: IDeleteGoalDTO): Promise<void> {
    this.goals = this.goals.filter(Goal => Goal.id !== id && Goal.user_id !== user_id)
  }
}

export { GoalsRepositoryInMemory }