import { AppError } from "../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../users/repositories/in-memory/UsersRepositoryInMemory";
import { GoalsRepositoryInMemory } from "../repositories/in-memory/GoalsRepositoryInMemory";
import { CreateGoalService } from "./CreateGoalService";
import { DeleteGoalService } from "./DeleteGoalService";

describe("Delete Goal", () => {
  let goalsRepositoryInMemory: GoalsRepositoryInMemory;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createGoalService: CreateGoalService;
  let deleteGoalService: DeleteGoalService;

  beforeEach(async () => {
    goalsRepositoryInMemory = new GoalsRepositoryInMemory()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createGoalService = new CreateGoalService(
      goalsRepositoryInMemory,
      usersRepositoryInMemory
    );
    deleteGoalService = new DeleteGoalService(
      goalsRepositoryInMemory,
      usersRepositoryInMemory
    );
  })

  it("Should be able delete a goal", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const goal = await createGoalService.execute({
      name: 'comprar carro',
      amount: 200000,
      user_id: user.id,
    })

    await deleteGoalService.execute({ user_id: user.id, goal_id: goal.id })

    const goals = await goalsRepositoryInMemory.list(user.id)

    expect(goals.length).toBe(0)
  })

  it("Should not be able delete a goal because no have an user", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const goal = await createGoalService.execute({
      name: 'comprar carro',
      amount: 200000,
      user_id: user.id,
    })

    expect(deleteGoalService.execute({
      user_id: user.id + 'id_not_exists',
      goal_id: goal.id
    })).rejects.toEqual(new AppError("User not found"))
  })
})