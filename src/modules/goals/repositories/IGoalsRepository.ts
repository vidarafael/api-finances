import { IDeleteGoalDTO } from "../dtos/IDeleteGoalDTO";
import { IFindByIdAndUserGoalDTO } from "../dtos/IFindByIdAndUserGoalDTO";
import { IGoalDTO } from "../dtos/IGoalDTO";

interface IGoalsRepository {
  create({ name, amount, user_id }: IGoalDTO): Promise<IGoalDTO>
  findById(id: string): Promise<IGoalDTO>
  list(user_id: string): Promise<IGoalDTO[]>
  findByIdAndUser({ id, user_id }: IFindByIdAndUserGoalDTO): Promise<IGoalDTO>
  delete({ id, user_id }: IDeleteGoalDTO): Promise<void>
}

export { IGoalsRepository }