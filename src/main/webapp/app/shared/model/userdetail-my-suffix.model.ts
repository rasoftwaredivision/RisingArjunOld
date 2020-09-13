import { Moment } from 'moment';

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

export interface IUserdetailMySuffix {
  id?: number;
  mobileNo?: string;
  dob?: Moment;
  houseNo?: string;
  street?: string;
  city?: City;
  state?: State;
  country?: Country;
  pincode?: number;
  userLogin?: string;
  userId?: number;
  enterpriseEnterprisename?: string;
  enterpriseId?: number;
}

export const defaultValue: Readonly<IUserdetailMySuffix> = {};
