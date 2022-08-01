import { Router } from "express";
import { FavoritesVideosController } from "../controller/FavoritesVideosController";

const favoritesVideosRoute = Router();
const favoritesVideosController = new FavoritesVideosController()

favoritesVideosRoute.post('/video/:video_id', favoritesVideosController.create)
favoritesVideosRoute.get('/', favoritesVideosController.list)
favoritesVideosRoute.delete('/:favorite_video_id', favoritesVideosController.delete)

export { favoritesVideosRoute }