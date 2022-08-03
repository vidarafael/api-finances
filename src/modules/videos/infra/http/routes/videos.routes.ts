import { Router } from "express";
import { ensureAuthenticated } from "../../../../../shared/infra/http/middlewares/ensureAuthenticated";
import { VideosController } from "../controller/VideosController";

const videosRoute = Router()
const videosController = new VideosController()

videosRoute.use(ensureAuthenticated)

videosRoute.post('/', videosController.create)
videosRoute.get('/', videosController.list)

export { videosRoute }