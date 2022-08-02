interface IInvestmentDTO {
  id?: string;
  value: number;
  dayOfInvestment: Date;
  goal_id: string;
  priority: string;
  created_at?: Date;
  updated_at?: Date;
}

export { IInvestmentDTO }