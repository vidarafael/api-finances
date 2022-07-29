import { Router } from "express";
import { commentariesRoute } from "../../../../modules/commentaries/infra/http/routes/commentaries.routes";
import { favoritesVideosRoute } from "../../../../modules/favorites_videos/infra/http/routes/favorites_videos.routes";
import { goalsRoute } from "../../../../modules/goals/infra/http/routes/goals.routes";
import { investmentsRoute } from "../../../../modules/investments/infra/http/routes/investments.routes";
import { transactionsWalletsRoute } from "../../../../modules/transactions_wallets/infra/http/routes/transactions_wallets.routes";
import { usersRoute } from "../../../../modules/users/infra/http/routes/users.routes";
import { videosRoute } from "../../../../modules/videos/infra/http/routes/videos.routes";
import { walletRoute } from "../../../../modules/wallets/infra/http/routes/wallets.routes";

const router = Router()

router.use("/commentarys", commentariesRoute)
router.use("/favorite_videos", favoritesVideosRoute)
router.use("/goals", goalsRoute)
router.use("/investments", investmentsRoute)
router.use("/users", usersRoute)
router.use("/videos", videosRoute)
router.use("/wallets", walletRoute)
router.use("/transactions_wallets", transactionsWalletsRoute)

export { router }