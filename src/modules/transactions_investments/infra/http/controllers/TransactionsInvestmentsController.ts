import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateTransactionsInvestmentsService } from '../../../services/CreateTransactionsInvestmentsService'

class TransactionsInvestmentsController {
  async create(request: Request, response: Response) {
    const { investment_id } = request.params
    const { value, description } = request.body

    const createTransactionsInvestmentsService = container.resolve(CreateTransactionsInvestmentsService)

    const transactionInvestments = await createTransactionsInvestmentsService.execute({ investment_id, value, description })

    response.status(201).json(transactionInvestments)
  }
}

export { TransactionsInvestmentsController }