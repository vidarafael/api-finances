import { Router } from "express";
import { TransactionsWalletsController } from "../controllers/TransactionsWalletsController";


const transactionsWalletsRoute = Router()
const transactionsWalletsController = new TransactionsWalletsController()

transactionsWalletsRoute.post('/wallet/:wallet_id', transactionsWalletsController.create)
transactionsWalletsRoute.get('/wallet/:wallet_id', transactionsWalletsController.list)
transactionsWalletsRoute.get('/:transactions_wallets_id', transactionsWalletsController.delete)

export { transactionsWalletsRoute }