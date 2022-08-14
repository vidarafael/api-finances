import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { AppError } from "../../../shared/errors/AppError";
import { GoalsRepositoryInMemory } from "../../goals/repositories/in-memory/GoalsRepositoryInMemory";
import { CreateGoalService } from "../../goals/services/CreateGoalService";
import { UsersRepositoryInMemory } from "../../users/repositories/in-memory/UsersRepositoryInMemory";
import { InvestmentsRepositoryInMemory } from "../repositories/in-memory/InvestmentsRepositoryInMemory";
import { CreateInvestmentService } from "./CreateInvestmentService";

dayjs.extend(utc)

describe("Create Investment", () => {
  let goalsRepositoryInMemory: GoalsRepositoryInMemory;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let investmentsRepositoryInMemory: InvestmentsRepositoryInMemory;
  let createGoalService: CreateGoalService;
  let createInvestmentService: CreateInvestmentService;

  beforeEach(async () => {
    investmentsRepositoryInMemory = new InvestmentsRepositoryInMemory()
    goalsRepositoryInMemory = new GoalsRepositoryInMemory()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createGoalService = new CreateGoalService(
      goalsRepositoryInMemory,
      usersRepositoryInMemory
    );
    createInvestmentService = new CreateInvestmentService(
      investmentsRepositoryInMemory,
      goalsRepositoryInMemory
    )
  })

  it("Should be able create a investment", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const goal = await createGoalService.execute({
      name: 'comprar carro',
      amount: 200000,
      user_id: user.id,
    })

    const date = dayjs().set('date', 5).add(4, 'month').format()
    console.log(date, typeof date)

    const investment = await createInvestmentService.execute({ value: 0, dayOfInvestment: new Date(), goal_id: goal.id, priority: 'high' })


  })

  // it("Should not be able find a goal because no have an user", async () => {
  //   const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

  //   const goal = await createGoalService.execute({
  //     name: 'comprar carro',
  //     amount: 200000,
  //     user_id: user.id,
  //   })

  //   expect(findGoalService.execute({
  //     user_id: user.id + 'id_not_exists',
  //     goal_id: goal.id
  //   })).rejects.toEqual(new AppError("User not found"))
  // })
})