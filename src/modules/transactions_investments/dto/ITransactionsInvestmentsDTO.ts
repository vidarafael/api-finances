import { OperationType } from "../../../shared/dto/IOperationTypeDTO";

interface ITransactionsInvestmentsDTO {
  id: string;
  value: number;
  category: string;
  description: string;
  type: OperationType;
  investment_id: string;
  created_at: Date;
  updated_at: Date;
}

export { ITransactionsInvestmentsDTO }