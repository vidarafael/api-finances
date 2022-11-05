import { Router } from "express";
import { ensureAuthenticated } from "../../../../../shared/infra/http/middlewares/ensureAuthenticated";
import { UsersController } from "../controller/UsersController";

const usersRoute = Router();
const usersController = new UsersController()

usersRoute.post('/', usersController.create)
usersRoute.post('/authenticate', usersController.authenticate)
usersRoute.delete('/', ensureAuthenticated, usersController.delete)

export { usersRoute }
