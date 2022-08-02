import { inject, injectable } from "tsyringe";
import { IInvestmentsRepository } from "../repositories/IInvestmentsRepository";

@injectable()
class DeleteInvestmentService {
  constructor(
    @inject("InvestmentsRepository")
    private investmentRepository: IInvestmentsRepository,
  ) { }

  async execute(investment_id): Promise<void> {
    await this.investmentRepository.delete(investment_id)
  }
}

export { DeleteInvestmentService }