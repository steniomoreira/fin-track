type Transaction = {
  id: string;
  data: string;
  description: string;
  category: string;
  accountCard: string;
  status: 'late' | 'paid' | 'partial' | 'pending';
  amount: number;
};

export const transactions: Transaction[] = [
  {
    id: '728ed52f',
    data: '22 Mar, 2026',
    description: 'Monitor Mancer 24P',
    category: 'Habitação',
    accountCard: 'Nubank*****1234',
    status: 'pending',
    amount: 66470,
  },
  {
    id: 'e28cs52f',
    data: '15 Mar, 2026',
    description: 'Internet',
    category: 'Habitação',
    accountCard: '',
    status: 'paid',
    amount: 15000,
  },
  {
    id: '828ed45s',
    data: '10 Mar, 2026',
    description: 'Nubank*****1234',
    category: 'Habitação',
    accountCard: '',
    status: 'pending',
    amount: 350000,
  },
];
