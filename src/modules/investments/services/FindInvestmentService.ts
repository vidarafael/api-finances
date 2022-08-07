import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { IInvestmentDTO } from "../dtos/IInvestmentDTO";
import { IInvestmentsRepository } from "../repositories/IInvestmentsRepository";

@injectable()
class FindInvestmentService {
  constructor(
    @inject("InvestmentsRepository")
    private investmentRepository: IInvestmentsRepository,
  ) { }

  async execute(investment_id: string): Promise<IInvestmentDTO> {
    const investment = await this.investmentRepository.findById(investment_id)

    if (!investment) {
      throw new AppError("Investment not found")
    }

    return investment
  }
}

export { FindInvestmentService }