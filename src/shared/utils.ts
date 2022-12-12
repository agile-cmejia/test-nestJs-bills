import { Tenant } from './context/tenants/infrastructure/entities/tenant.entity';
import { FindTenantDto } from './context/tenants/domain/dto/find-tenant.dto';
import { IssuerEnum } from './dataTypes/Enums';
export const evalENVBoolean = (val: string | undefined): boolean => {
  return val?.toLocaleLowerCase() === 'true';
};

export const ValidFutureDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  console.log('today: ' + today);
  const dateToValidate = new Date(date);
  console.log('date to validate: ' + dateToValidate);
  console.log('validation: ', dateToValidate >= today);
  return dateToValidate >= today;
};

export const ValidPastDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateToValidate = new Date(date);
  return dateToValidate <= today;
};

export const isNumber = (str: string): boolean => {
  if (typeof str !== 'string') {
    return false;
  }

  if (str.trim() === '') {
    return false;
  }

  return !Number.isNaN(Number(str));
};

export const capitalizeFirstLetter = ([first, ...rest]: string) => first.toUpperCase() + rest.join('').toLowerCase();

export const capitalizeSentence = (words: string) =>
  words
    .split(' ')
    .map((word) => capitalizeFirstLetter(word))
    .join(' ');

export const onlyLetters = (text: string) => {
  const regex = /^[a-zA-Z ]*$/;
  return regex.test(text);
};

export const stringHasNumbers = (text: string) => {
  return /[0-9]/.test(text);
};

export const isValidApplication = (app: string): boolean => {
  const options: string[] = Object.values(IssuerEnum);
  return options.includes(app);
};

export const fetchTenants = async (args: FindTenantDto, url: string) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify(args),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(url, opts)
    .then((response) => response.json())
    .catch((err) => {
      throw err;
    });
  return response as Tenant[];
};
