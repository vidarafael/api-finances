interface ITransactionsWalletsDTO {
  id: string;
  value: number;
  category: string;
  description: string;
  wallet_id: string;
  created_at: Date;
  updated_at: Date;
}

export { ITransactionsWalletsDTO }