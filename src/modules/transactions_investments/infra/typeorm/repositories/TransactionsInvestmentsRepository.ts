import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../data-source";
import { ICreateTransactionsInvestmentsDTO } from "../../../dto/ICreateTransactionsInvestmentsDTO";
import { ITransactionsInvestmentsDTO } from "../../../dto/ITransactionsInvestmentsDTO";
import { ITransactionsInvestmentsRepository } from "../../../repositories/ITransactionsWalletsRepository";
import { TransactionInvestment } from "../entities/TransactionInvestment";

class TransactionsInvestmentsRepository implements ITransactionsInvestmentsRepository {
  private repository: Repository<TransactionInvestment>

  constructor() {
    this.repository = AppDataSource.getRepository(TransactionInvestment)
  }

  async create({ investment_id, value, description, category, type }: ICreateTransactionsInvestmentsDTO): Promise<TransactionInvestment> {
    const transactionInvestment = this.repository.create({
      investment_id,
      value,
      description,
      category,
      type
    })

    await this.repository.save(transactionInvestment)

    return transactionInvestment
  }

  async findByInvestment(investment_id: string): Promise<ITransactionsInvestmentsDTO[]> {
    const transactionsInvestments = await this.repository.findBy({ investment_id })

    return transactionsInvestments
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id })
  }
}

export { TransactionsInvestmentsRepository }