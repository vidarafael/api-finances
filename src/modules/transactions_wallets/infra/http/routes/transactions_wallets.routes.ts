import { Router } from "express";
import { TransactionsWalletsController } from "../controllers/TransactionsWalletsController";


const transactionsWalletsRoute = Router()
const transactionsWalletsController = new TransactionsWalletsController()

transactionsWalletsRoute.post('/wallet/:wallet_id', transactionsWalletsController.create)

export { transactionsWalletsRoute }