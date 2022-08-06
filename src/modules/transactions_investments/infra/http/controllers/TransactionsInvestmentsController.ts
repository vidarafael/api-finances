import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateTransactionInvestmentService } from '../../../services/CreateTransactionInvestmentService'
import { DeleteTransactionInvestmentService } from '../../../services/DeleteTransactionInvestmentService'
import { ListTransactionsInvestmentsService } from '../../../services/ListTransactionsInvestmentsService'

class TransactionsInvestmentsController {
  async create(request: Request, response: Response) {
    const { investment_id } = request.params
    const { value, description, category } = request.body

    const createTransactionInvestmentService = container.resolve(CreateTransactionInvestmentService)

    const transactionInvestments = await createTransactionInvestmentService.execute({ investment_id, value, description, category })

    response.status(201).json(transactionInvestments)
  }

  async list(request: Request, response: Response) {
    const { investment_id } = request.params

    const listTransactionsInvestmentsService = container.resolve(ListTransactionsInvestmentsService)

    const transactionsInvestments = listTransactionsInvestmentsService.execute(investment_id)

    response.status(200).json(transactionsInvestments)
  }

  async delete(request: Request, response: Response) {
    const { transaction_investment_id } = request.params

    const deleteTransactionInvestmentService = container.resolve(DeleteTransactionInvestmentService)

    await deleteTransactionInvestmentService.execute(transaction_investment_id)

    response.status(200).send()
  }
}

export { TransactionsInvestmentsController }