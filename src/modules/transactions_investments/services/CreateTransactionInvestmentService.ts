import { injectable, inject } from "tsyringe";
import { OperationType } from "../../../shared/dto/IOperationTypeDTO";
import { AppError } from "../../../shared/errors/AppError";
import { IInvestmentsRepository } from "../../investments/repositories/IInvestmentsRepository";
import { ITransactionsInvestmentsDTO } from "../dto/ITransactionsInvestmentsDTO";
import { ITransactionsInvestmentsRepository } from "../repositories/ITransactionsWalletsRepository";

interface IRequest {
  investment_id: string;
  value: number;
  description: string;
  category: string;
  type: OperationType;
}

@injectable()
class CreateTransactionInvestmentService {
  constructor(
    @inject("InvestmentsRepository")
    private investmentsRepository: IInvestmentsRepository,

    @inject("TransactionsInvestmentsRepository")
    private transactionsInvestmentsRepository: ITransactionsInvestmentsRepository,
  ) { }

  async execute({ investment_id, value, description, category, type }: IRequest): Promise<ITransactionsInvestmentsDTO> {
    const investmentAlreadyExists = await this.investmentsRepository.findById(investment_id);

    if (!investmentAlreadyExists) {
      throw new AppError("Investment does not exist")
    }

    const transactionInvestment = await this.transactionsInvestmentsRepository.create({
      investment_id,
      value,
      description,
      category,
      type
    })

    return transactionInvestment
  }
}

export { CreateTransactionInvestmentService }