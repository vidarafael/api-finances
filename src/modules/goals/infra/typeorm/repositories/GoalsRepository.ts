import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../data-source";
import { IDeleteGoalDTO } from "../../../dtos/IDeleteGoalDTO";
import { IFindByIdAndUserGoalDTO } from "../../../dtos/IFindByIdAndUserGoalDTO";
import { IGoalDTO } from "../../../dtos/IGoalDTO";
import { IGoalsRepository } from "../../../repositories/IGoalsRepository";
import { Goal } from "../entities/Goal";

class GoalsRepository implements IGoalsRepository {
  private repository: Repository<Goal>

  constructor() {
    this.repository = AppDataSource.getRepository(Goal)
  }

  async create({ name, amount, user_id }: IGoalDTO): Promise<Goal> {
    const goal = this.repository.create({ name, amount, user_id })

    await this.repository.save(goal)

    return goal
  }

  async findById(id: string): Promise<IGoalDTO> {
    const goal = await this.repository.findOneBy({ id })

    return goal
  }

  async list(user_id: string): Promise<IGoalDTO[]> {
    const goals = await this.repository.findBy({ user_id })

    return goals
  }

  async findByIdAndUser({ id, user_id }: IFindByIdAndUserGoalDTO): Promise<IGoalDTO> {
    const goal = await this.repository.findOneBy({ id, user_id })

    return goal
  }

  async delete({ id, user_id }: IDeleteGoalDTO): Promise<void> {
    await this.repository.delete({ id, user_id })
  }
}

export { GoalsRepository }