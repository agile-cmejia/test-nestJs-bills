import { LineItems, RecordAdditionalFieldsByType, Role } from '@avantodev/avanto-db';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  PayloadTooLargeException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { IssuerEnum, ObjectPropertiesDataTypeEnum } from './dataTypes/Enums';
export const evalENVBoolean = (val: string | undefined): boolean => {
  return val?.toLocaleLowerCase() === 'true';
};
import { fetch } from 'cross-fetch';
import { Repository } from 'typeorm';
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

export const fetchRole = async (args: any) => {
  const url = process.env.USERS_MS_URL || 'error';
  const logger = new Logger(fetchRole.name);
  logger.log('fetching role');

  if (url === 'error') {
    logger.error(`Missing USERS_MS_URL env variable`);
    throw new NotFoundException('USERS_MS_URL env variable not found', {
      cause: new Error(),
      description: `Missing USERS_MS_URL env variable`,
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
    logger.log('fetching role');
    const roleApi = url + 'roles/many';
    const foundRole = await fetch(roleApi, opts)
      .then((response) => response.json())
      .catch((err) => {
        logger.error(`An error has occurred`);
        logger.error(err);
      });

    return foundRole as Role[];
  } catch (e) {
    logger.error(`An error has occurred`);
    logger.error(e);
  }
};

export const transformLineItemsData = async (
  data: LineItems[],
  recordAdditionalFieldByTypeRepository: Repository<RecordAdditionalFieldsByType>,
) => {
  if (!data || data.length === 0) {
    throw new BadRequestException('Bad request: data is empty');
  }

  const temp = {};
  const tags = data.map((item) => item.tag.split(';')[2]);
  const additionalFields = await recordAdditionalFieldByTypeRepository.findByIds(tags);

  for (const item of data) {
    const propertyName = getPropertyNameByTag(item.tag, additionalFields);
    const index = item.index;

    temp[index] = { ...(temp[index] || {}), [propertyName]: item.value };
  }

  return Object.values(temp);
};
const getPropertyNameByTag = (tag: string, additionalFields: RecordAdditionalFieldsByType[]) => {
  const additionalFieldId = tag.split(';')[2];
  const additionalField = additionalFields.find((field) => field.id === Number(additionalFieldId));
  return additionalField?.name;
};
const getKey = (pattern: string, transformedResult: any): string | undefined => {
  return Object.keys(transformedResult).find(
    (key) => key.replace(/\s+/g, '').toLowerCase() === pattern.replace(/\s+/g, '').toLowerCase(),
  );
};

export const getValue = (pattern: string, transformedResult: any): string | undefined => {
  const key = getKey(pattern, transformedResult);
  return key ? transformedResult[key] : undefined;
};

export const checkField = (pattern: string, fields: string[]): string | undefined => {
  const regexPattern = new RegExp(pattern, 'i'); // 'i' para ignorar mayúsculas/minúsculas
  return fields.find((field) => regexPattern.test(field.replace(/\//g, '').replace(/\\i/g, '').toLowerCase()));
};

export function optionsBuilder(item: any) {
  const regex = /seq\s*code\s*\d+/i;
  const seqCodes = Object.keys(item).filter((key) => regex.test(key));
  seqCodes.sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)[0]);
    const numB = parseInt(b.match(/\d+/)[0]);
    return numA - numB;
  });
  item.options = [];
  seqCodes.forEach((code) => {
    const sequence = code.match(/\d+/)[0];
    const description = item[`Seq Desc ${sequence}`];
    const option = {
      sequence,
      code: item[code],
      description,
    };
    item.options.push(option);
  });
  return item.options;
}

export const getValidEndpointUrl = (configUrl: string, type?: string): string => {
  if (!configUrl)
    throw new NotFoundException(`${type} env variable not found`, {
      cause: new Error(),
      description: `Missing ${type} env variable`,
    });
  return configUrl.endsWith('/') ? configUrl : `${configUrl}/`;
};

export const catalogMsUrl = (): string => {
  return getValidEndpointUrl(process.env.CATALOG_MS_URL, 'CATALOG_MS_URL');
};

export const tenantsMsUrl = (): string => {
  return getValidEndpointUrl(process.env.TENANTS_MS_URL, 'TENANTS_MS_URL');
};

export const usersMsUrl = (): string => {
  return getValidEndpointUrl(process.env.USERS_MS_URL, 'USERS_MS_URL');
};

export const recordGridsMsUrl = (): string => {
  return getValidEndpointUrl(process.env.RECORDS_GRID_MS_URL, 'RECORDS_GRID_MS_URL');
};

export const appModulesMsUrl = (): string => {
  return getValidEndpointUrl(process.env.APP_MODULES_MS_URL, 'APP_MODULES_MS_URL');
};

export const generalConfigMsUrl = (): string => {
  return getValidEndpointUrl(process.env.GENERAL_MS_URL, 'GENERAL_MS_URL');
};

export const recordsMsUrl = (): string => {
  return getValidEndpointUrl(process.env.RECORDS_MS_URL, 'RECORDS_MS_URL');
};

export const fileManagementMsUrl = (): string => {
  return getValidEndpointUrl(process.env.FILE_MANAGEMENT_MS_URL, 'FILE_MANAGEMENT_MS_URL');
};

export const getResponse = async (url: string, options: object, logger: Logger) => {
  const response = await fetch(url, options)
    .then((response) => response.json())
    .catch((err) => {
      logger.error(err.message);
      throw new InternalServerErrorException(err.message);
    });

  switch (response.statusCode) {
    case 400:
      logger.log(`Bad Request: ${response.message}`);
      throw new BadRequestException(response.message);
    case 401:
      logger.log(`Unauthorized: ${response.message}`);
      throw new UnauthorizedException(response.message);
    case 403:
      logger.log(`Forbidden: ${response.message}`);
      throw new ForbiddenException(response.message);
    case 404:
      logger.log(`Not Found: ${response.message}`);
      throw new NotFoundException(response.message);
    case 408:
      logger.log(`Request Timeout: ${response.message}`);
      throw new RequestTimeoutException(response.message);
    case 409:
      logger.log(`Conflict: ${response.message}`);
      throw new ConflictException(response.message);
    case 413:
      logger.log(`Payload Too Large: ${response.message}`);
      throw new PayloadTooLargeException(response.message);
    case 500:
      logger.log(`Internal Server Error: ${response.message}`);
      throw new InternalServerErrorException(response.message);
  }

  return response;
};

export const getResponseAsText = async (url: string, options: object, logger: Logger) => {
  const response = await fetch(url, options);

  switch (response.status) {
    case 400:
      logger.log(`Bad Request`);
      throw new BadRequestException();
    case 401:
      logger.log(`Unauthorized`);
      throw new UnauthorizedException();
    case 403:
      logger.log(`Forbidden`);
      throw new ForbiddenException();
    case 404:
      logger.log(`Not Found`);
      throw new NotFoundException();
    case 408:
      logger.log(`Request Timeout`);
      throw new RequestTimeoutException();
    case 409:
      logger.log(`Conflict`);
      throw new ConflictException();
    case 413:
      logger.log(`Payload Too Large`);
      throw new PayloadTooLargeException();
    case 500:
      logger.log(`Internal Server Error`);
      throw new InternalServerErrorException();
  }

  return response.text();
};

export const getObjectPropertiesDataTypeEnum = (type: string) => {
  type = type.toLowerCase();
  switch (type) {
    case 'string':
      return ObjectPropertiesDataTypeEnum.String;
    case 'number':
      return ObjectPropertiesDataTypeEnum.Number;
    case 'date':
      return ObjectPropertiesDataTypeEnum.Date;
    case 'list':
      return ObjectPropertiesDataTypeEnum.List;
    case 'file':
      return ObjectPropertiesDataTypeEnum.File;
    case 'textarea':
      return ObjectPropertiesDataTypeEnum.TextArea;
    case 'datetime':
      return ObjectPropertiesDataTypeEnum.Datetime;
    case 'time':
      return ObjectPropertiesDataTypeEnum.Time;
    case 'decimal':
      return ObjectPropertiesDataTypeEnum.Decimal;
    case 'url':
      return ObjectPropertiesDataTypeEnum.Url;
    case 'image':
      return ObjectPropertiesDataTypeEnum.Image;
    case 'multiselect':
      return ObjectPropertiesDataTypeEnum.Multiselect;
    case 'checkbox':
      return ObjectPropertiesDataTypeEnum.Checkbox;
    case 'object':
      return ObjectPropertiesDataTypeEnum.Object;
    case 'multiselect-checkbox':
      return ObjectPropertiesDataTypeEnum.MultiselectCheckbox;
    default:
      return ObjectPropertiesDataTypeEnum.String;
  }
};

export const toISODateString = (date: string) => {
  return new Date(date).toISOString().split('T')[0];
};

export const toISOTimeString = (time: string) => {
  return createTimeDate(time).toISOString().split('T')[1].split('Z')[0];
};

const createTimeDate = (timeString: string) => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, seconds, 0); // Ajusta la hora, minutos, segundos y milisegundos
  return date;
};

export const toISODateTimeString = (date: string) => {
  return new Date(date).toISOString();
};
