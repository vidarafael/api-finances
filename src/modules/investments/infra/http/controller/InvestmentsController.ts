import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateInvestmentService } from '../../../services/CreateInvestmentService'

class InvestmentsController {
  async create(request: Request, response: Response) {
    const { value, dayOfInvestment, goals_id, priority } = request.body

    const createInvestmentService = container.resolve(CreateInvestmentService)

    const investment = await createInvestmentService.execute({ value, dayOfInvestment, goals_id, priority })

    response.status(201).json(investment)
  }
}

export { InvestmentsController }