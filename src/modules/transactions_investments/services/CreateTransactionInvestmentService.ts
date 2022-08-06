import { injectable, inject } from "tsyringe";
import { IInvestmentsRepository } from "../../investments/repositories/IInvestmentsRepository";
import { ITransactionsInvestmentsDTO } from "../dto/ITransactionsInvestmentsDTO";
import { ITransactionsInvestmentsRepository } from "../repositories/ITransactionsWalletsRepository";

interface IRequest {
  investment_id: string;
  value: number;
  description: string;
  category: string;
}

@injectable()
class CreateTransactionInvestmentService {
  constructor(
    @inject("InvestmentsRepository")
    private investmentsRepository: IInvestmentsRepository,

    @inject("TransactionsInvestmentsRepository")
    private transactionsInvestmentsRepository: ITransactionsInvestmentsRepository,
  ) { }

  async execute({ investment_id, value, description, category }: IRequest): Promise<ITransactionsInvestmentsDTO> {
    const investmentAlreadyExists = await this.investmentsRepository.findById(investment_id);

    if (!investmentAlreadyExists) {
      throw new Error("Investment does not exist")
    }

    const transactionInvestment = await this.transactionsInvestmentsRepository.create({ investment_id, value, description, category })

    return transactionInvestment
  }
}

export { CreateTransactionInvestmentService }