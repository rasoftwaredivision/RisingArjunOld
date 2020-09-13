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

export interface IStudentfeeMySuffix {
  id?: number;
  fee?: number;
  feeCorrection?: number;
  month?: Month;
  feeStatus?: boolean;
  remarks?: string;
  registrationnoStudentRegId?: string;
  registrationnoId?: number;
  subjectSubjectTitle?: string;
  subjectId?: number;
  sessionAcadSession?: string;
  sessionId?: number;
  teacherEmployeeId?: string;
  teacherId?: number;
}

export const defaultValue: Readonly<IStudentfeeMySuffix> = {
  feeStatus: false
};
