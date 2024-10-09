export interface User {
  id: number;
  username: string;
  password: string;
  balance: number;
  role: 'admin' | 'user';
}

export interface TransferData {
  from: number;
  to: number;
  amount: number;
}