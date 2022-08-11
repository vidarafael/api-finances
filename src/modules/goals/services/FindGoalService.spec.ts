import { AppError } from "../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../users/repositories/in-memory/UsersRepositoryInMemory";
import { GoalsRepositoryInMemory } from "../repositories/in-memory/GoalsRepositoryInMemory";
import { CreateGoalService } from "./CreateGoalService";
import { FindGoalService } from "./FindGoalService";

describe("Find Goal", () => {
  let goalsRepositoryInMemory: GoalsRepositoryInMemory;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createGoalService: CreateGoalService;
  let findGoalService: FindGoalService;

  beforeEach(async () => {
    goalsRepositoryInMemory = new GoalsRepositoryInMemory()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createGoalService = new CreateGoalService(
      goalsRepositoryInMemory,
      usersRepositoryInMemory
    );
    findGoalService = new FindGoalService(
      goalsRepositoryInMemory,
      usersRepositoryInMemory
    );
  })

  it("Should be able find a goal", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const goal = await createGoalService.execute({
      name: 'comprar carro',
      amount: 200000,
      user_id: user.id,
    })

    const goalFinded = await findGoalService.execute({ user_id: user.id, goal_id: goal.id })

    expect(goalFinded).toMatchObject({
      id: goal.id,
      name: 'comprar carro',
      amount: 200000,
      user_id: user.id,
    })
  })

  it("Should not be able find a goal because no have an user", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const goal = await createGoalService.execute({
      name: 'comprar carro',
      amount: 200000,
      user_id: user.id,
    })

    expect(findGoalService.execute({
      user_id: user.id + 'id_not_exists',
      goal_id: goal.id
    })).rejects.toEqual(new AppError("User not found"))
  })
})