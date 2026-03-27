import { Prisma } from '@/generated/prisma/client';

export type InstallmentTransaction = Prisma.InstallmentGetPayload<{
  select: {
    id: true;
    transactionId: true;
    dueDate: true;
    amount: true;
    status: true;
    number: true;
    transaction: {
      select: {
        description: true;
        type: true;
        numberInstallments: true;
        category: {
          select: {
            id: true;
            name: true;
          };
        };
        creditCard: {
          select: {
            id: true;
            name: true;
            cardNumber: true;
          };
        };
      };
    };
    payments: {
      select: {
        id: true;
        date: true;
        amount: true;
      };
    };
  };
}>;
