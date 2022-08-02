import { Repository } from "typeorm"
import { AppDataSource } from "../../../../../data-source"
import { IInvestmentDTO } from "../../../dtos/IInvestmentDTO"
import { IInvestmentsRepository } from "../../../repositories/IInvestmentsRepository"
import { Investment } from "../entities/Investment"

class InvestmentsRepository implements IInvestmentsRepository {
  private repository: Repository<Investment>

  constructor() {
    this.repository = AppDataSource.getRepository(Investment)
  }

  async create({ value, dayOfInvestment, priority, goal_id }: IInvestmentDTO): Promise<Investment> {
    const investment = this.repository.create({ value, dayOfInvestment, priority, goal_id })

    await this.repository.save(investment)

    return investment
  }

  async findById(id: string): Promise<IInvestmentDTO> {
    const investment = await this.repository.findOneBy({ id })

    return investment
  }

  async findByGoal(goal_id: string): Promise<IInvestmentDTO> {
    const investment = await this.repository.findOneBy({ goal_id })

    return investment
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id })
  }
}

export { InvestmentsRepository }