export interface IEnterprisesettingsMySuffix {
  id?: number;
  theme?: string;
  foreground?: string;
  background?: string;
  disclaimer?: string;
  policy?: string;
  copyrights?: string;
  termsOfUsage?: string;
  adminLogin?: string;
  adminId?: number;
  enterpriseEnterprisename?: string;
  enterpriseId?: number;
}

export const defaultValue: Readonly<IEnterprisesettingsMySuffix> = {};
