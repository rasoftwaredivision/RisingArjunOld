import { ISubjectMySuffix } from 'app/shared/model/subject-my-suffix.model';
import { ICourseMySuffix } from 'app/shared/model/course-my-suffix.model';

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

export interface IStudentsubjectMySuffix {
  id?: number;
  month?: Month;
  registrationnoStudentRegId?: string;
  registrationnoId?: number;
  sessionAcadSession?: string;
  sessionId?: number;
  subjects?: ISubjectMySuffix[];
  courses?: ICourseMySuffix[];
}

export const defaultValue: Readonly<IStudentsubjectMySuffix> = {};
