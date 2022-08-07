import { OperationType } from "../../../shared/dto/IOperationTypeDTO";

interface ICreateTransactionsWalletsDTO {
  value: number;
  category: string;
  description: string;
  wallet_id: string;
  type: OperationType;
}

export { ICreateTransactionsWalletsDTO }