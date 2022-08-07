interface ICreateWalletDTO {
  id?: string;
  value?: number;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export { ICreateWalletDTO }