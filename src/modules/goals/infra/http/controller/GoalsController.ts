import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateGoalService } from '../../../services/CreateGoalService'
import { DeleteGoalService } from '../../../services/DeleteGoalService'
import { FindGoalService } from '../../../services/FindGoalService'
import { ListGoalService } from '../../../services/ListGoalService'

class GoalsController {
  async create(request: Request, response: Response): Promise<void> {
    const { id: user_id } = request.user
    const { name, amount } = request.body

    const createGoalsService = container.resolve(CreateGoalService)

    const goal = await createGoalsService.execute({ name, amount, user_id })

    response.status(201).json(goal)
  }

  async list(request: Request, response: Response): Promise<void> {
    const { id: user_id } = request.user

    const listGoalsService = container.resolve(ListGoalService)

    const goals = await listGoalsService.execute(user_id)

    response.status(200).json(goals)
  }

  async find(request: Request, response: Response): Promise<void> {
    const { id: user_id } = request.user
    const { goal_id } = request.params

    const findGoalsService = container.resolve(FindGoalService)

    const goal = await findGoalsService.execute({ user_id, goal_id })

    response.status(200).json(goal)
  }

  async delete(request: Request, response: Response): Promise<void> {
    const { id: user_id } = request.user
    const { goal_id } = request.params

    const deleteGoalsService = container.resolve(DeleteGoalService)

    await deleteGoalsService.execute({ user_id, goal_id })

    response.status(200).send()
  }
}

export { GoalsController }