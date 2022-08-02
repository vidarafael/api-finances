import { inject, injectable } from "tsyringe";
import { IGoalsRepository } from "../../goals/repositories/IGoalsRepository";
import { IInvestmentDTO } from "../dtos/IInvestmentDTO";
import { IInvestmentsRepository } from "../repositories/IInvestmentsRepository";

interface IRequest {
  value: number;
  dayOfInvestment: Date;
  goal_id: string;
  priority: string;
}

@injectable()
class CreateInvestmentService {
  constructor(
    @inject("InvestmentsRepository")
    private investmentRepository: IInvestmentsRepository,

    @inject("GoalsRepository")
    private goalsRepository: IGoalsRepository,
  ) { }

  async execute({ value, dayOfInvestment, goal_id, priority }: IRequest): Promise<IInvestmentDTO> {
    const goalAlreadyExists = await this.goalsRepository.findById(goal_id);

    if (!goalAlreadyExists) {
      throw new Error("Goal not found")
    }

    const investmentAlreadyExists = await this.investmentRepository.findByGoal(goal_id)

    if (investmentAlreadyExists) {
      throw new Error("Investment already exists")
    }

    const investment = await this.investmentRepository.create({ value, dayOfInvestment, goal_id, priority })

    return investment
  }
}

export { CreateInvestmentService }