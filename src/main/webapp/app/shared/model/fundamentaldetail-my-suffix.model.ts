import { IQuestionMySuffix } from 'app/shared/model/question-my-suffix.model';

export const enum Fundamental {
  BASICPROPOTIONALITYTHEROEM = 'BASICPROPOTIONALITYTHEROEM',
  SECTIONFORMULA = 'SECTIONFORMULA',
  SASCONGURENCE = 'SASCONGURENCE',
  MIDPOINTTHEOREM = 'MIDPOINTTHEOREM'
}

export interface IFundamentaldetailMySuffix {
  id?: number;
  concept?: Fundamental;
  details?: string;
  questions?: IQuestionMySuffix[];
}

export const defaultValue: Readonly<IFundamentaldetailMySuffix> = {};
