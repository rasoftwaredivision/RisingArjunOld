import { IStudentsubjectMySuffix } from 'app/shared/model/studentsubject-my-suffix.model';
import { ITeacherMySuffix } from 'app/shared/model/teacher-my-suffix.model';

export interface ISubjectMySuffix {
  id?: number;
  subjectCode?: string;
  subjectTitle?: string;
  studentsubjects?: IStudentsubjectMySuffix[];
  teachers?: ITeacherMySuffix[];
}

export const defaultValue: Readonly<ISubjectMySuffix> = {};
