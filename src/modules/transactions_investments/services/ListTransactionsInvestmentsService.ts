import { inject, injectable } from "tsyringe";
import { IInvestmentsRepository } from "../../investments/repositories/IInvestmentsRepository";
import { ITransactionsInvestmentsDTO } from "../dto/ITransactionsInvestmentsDTO";
import { ITransactionsInvestmentsRepository } from "../repositories/ITransactionsWalletsRepository";

@injectable()
class ListTransactionsInvestmentsService {
  constructor(
    @inject("InvestmentsRepository")
    private investmentsRepository: IInvestmentsRepository,

    @inject("TransactionsInvestmentsRepository")
    private transactionsInvestmentsRepository: ITransactionsInvestmentsRepository,
  ) { }

  async execute(investment_id: string): Promise<ITransactionsInvestmentsDTO[]> {
    const investmentAlreadyExists = await this.investmentsRepository.findById(investment_id);

    if (!investmentAlreadyExists) {
      throw new Error("Investment does not exist")
    }

    const transactionsInvestments = await this.transactionsInvestmentsRepository.findByInvestment(investment_id)

    return transactionsInvestments
  }
}

export { ListTransactionsInvestmentsService }