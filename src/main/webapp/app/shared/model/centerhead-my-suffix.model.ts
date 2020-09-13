import { ICenterMySuffix } from 'app/shared/model/center-my-suffix.model';

export interface ICenterheadMySuffix {
  id?: number;
  centerheadEmployeeId?: string;
  centerheadId?: number;
  centers?: ICenterMySuffix[];
}

export const defaultValue: Readonly<ICenterheadMySuffix> = {};
