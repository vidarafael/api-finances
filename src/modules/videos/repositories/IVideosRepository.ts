import { ICreateVideoDTO } from "../dtos/ICreateVideoDTO";

interface IVideosRepository {
  create({ url, category }: ICreateVideoDTO): Promise<ICreateVideoDTO>
  findById(id: string): Promise<ICreateVideoDTO>
}

export { IVideosRepository }