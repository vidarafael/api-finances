import { ICreateTransactionsInvestmentsDTO } from "../dto/ICreateTransactionsInvestmentsDTO"
import { ITransactionsInvestmentsDTO } from "../dto/ITransactionsInvestmentsDTO"

interface ITransactionsInvestmentsRepository {
  create({
    investment_id,
    value,
    description
  }: ICreateTransactionsInvestmentsDTO): Promise<ITransactionsInvestmentsDTO>
}

export { ITransactionsInvestmentsRepository }