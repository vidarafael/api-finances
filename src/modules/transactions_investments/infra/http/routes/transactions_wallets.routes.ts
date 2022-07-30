import { Router } from "express";
import { TransactionsInvestmentsController } from "../controllers/TransactionsInvestmentsController";


const transactionsInvestmentsRoute = Router()
const transactionsInvestmentsController = new TransactionsInvestmentsController()

transactionsInvestmentsRoute.post('/investment/:investment_id', transactionsInvestmentsController.create)

export { transactionsInvestmentsRoute }