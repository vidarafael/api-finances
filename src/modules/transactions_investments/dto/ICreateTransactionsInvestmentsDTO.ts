import { OperationType } from "../../../shared/dto/IOperationTypeDTO";

interface ICreateTransactionsInvestmentsDTO {
  value: number;
  description: string;
  investment_id: string;
  category: string;
  type: OperationType;
}

export { ICreateTransactionsInvestmentsDTO }