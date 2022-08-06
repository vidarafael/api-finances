import { Router } from "express";
import { WalletsController } from "../controller/WalletsController";

const walletRoute = Router()
const walletsController = new WalletsController()

walletRoute.post('/', walletsController.create)
walletRoute.get('/', walletsController.find)
walletRoute.delete('/:wallet_id', walletsController.delete)

export { walletRoute }