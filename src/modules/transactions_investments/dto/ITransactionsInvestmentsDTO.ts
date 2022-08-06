interface ITransactionsInvestmentsDTO {
  id: string;
  value: number;
  category: string;
  description: string;
  investment_id: string;
  created_at: Date;
  updated_at: Date;
}

export { ITransactionsInvestmentsDTO }