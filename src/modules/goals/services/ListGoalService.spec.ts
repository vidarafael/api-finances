import { AppError } from "../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../users/repositories/in-memory/UsersRepositoryInMemory";
import { GoalsRepositoryInMemory } from "../repositories/in-memory/GoalsRepositoryInMemory";
import { CreateGoalService } from "./CreateGoalService";
import { ListGoalService } from "./ListGoalService";

describe("List Goals", () => {
  let goalsRepositoryInMemory: GoalsRepositoryInMemory;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createGoalService: CreateGoalService;
  let listGoalService: ListGoalService;

  beforeEach(async () => {
    goalsRepositoryInMemory = new GoalsRepositoryInMemory()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createGoalService = new CreateGoalService(
      goalsRepositoryInMemory,
      usersRepositoryInMemory
    );
    listGoalService = new ListGoalService(
      goalsRepositoryInMemory,
      usersRepositoryInMemory
    );
  })

  it("Should be able find a goal", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    await createGoalService.execute({
      name: 'comprar carro',
      amount: 200000,
      user_id: user.id,
    })

    await createGoalService.execute({
      name: 'investir',
      amount: 1000000,
      user_id: user.id,
    })

    const goals = await listGoalService.execute(user.id)

    expect(goals.length).toBe(2)

  })

  it("Should not be able find a goal because no have an user", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    await createGoalService.execute({
      name: 'comprar carro',
      amount: 200000,
      user_id: user.id,
    })

    expect(listGoalService.execute(user.id + 'id_not_exists')).rejects.toEqual(new AppError("User not found"))
  })
})