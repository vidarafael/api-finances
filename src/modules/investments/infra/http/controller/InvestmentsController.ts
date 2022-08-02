import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateInvestmentService } from '../../../services/CreateInvestmentService'
import { DeleteInvestmentService } from '../../../services/DeleteInvestmentService'
import { FindInvestmentService } from '../../../services/FindInvestmentService'

class InvestmentsController {
  async create(request: Request, response: Response) {
    const { value, dayOfInvestment, goal_id, priority } = request.body

    const createInvestmentService = container.resolve(CreateInvestmentService)

    const investment = await createInvestmentService.execute({ value, dayOfInvestment, goal_id, priority })

    response.status(201).json(investment)
  }

  async find(request: Request, response: Response) {
    const { investment_id } = request.params

    const findInvestmentService = container.resolve(FindInvestmentService)

    const investment = await findInvestmentService.execute(investment_id)

    response.status(200).json(investment)
  }

  async delete(request: Request, response: Response) {
    const { investment_id } = request.params

    const deleteInvestmentService = container.resolve(DeleteInvestmentService)

    await deleteInvestmentService.execute(investment_id)

    response.status(200).send()
  }

}

export { InvestmentsController }