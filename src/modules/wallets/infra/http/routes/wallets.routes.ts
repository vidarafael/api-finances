import { Router } from "express";
import { WalletsController } from "../controller/WalletsController";


const walletRoute = Router()
const walletsController = new WalletsController()

walletRoute.post('/', walletsController.create)

export { walletRoute }