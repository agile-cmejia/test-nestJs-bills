export type UnknownKeysObject = {
  [key: string | number]: Date | number | boolean | string;
};

export type ObjectWithObjectValues = {
  [key: string | number]: { [key: string | number]: Date | number | boolean | string };
};
