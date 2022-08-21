import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import { OperationType } from "../../../shared/dto/IOperationTypeDTO";
import { AppError } from "../../../shared/errors/AppError";
import { GoalsRepositoryInMemory } from "../../goals/repositories/in-memory/GoalsRepositoryInMemory";
import { CreateGoalService } from "../../goals/services/CreateGoalService";
import { InvestmentsRepositoryInMemory } from "../../investments/repositories/in-memory/InvestmentsRepositoryInMemory";
import { CreateInvestmentService } from "../../investments/services/CreateInvestmentService";
import { UsersRepositoryInMemory } from "../../users/repositories/in-memory/UsersRepositoryInMemory";
import { TransactionsInvestmentsRepositoryInMemory } from "../repositories/in-memory/TransactionsInvestmentsRepositoryInMemory";
import { CreateTransactionInvestmentService } from "./CreateTransactionInvestmentService";

dayjs.extend(utc)

describe("Create Investment Transaction", () => {
  let goalsRepositoryInMemory: GoalsRepositoryInMemory;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let investmentsRepositoryInMemory: InvestmentsRepositoryInMemory;
  let transactionsInvestmentsRepositoryInMemory: TransactionsInvestmentsRepositoryInMemory;
  let createGoalService: CreateGoalService;
  let createInvestmentService: CreateInvestmentService;
  let createTransactionInvestmentService: CreateTransactionInvestmentService;

  beforeEach(async () => {
    investmentsRepositoryInMemory = new InvestmentsRepositoryInMemory()
    goalsRepositoryInMemory = new GoalsRepositoryInMemory()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    transactionsInvestmentsRepositoryInMemory = new TransactionsInvestmentsRepositoryInMemory()
    createGoalService = new CreateGoalService(
      goalsRepositoryInMemory,
      usersRepositoryInMemory
    );
    createInvestmentService = new CreateInvestmentService(
      investmentsRepositoryInMemory,
      goalsRepositoryInMemory
    )
    createTransactionInvestmentService = new CreateTransactionInvestmentService(
      investmentsRepositoryInMemory,
      transactionsInvestmentsRepositoryInMemory
    )
  })

  it("Should be able create an investment transaction", async () => {
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

    const transactionInvestment = await createTransactionInvestmentService.execute({
      investment_id: investment.id,
      category: 'comida',
      description: 'comida',
      type: 'deposit' as OperationType,
      value: 500
    })

    expect(transactionInvestment).toHaveProperty("id")
  })

  it("Should not be able create an investment transaction because no have an investment", async () => {
    expect(createTransactionInvestmentService.execute({
      investment_id: 'id_not_exists',
      category: 'comida',
      description: 'comida',
      type: 'deposit' as OperationType,
      value: 500
    })).rejects.toEqual(new AppError("Investment does not exist"))
  })
})