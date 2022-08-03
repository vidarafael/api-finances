import { IVideoDTO } from "../dtos/IVideoDTO";

interface IVideosRepository {
  create({ url, category }: IVideoDTO): Promise<IVideoDTO>
  findById(id: string): Promise<IVideoDTO>
  find(): Promise<IVideoDTO[]>
}

export { IVideosRepository }