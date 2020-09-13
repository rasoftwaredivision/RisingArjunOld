import { Moment } from 'moment';

export interface IStudentscoreMySuffix {
  id?: number;
  answer?: string;
  score?: number;
  date?: Moment;
  studentStudentRegId?: string;
  studentId?: number;
  questionQuestion?: string;
  questionId?: number;
}

export const defaultValue: Readonly<IStudentscoreMySuffix> = {};
