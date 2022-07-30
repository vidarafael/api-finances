import { Repository } from "typeorm"
import { AppDataSource } from "../../../../../data-source"
import { ICreateInvestmentDTO } from "../../../dtos/ICreateInvestmentDTO"
import { IInvestmentsRepository } from "../../../repositories/IInvestmentsRepository"
import { Investment } from "../entities/Investment"

class InvestmentsRepository implements IInvestmentsRepository {
  private repository: Repository<Investment>

  constructor() {
    this.repository = AppDataSource.getRepository(Investment)
  }

  async create({ value, dayOfInvestment, priority, goals_id }: ICreateInvestmentDTO): Promise<Investment> {
    const investment = this.repository.create({ value, dayOfInvestment, priority, goals_id })

    await this.repository.save(investment)

    return investment
  }

  async findById(id: string): Promise<ICreateInvestmentDTO> {
    const investment = this.repository.findOneBy({ id })

    return investment
  }
}

export { InvestmentsRepository }