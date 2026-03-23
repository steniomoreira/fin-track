type Transaction = {
  id: string;
  data: string;
  description: string;
  category: string;
  creditCard?: string;
  status: 'LATE' | 'PAID' | 'PARTIAL' | 'PENDING';
  amount: number;
  type: 'INCOME' | 'EXPENSE';
};

export const transactions: Transaction[] = [
  {
    id: '728ed52f',
    data: '22 Mar, 2026',
    description: 'Monitor Mancer 24P',
    category: 'Habitação',
    creditCard: 'Nubank*****1234',
    status: 'PENDING',
    amount: 66470,
    type: 'EXPENSE',
  },
  {
    id: 'e28cs52f',
    data: '15 Mar, 2026',
    description: 'Internet',
    category: 'Habitação',
    creditCard: '',
    status: 'PAID',
    amount: 15000,
    type: 'EXPENSE',
  },
  {
    id: '828ed45s',
    data: '10 Mar, 2026',
    description: 'Nubank*****1234',
    category: 'Habitação',
    creditCard: '',
    status: 'PENDING',
    amount: 350000,
    type: 'EXPENSE',
  },
  {
    id: '8256d45s',
    data: '05 Mar, 2026',
    description: 'Salário',
    category: 'Trabalho',
    creditCard: '',
    status: 'PAID',
    amount: 800000,
    type: 'INCOME',
  },
];
