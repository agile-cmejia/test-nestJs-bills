import { FindTenantTypeDto } from './context/tenant-types/domain/dto/find-tenant-type.dto';
import { TenantType } from './context/tenant-types/infrastructure/entities/tenant-type.entity';
import { Logger, NotFoundException } from '@nestjs/common';
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

export const fetchTenantTypes = async (args: FindTenantTypeDto) => {
  const url = process.env.TENANTS_MS_URL || 'error';
  const logger = new Logger(fetchTenants.name);

  if (url === 'error') {
    logger.error(`Missing TENANTS_MS_URL env variable`);
    throw new NotFoundException('TENANTS_MS_URL env variable not found', {
      cause: new Error(),
      description: `Missing TENANTS_MS_URL env variable`,
    });
  }
  const opts = {
    method: 'POST',
    body: JSON.stringify(args),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const tenantTypeApi = url + 'tenant-types/many';
    const foundTenantTypes = await fetch(tenantTypeApi, opts)
      .then((response) => response.json())
      .catch((err) => {
        logger.error(`An error has occurred`);
        logger.error(err);
      });

    return foundTenantTypes as TenantType[];
  } catch (e) {
    logger.error(`An error has occurred`);
    logger.error(e);
  }
};
export const fetchTenants = async (args: FindTenantDto) => {
  const url = process.env.TENANTS_MS_URL || 'error';
  const logger = new Logger(fetchTenants.name);

  if (url === 'error') {
    logger.error(`Missing TENANTS_MS_URL env variable`);
    throw new NotFoundException('TENANTS_MS_URL env variable not found', {
      cause: new Error(),
      description: `Missing TENANTS_MS_URL env variable`,
    });
  }
  const opts = {
    method: 'POST',
    body: JSON.stringify(args),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const tenantApi = url + 'tenant-types/many';
    const foundTenants = await fetch(tenantApi, opts)
      .then((response) => response.json())
      .catch((err) => {
        logger.error(`An error has occurred`);
        logger.error(err);
      });

    return foundTenants as Tenant[];
  } catch (e) {
    logger.error(`An error has occurred`);
    logger.error(e);
  }
};

export const fetchRecordTypes = async (args: FindTenantDto) => {
  const url = process.env.RECORDS_MS_URL || 'error';
  const logger = new Logger(fetchTenants.name);

  if (url === 'error') {
    logger.error(`Missing RECORDS_MS_URL env variable`);
    throw new NotFoundException('RECORDS_MS_URL env variable not found', {
      cause: new Error(),
      description: `Missing RECORDS_MS_URL env variable`,
    });
  }
  const opts = {
    method: 'POST',
    body: JSON.stringify(args),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const foundTenants = await fetch(url, opts)
      .then((response) => response.json())
      .catch((err) => {
        logger.error(`An error has occurred`);
        logger.error(err);
      });

    return foundTenants as Tenant[];
  } catch (e) {
    logger.error(`An error has occurred`);
    logger.error(e);
  }
};
