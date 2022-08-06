import { ICreateTransactionsInvestmentsDTO } from "../dto/ICreateTransactionsInvestmentsDTO"
import { ITransactionsInvestmentsDTO } from "../dto/ITransactionsInvestmentsDTO"

interface ITransactionsInvestmentsRepository {
  create({
    investment_id,
    value,
    description,
    category
  }: ICreateTransactionsInvestmentsDTO): Promise<ITransactionsInvestmentsDTO>
  findByInvestment(investment_id: string): Promise<ITransactionsInvestmentsDTO[]>
  delete(id: string): Promise<void>
}

export { ITransactionsInvestmentsRepository }