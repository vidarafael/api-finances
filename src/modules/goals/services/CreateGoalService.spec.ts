import { AppError } from "../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../users/repositories/in-memory/UsersRepositoryInMemory";
import { GoalsRepositoryInMemory } from "../repositories/in-memory/GoalsRepositoryInMemory";
import { CreateGoalService } from "./CreateGoalService";

describe("Create Goal", () => {
  let goalsRepositoryInMemory: GoalsRepositoryInMemory;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createGoalService: CreateGoalService;

  beforeEach(async () => {
    goalsRepositoryInMemory = new GoalsRepositoryInMemory()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createGoalService = new CreateGoalService(
      goalsRepositoryInMemory,
      usersRepositoryInMemory
    );
  })

  it("Should be able create a goal", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const goal = await createGoalService.execute({
      name: 'comprar carro',
      amount: 200000,
      user_id: user.id,
    })

    expect(goal).toMatchObject({
      id: goal.id,
      name: 'comprar carro',
      amount: 200000,
      user_id: user.id,
    })
  })

  it("Should not be able create a goal because no have an user", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    expect(createGoalService.execute({
      name: 'comprar carro',
      amount: 200000,
      user_id: user.id + 'id_not_exists',
    })).rejects.toEqual(new AppError("User not found"))
  })
})