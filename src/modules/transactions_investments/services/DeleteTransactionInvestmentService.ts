import { inject, injectable } from "tsyringe";
import { IInvestmentsRepository } from "../../investments/repositories/IInvestmentsRepository";
import { ITransactionsInvestmentsDTO } from "../dto/ITransactionsInvestmentsDTO";
import { ITransactionsInvestmentsRepository } from "../repositories/ITransactionsWalletsRepository";

@injectable()
class DeleteTransactionInvestmentService {
  constructor(
    @inject("TransactionsInvestmentsRepository")
    private transactionsInvestmentsRepository: ITransactionsInvestmentsRepository,
  ) { }

  async execute(transaction_investment_id: string): Promise<void> {

    await this.transactionsInvestmentsRepository.delete(transaction_investment_id)

  }
}

export { DeleteTransactionInvestmentService }