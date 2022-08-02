import { Router } from "express";
import { ensureAuthenticated } from "../../../../../shared/infra/http/middlewares/ensureAuthenticated";
import { TransactionsInvestmentsController } from "../controllers/TransactionsInvestmentsController";


const transactionsInvestmentsRoute = Router()
const transactionsInvestmentsController = new TransactionsInvestmentsController()

transactionsInvestmentsRoute.use(ensureAuthenticated)

transactionsInvestmentsRoute.get('/investment/:investment_id', transactionsInvestmentsController.list)
transactionsInvestmentsRoute.post('/investment/:investment_id', transactionsInvestmentsController.create)
transactionsInvestmentsRoute.delete('/:transaction_investment_id', transactionsInvestmentsController.delete)

export { transactionsInvestmentsRoute }