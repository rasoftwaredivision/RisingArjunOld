export const enum Natureofbusiness {
  COACHING = 'COACHING'
}

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

export interface IEnterpriseMySuffix {
  id?: number;
  abbrevation?: string;
  enterprisename?: string;
  natureofbusiness?: Natureofbusiness;
  logoContentType?: string;
  logo?: any;
  punchline?: string;
  mission?: string;
  vision?: string;
  principles?: string;
  email?: string;
  mobile?: string;
  landline?: string;
  fax?: string;
  plotNo?: string;
  street?: string;
  city?: City;
  state?: State;
  country?: Country;
  pincode?: number;
}

export const defaultValue: Readonly<IEnterpriseMySuffix> = {};
