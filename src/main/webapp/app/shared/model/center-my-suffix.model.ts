import { ICenterheadMySuffix } from 'app/shared/model/centerhead-my-suffix.model';

export const enum City {
  DEHRADUN = 'DEHRADUN',
  DELHI = 'DELHI',
  GURGAON = 'GURGAON',
  LONI = 'LONI',
  TEHRI = 'TEHRI'
}

export const enum State {
  DELHI = 'DELHI',
  HARYANA = 'HARYANA',
  MADHYAPRADESH = 'MADHYAPRADESH',
  UTTRAKHAND = 'UTTRAKHAND',
  UTTARPRADESH = 'UTTARPRADESH'
}

export const enum Country {
  INDIA = 'INDIA',
  AUSTRALIA = 'AUSTRALIA',
  USA = 'USA'
}

export interface ICenterMySuffix {
  id?: number;
  centerCode?: string;
  centerTitle?: string;
  street?: string;
  city?: City;
  state?: State;
  country?: Country;
  pincode?: number;
  enterpriseEnterprisename?: string;
  enterpriseId?: number;
  centerheads?: ICenterheadMySuffix[];
}

export const defaultValue: Readonly<ICenterMySuffix> = {};
