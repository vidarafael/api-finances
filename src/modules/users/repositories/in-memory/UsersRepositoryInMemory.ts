import { ICreateUserDTO } from "modules/users/dtos/ICreateUserDTO";
import { User } from "modules/users/infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[];

  async create({ email, name }: ICreateUserDTO): Promise<ICreateUserDTO> {
    const user = new User();

    Object.assign(user, { email, name });

    return user
  }

  async findByEmail(email: string): Promise<ICreateUserDTO> {
    const user = this.users.find(u => u.email === email);

    return user
  }

  async findById(id: string): Promise<ICreateUserDTO> {
    const user = this.users.find(u => u.id === id);

    return user
  }

}

export { UsersRepositoryInMemory }