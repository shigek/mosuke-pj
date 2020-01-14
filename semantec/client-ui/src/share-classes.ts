/* eslint-disable @typescript-eslint/no-explicit-any*/
export type Menu = {
  navbar: any;
  sidebar: any;
}

export type UserInfo = {
  id: string;
  role: string;
  countryCode: string;
  lastLogin: number;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  details?: { [key: string]: any };
}

export type AnyJson = { [key: string]: any }