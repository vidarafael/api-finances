import { Router } from "express";
import { ensureAuthenticated } from "../../../../../shared/infra/http/middlewares/ensureAuthenticated";
import { FavoritesVideosController } from "../controller/FavoritesVideosController";

const favoritesVideosRoute = Router();
const favoritesVideosController = new FavoritesVideosController()

favoritesVideosRoute.use(ensureAuthenticated)

favoritesVideosRoute.post('/video/:video_id', favoritesVideosController.create)
favoritesVideosRoute.get('/', favoritesVideosController.list)
favoritesVideosRoute.delete('/:favorite_video_id', favoritesVideosController.delete)

export { favoritesVideosRoute }