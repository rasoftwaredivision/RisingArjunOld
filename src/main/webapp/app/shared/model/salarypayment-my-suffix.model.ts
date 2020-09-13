import { Moment } from 'moment';

export const enum Month {
  JAN = 'JAN',
  FEB = 'FEB',
  MAR = 'MAR',
  APR = 'APR',
  MAY = 'MAY',
  JUN = 'JUN',
  JUL = 'JUL',
  AUG = 'AUG',
  SEP = 'SEP',
  OCT = 'OCT',
  NOV = 'NOV',
  DEC = 'DEC'
}

export const enum Mode {
  NEFT = 'NEFT',
  UPI = 'UPI',
  CASH = 'CASH',
  DEBITCARD = 'DEBITCARD',
  NETBANKING = 'NETBANKING',
  OTHERS = 'OTHERS'
}

export interface ISalarypaymentMySuffix {
  id?: number;
  salary?: number;
  month?: Month;
  paid?: number;
  unpaid?: number;
  date?: Moment;
  transactionId?: string;
  paymentMode?: Mode;
  remarks?: string;
  employeeIdEmployeeId?: string;
  employeeIdId?: number;
  sessionAcadSessionId?: string;
  sessionId?: number;
}

export const defaultValue: Readonly<ISalarypaymentMySuffix> = {};
