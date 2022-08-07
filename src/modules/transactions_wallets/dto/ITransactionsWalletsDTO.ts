import { OperationType } from "../../../shared/dto/IOperationTypeDTO";

interface ITransactionsWalletsDTO {
  id: string;
  value: number;
  category: string;
  description: string;
  wallet_id: string;
  type: OperationType;
  created_at: Date;
  updated_at: Date;
}

export { ITransactionsWalletsDTO }