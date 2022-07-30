import { ICreateInvestmentDTO } from "../dtos/ICreateInvestmentDTO"

interface IInvestmentsRepository {
  create({
    value,
    dayOfInvestment,
    goals_id,
    priority
  }: ICreateInvestmentDTO): Promise<ICreateInvestmentDTO>

  findById(id: string): Promise<ICreateInvestmentDTO>
}

export { IInvestmentsRepository }