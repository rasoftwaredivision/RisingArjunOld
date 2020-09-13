import { ISubjectMySuffix } from 'app/shared/model/subject-my-suffix.model';
import { ICourseMySuffix } from 'app/shared/model/course-my-suffix.model';

export interface ITeacherMySuffix {
  id?: number;
  teacherIdEmployeeId?: string;
  teacherIdId?: number;
  subjects?: ISubjectMySuffix[];
  courses?: ICourseMySuffix[];
}

export const defaultValue: Readonly<ITeacherMySuffix> = {};
