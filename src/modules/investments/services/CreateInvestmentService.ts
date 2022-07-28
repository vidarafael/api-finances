import { inject, injectable } from "tsyringe";
import { IGoalsRepository } from "../../goals/repositories/IGoalsRepository";
import { ICreateInvestmentDTO } from "../dtos/ICreateInvestmentDTO";
import { IInvestmentsRepository } from "../repositories/IInvestmentsRepository";

interface IRequest {
  value: number;
  dayOfInvestment: Date;
  goals_id: string;
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

  async execute({ value, dayOfInvestment, goals_id, priority }: IRequest): Promise<ICreateInvestmentDTO> {
    const goalAlreadyExists = await this.goalsRepository.findById(goals_id);

    if (!goalAlreadyExists) {
      throw new Error("Goal not found")
    }

    const investment = await this.investmentRepository.create({ value, dayOfInvestment, goals_id, priority })

    return investment
  }
}

export { CreateInvestmentService }