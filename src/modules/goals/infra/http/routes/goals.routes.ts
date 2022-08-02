import { Router } from "express";
import { ensureAuthenticated } from "../../../../../shared/infra/http/middlewares/ensureAuthenticated";
import { GoalsController } from "../controller/GoalsController";

const goalsRoute = Router()
const goalsController = new GoalsController()

goalsRoute.use(ensureAuthenticated)

goalsRoute.post('/', goalsController.create)
goalsRoute.get('/', goalsController.list)
goalsRoute.get('/:goal_id', goalsController.find)
goalsRoute.delete('/:goal_id', goalsController.delete)

export { goalsRoute }