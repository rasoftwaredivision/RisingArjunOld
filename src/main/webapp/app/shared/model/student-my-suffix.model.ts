import { ICourseMySuffix } from 'app/shared/model/course-my-suffix.model';

export const enum Studentstatus {
  GRADUATED = 'GRADUATED',
  JOINED = 'JOINED',
  LEFT = 'LEFT'
}

export const enum Leavingreason {
  NA = 'NA',
  DISTANCEFACTOR = 'DISTANCEFACTOR',
  UNHAPPYPHYSICS = 'UNHAPPYPHYSICS',
  UNHAPPYMATHS = 'UNHAPPYMATHS',
  UNHAPPYBIO = 'UNHAPPYBIO',
  UNHAPPYCHEMISTRY = 'UNHAPPYCHEMISTRY',
  UNHAPPYMANAGEMENT = 'UNHAPPYMANAGEMENT',
  HIGHFEES = 'HIGHFEES',
  CLASSESOVERLAP = 'CLASSESOVERLAP',
  COURSECOMPLETED = 'COURSECOMPLETED',
  BREAKEXAM = 'BREAKEXAM',
  BREAKHOLIDAY = 'BREAKHOLIDAY',
  PERSONALREASON = 'PERSONALREASON'
}

export const enum Infosource {
  LOCATIONDIRECTLY = 'LOCATIONDIRECTLY',
  FRIENDS = 'FRIENDS',
  BANNER = 'BANNER',
  INTERNET = 'INTERNET',
  PAMPHLET = 'PAMPHLET',
  NEWSPAPER = 'NEWSPAPER'
}

export interface IStudentMySuffix {
  id?: number;
  studentRegId?: string;
  registrationFormContentType?: string;
  registrationForm?: any;
  parentMobNo1?: string;
  parentMobNo2?: string;
  parentEmailId?: string;
  studentStatus?: Studentstatus;
  leavingReason?: Leavingreason;
  infoSource?: Infosource;
  userLogin?: string;
  userId?: number;
  courses?: ICourseMySuffix[];
}

export const defaultValue: Readonly<IStudentMySuffix> = {};
