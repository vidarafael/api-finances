import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../data-source";
import { ICreateTransactionsInvestmentsDTO } from "../../../dto/ICreateTransactionsInvestmentsDTO";
import { ITransactionsInvestmentsRepository } from "../../../repositories/ITransactionsWalletsRepository";
import { TransactionInvestment } from "../entity/TransactionInvestment";

class TransactionsInvestmentsRepository implements ITransactionsInvestmentsRepository {
  private repository: Repository<TransactionInvestment>

  constructor() {
    this.repository = AppDataSource.getRepository(TransactionInvestment)
  }

  async create({ investment_id, value, description }: ICreateTransactionsInvestmentsDTO): Promise<TransactionInvestment> {
    const transactionInvestment = this.repository.create({ investment_id, value, description })

    await this.repository.save(transactionInvestment)

    return transactionInvestment
  }
}

export { TransactionsInvestmentsRepository }