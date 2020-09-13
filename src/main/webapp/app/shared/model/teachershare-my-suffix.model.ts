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

export interface ITeachershareMySuffix {
  id?: number;
  sharePercent?: number;
  plannedClasses?: number;
  actualClasses?: number;
  shareCorrection?: number;
  share?: number;
  month?: Month;
  remarks?: string;
  teacherIdEmployeeId?: string;
  teacherIdId?: number;
  subjectSubjectTitle?: string;
  subjectId?: number;
  sessionAcadSessionId?: string;
  sessionId?: number;
}

export const defaultValue: Readonly<ITeachershareMySuffix> = {};
