import { Router } from "express";
import { ensureAuthenticated } from "../../../../../shared/infra/http/middlewares/ensureAuthenticated";
import { WalletsController } from "../controller/WalletsController";

const walletRoute = Router()
const walletsController = new WalletsController()

walletRoute.use(ensureAuthenticated)

walletRoute.post('/', walletsController.create)
walletRoute.get('/', walletsController.find)
walletRoute.delete('/:wallet_id', walletsController.delete)

export { walletRoute }