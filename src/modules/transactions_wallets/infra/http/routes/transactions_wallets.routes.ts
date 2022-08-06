import { Router } from "express";
import { ensureAuthenticated } from "../../../../../shared/infra/http/middlewares/ensureAuthenticated";
import { TransactionsWalletsController } from "../controllers/TransactionsWalletsController";


const transactionsWalletsRoute = Router()
const transactionsWalletsController = new TransactionsWalletsController()

transactionsWalletsRoute.use(ensureAuthenticated)

transactionsWalletsRoute.post('/wallet/:wallet_id', transactionsWalletsController.create)
transactionsWalletsRoute.get('/wallet/:wallet_id', transactionsWalletsController.list)
transactionsWalletsRoute.delete('/:transactions_wallets_id', transactionsWalletsController.delete)

export { transactionsWalletsRoute }