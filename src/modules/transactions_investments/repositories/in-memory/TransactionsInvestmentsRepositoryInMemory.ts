import { ICreateTransactionsWalletsDTO } from "../../../transactions_wallets/dto/ICreateTransactionsWalletsDTO";
import { ITransactionsWalletsDTO } from "../../../transactions_wallets/dto/ITransactionsWalletsDTO";
import { ICreateTransactionsInvestmentsDTO } from "../../dto/ICreateTransactionsInvestmentsDTO";
import { ITransactionsInvestmentsDTO } from "../../dto/ITransactionsInvestmentsDTO";
import { TransactionInvestment } from "../../infra/typeorm/entities/TransactionInvestment";
import { ITransactionsInvestmentsRepository } from "../ITransactionsWalletsRepository";

class TransactionsInvestmentsRepositoryInMemory implements ITransactionsInvestmentsRepository {
  private transactionsInvestments: TransactionInvestment[] = [];

  async create({ investment_id, value, description, category, type }: ICreateTransactionsInvestmentsDTO): Promise<ITransactionsInvestmentsDTO> {
    const transactionInvestment = new TransactionInvestment()

    Object.assign(transactionInvestment, {
      value,
      category,
      description,
      type,
      investment_id
    })

    this.transactionsInvestments.push(transactionInvestment)

    return transactionInvestment
  }

  async findByInvestment(investment_id: string): Promise<ITransactionsInvestmentsDTO[]> {
    const transactionsInvestment = this.transactionsInvestments.filter((transactionInvestment) => { transactionInvestment.investment_id === investment_id })

    return transactionsInvestment
  }

  async delete(id: string): Promise<void> {
    const transactionsInvestmentsFiltered = this.transactionsInvestments.filter((transactionInvestment) => { transactionInvestment.id !== id })

    this.transactionsInvestments = transactionsInvestmentsFiltered
  }
}

export { TransactionsInvestmentsRepositoryInMemory }