export const enum Jobnature {
  PARTTIME = 'PARTTIME',
  FULLTIME = 'FULLTIME'
}

export interface IEmployeeMySuffix {
  id?: number;
  employeeId?: string;
  jobNature?: Jobnature;
  bgc?: boolean;
  resumeContentType?: string;
  resume?: any;
  pan?: string;
  accountNo?: string;
  bank?: string;
  ifsc?: string;
  userLogin?: string;
  userId?: number;
}

export const defaultValue: Readonly<IEmployeeMySuffix> = {
  bgc: false
};
