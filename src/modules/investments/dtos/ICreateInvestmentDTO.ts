interface ICreateInvestmentDTO {
  id?: string;
  value: number;
  dayOfInvestment: Date;
  goals_id: string;
  priority: string;
  created_at?: Date;
  updated_at?: Date;
}

export { ICreateInvestmentDTO }