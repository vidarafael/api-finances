import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import auth from '../../../../configs/auth'
import { UsersRepository } from '../../../../modules/users/infra/typeorm/repositories/UsersRepository'
import { AppError } from '../../../errors/AppError';

interface IPayload {
  sub: string;
}

async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeaders = request.headers.authorization

  const usersRepository = new UsersRepository()

  if (!authHeaders) {
    throw new AppError("Token missing")
  }

  const [, token] = authHeaders.split(" ")

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_token
    ) as IPayload

    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new AppError("User does not exists")
    }

    request.user = {
      id: user_id
    }

    next()
  } catch (error) {
    throw new AppError("Invalid token")
  }
}

export { ensureAuthenticated }