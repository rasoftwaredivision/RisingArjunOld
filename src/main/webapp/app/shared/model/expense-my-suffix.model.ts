import { Moment } from 'moment';

export const enum Mode {
  NEFT = 'NEFT',
  UPI = 'UPI',
  CASH = 'CASH',
  DEBITCARD = 'DEBITCARD',
  NETBANKING = 'NETBANKING',
  OTHERS = 'OTHERS'
}

export const enum Expensetype {
  FIXASSET = 'FIXASSET',
  MARKETING = 'MARKETING',
  OPERATING = 'OPERATING'
}

export interface IExpenseMySuffix {
  id?: number;
  item?: string;
  quantity?: number;
  rate?: number;
  laborCost?: number;
  otherExpense?: number;
  total?: number;
  date?: Moment;
  transactionId?: string;
  expenseMode?: Mode;
  type?: Expensetype;
  billContentType?: string;
  bill?: any;
  remarks?: string;
  enterpriseEnterprisename?: string;
  enterpriseId?: number;
  incurredByEmployeeId?: string;
  incurredById?: number;
}

export const defaultValue: Readonly<IExpenseMySuffix> = {};
