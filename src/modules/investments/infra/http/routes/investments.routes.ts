import { Router } from "express";
import { InvestmentsController } from "../controller/InvestmentsController";

const investmentsRoute = Router()
const investmentsController = new InvestmentsController()

investmentsRoute.post('/', investmentsController.create)

export { investmentsRoute }