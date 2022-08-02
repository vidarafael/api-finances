import { Router } from "express";
import { ensureAuthenticated } from "../../../../../shared/infra/http/middlewares/ensureAuthenticated";
import { InvestmentsController } from "../controller/InvestmentsController";

const investmentsRoute = Router()
const investmentsController = new InvestmentsController()

investmentsRoute.use(ensureAuthenticated)

investmentsRoute.post('/', investmentsController.create)
investmentsRoute.get('/:investment_id', investmentsController.find)
investmentsRoute.delete('/:investment_id', investmentsController.delete)

export { investmentsRoute }