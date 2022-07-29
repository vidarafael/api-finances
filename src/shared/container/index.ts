import { container } from "tsyringe";
import { CommentaryRepository } from "../../modules/commentaries/infra/typeorm/repositories/CommentaryRepository";
import { ICommentaryRepository } from "../../modules/commentaries/repositories/ICommentaryRepository";
import { FavoritesVideosRepository } from "../../modules/favorites_videos/infra/typeorm/repositories/FavoritesVideosRepository";
import { IFavoritesVideosRepository } from "../../modules/favorites_videos/repositories/IFavoritesVideosRepository";
import { GoalsRepository } from "../../modules/goals/infra/typeorm/repositories/GoalsRepository";
import { IGoalsRepository } from "../../modules/goals/repositories/IGoalsRepository";
import { InvestmentsRepository } from "../../modules/investments/infra/typeorm/repositories/InvestmentsRepository";
import { IInvestmentsRepository } from "../../modules/investments/repositories/IInvestmentsRepository";
import { TransactionsWalletsRepository } from "../../modules/transactions_wallets/infra/typeorm/repositories/TransactionsWalletsRepository";
import { ITransactionsWalletsRepository } from "../../modules/transactions_wallets/repositories/ITransactionsWalletsRepository";
import { UsersRepository } from "../../modules/users/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { VideosRepository } from "../../modules/videos/infra/typeorm/repositories/VideosRepository";
import { IVideosRepository } from "../../modules/videos/repositories/IVideosRepository";
import { WalletsRepository } from "../../modules/wallets/infra/typeorm/repositories/WalletsRepository";
import { IWalletsRepository } from "../../modules/wallets/repositories/IWalletsRepository";

container.registerSingleton<ICommentaryRepository>(
  "CommentaryRepository",
  CommentaryRepository
);

container.registerSingleton<IVideosRepository>(
  "VideosRepository",
  VideosRepository
);

container.registerSingleton<IFavoritesVideosRepository>(
  "FavoritesVideosRepository",
  FavoritesVideosRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<IGoalsRepository>(
  "GoalsRepository",
  GoalsRepository
)

container.registerSingleton<IInvestmentsRepository>(
  "InvestmentsRepository",
  InvestmentsRepository
)

container.registerSingleton<IWalletsRepository>(
  "WalletsRepository",
  WalletsRepository
)

container.registerSingleton<ITransactionsWalletsRepository>(
  "TransactionsWalletsRepository",
  TransactionsWalletsRepository
)