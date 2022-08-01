import { Router } from "express";
import { ensureAuthenticated } from "../../../../../shared/infra/http/middlewares/ensureAuthenticated";
import { CommentariesController } from "../controller/CommentariesController";

const commentariesRoute = Router();
const commentariesController = new CommentariesController()

commentariesRoute.use(ensureAuthenticated)

commentariesRoute.post('/video/:video_id', commentariesController.create)
commentariesRoute.get('/video/:video_id', commentariesController.list)
commentariesRoute.delete('/:commentary_id', commentariesController.delete)

export { commentariesRoute }