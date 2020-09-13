import { IStudentMySuffix } from 'app/shared/model/student-my-suffix.model';
import { IStudentsubjectMySuffix } from 'app/shared/model/studentsubject-my-suffix.model';
import { ITeacherMySuffix } from 'app/shared/model/teacher-my-suffix.model';

export interface ICourseMySuffix {
  id?: number;
  courseId?: string;
  course?: string;
  students?: IStudentMySuffix[];
  studentsubjects?: IStudentsubjectMySuffix[];
  teachers?: ITeacherMySuffix[];
}

export const defaultValue: Readonly<ICourseMySuffix> = {};
