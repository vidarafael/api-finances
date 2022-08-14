import { IInvestmentDTO } from "../../dtos/IInvestmentDTO";
import { Investment } from "../../infra/typeorm/entities/Investment";
import { IInvestmentsRepository } from "../IInvestmentsRepository";

class InvestmentsRepositoryInMemory implements IInvestmentsRepository {
  private investments: Investment[] = [];

  async create({ value, dayOfInvestment, goal_id, priority }: IInvestmentDTO): Promise<IInvestmentDTO> {
    const investment = new Investment()

    Object.assign(investment, {
      value,
      dayOfInvestment,
      goal_id,
      priority
    })

    this.investments.push(investment)

    return investment
  }

  async findById(id: string): Promise<IInvestmentDTO> {
    const investment = this.investments.find(Investment => Investment.id === id)

    return investment
  }

  async findByGoal(goal_id: string): Promise<IInvestmentDTO> {
    const investment = this.investments.find(Investment => Investment.goal_id === goal_id)

    return investment
  }

  async delete(id: string): Promise<void> {
    const investmentIndex = this.investments.findIndex(Investment => Investment.id === id)
    this.investments.splice(investmentIndex, 1)
  }
}

export { InvestmentsRepositoryInMemory }