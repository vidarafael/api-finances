import { IInvestmentDTO } from "../dtos/IInvestmentDTO"

interface IInvestmentsRepository {
  create({
    value,
    dayOfInvestment,
    goal_id,
    priority
  }: IInvestmentDTO): Promise<IInvestmentDTO>
  findById(id: string): Promise<IInvestmentDTO>
  findByGoal(goal_id: string): Promise<IInvestmentDTO>
  delete(id: string): Promise<void>
}

export { IInvestmentsRepository }