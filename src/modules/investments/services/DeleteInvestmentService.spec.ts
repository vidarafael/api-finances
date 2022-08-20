import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { AppError } from "../../../shared/errors/AppError";
import { GoalsRepositoryInMemory } from "../../goals/repositories/in-memory/GoalsRepositoryInMemory";
import { CreateGoalService } from "../../goals/services/CreateGoalService";
import { UsersRepositoryInMemory } from "../../users/repositories/in-memory/UsersRepositoryInMemory";
import { InvestmentsRepositoryInMemory } from "../repositories/in-memory/InvestmentsRepositoryInMemory";
import { CreateInvestmentService } from "./CreateInvestmentService";
import { DeleteInvestmentService } from "./DeleteInvestmentService";

dayjs.extend(utc)

describe("Delete Investment", () => {
  let goalsRepositoryInMemory: GoalsRepositoryInMemory;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let investmentsRepositoryInMemory: InvestmentsRepositoryInMemory;
  let createGoalService: CreateGoalService;
  let createInvestmentService: CreateInvestmentService;
  let deleteInvestmentService: DeleteInvestmentService;

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
    deleteInvestmentService = new DeleteInvestmentService(
      investmentsRepositoryInMemory,
    )
  })

  it("Should be able delete a investment", async () => {
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

    expect(investment).toMatchObject({
      id: investment.id,
      dayOfInvestment: new Date(date),
      goal_id: goal.id,
      priority: 'high'
    })

    await deleteInvestmentService.execute(investment.id)

    const investmentFinded = await investmentsRepositoryInMemory.findByGoal(goal.id)

    expect(investmentFinded).toBeUndefined()

  })
})