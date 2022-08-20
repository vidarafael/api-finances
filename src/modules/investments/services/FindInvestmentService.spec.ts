import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { AppError } from "../../../shared/errors/AppError";
import { GoalsRepositoryInMemory } from "../../goals/repositories/in-memory/GoalsRepositoryInMemory";
import { CreateGoalService } from "../../goals/services/CreateGoalService";
import { UsersRepositoryInMemory } from "../../users/repositories/in-memory/UsersRepositoryInMemory";
import { InvestmentsRepositoryInMemory } from "../repositories/in-memory/InvestmentsRepositoryInMemory";
import { CreateInvestmentService } from "./CreateInvestmentService";
import { FindInvestmentService } from "./FindInvestmentService";

dayjs.extend(utc)

describe("Find Investment", () => {
  let goalsRepositoryInMemory: GoalsRepositoryInMemory;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let investmentsRepositoryInMemory: InvestmentsRepositoryInMemory;
  let createGoalService: CreateGoalService;
  let createInvestmentService: CreateInvestmentService;
  let findInvestmentService: FindInvestmentService;

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
    findInvestmentService = new FindInvestmentService(
      investmentsRepositoryInMemory
    )
  })

  it("Should be able find a investment", async () => {
    const user = await usersRepositoryInMemory.create({ email: 'user_email@hotmail.com', name: 'user_name' });

    const goal = await createGoalService.execute({
      name: 'comprar carro',
      amount: 200000,
      user_id: user.id,
    })

    const date = dayjs().set('date', 5).utc().format()

    const investment = await createInvestmentService.execute({
      value: 0,
      dayOfInvestment: new Date(date),
      goal_id: goal.id,
      priority: 'high'
    })

    const investmentFinded = await findInvestmentService.execute(investment.id)

    expect(investmentFinded).toMatchObject({
      id: investmentFinded.id,
      dayOfInvestment: investment.dayOfInvestment,
      goal_id: investment.goal_id,
      priority: investment.priority
    })
  })


  it("Should not be able find an investment because investment not exists", async () => {
    expect(findInvestmentService.execute('id_not_exists')).rejects.toEqual(new AppError("Investment not found"))
  })
})