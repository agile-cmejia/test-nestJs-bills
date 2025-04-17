"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toISODateTimeString = exports.toISOTimeString = exports.toISODateString = exports.getObjectPropertiesDataTypeEnum = exports.getResponseAsText = exports.getResponse = exports.fileManagementMsUrl = exports.recordsMsUrl = exports.generalConfigMsUrl = exports.appModulesMsUrl = exports.recordGridsMsUrl = exports.usersMsUrl = exports.tenantsMsUrl = exports.catalogMsUrl = exports.getValidEndpointUrl = exports.optionsBuilder = exports.checkField = exports.getValue = exports.transformLineItemsData = exports.fetchRole = exports.isValidApplication = exports.stringHasNumbers = exports.onlyLetters = exports.capitalizeSentence = exports.capitalizeFirstLetter = exports.isNumber = exports.ValidPastDate = exports.ValidFutureDate = exports.evalENVBoolean = void 0;
const common_1 = require("@nestjs/common");
const Enums_1 = require("./dataTypes/Enums");
const evalENVBoolean = (val) => {
    return val?.toLocaleLowerCase() === 'true';
};
exports.evalENVBoolean = evalENVBoolean;
const cross_fetch_1 = require("cross-fetch");
const ValidFutureDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log('today: ' + today);
    const dateToValidate = new Date(date);
    console.log('date to validate: ' + dateToValidate);
    console.log('validation: ', dateToValidate >= today);
    return dateToValidate >= today;
};
exports.ValidFutureDate = ValidFutureDate;
const ValidPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToValidate = new Date(date);
    return dateToValidate <= today;
};
exports.ValidPastDate = ValidPastDate;
const isNumber = (str) => {
    if (typeof str !== 'string') {
        return false;
    }
    if (str.trim() === '') {
        return false;
    }
    return !Number.isNaN(Number(str));
};
exports.isNumber = isNumber;
const capitalizeFirstLetter = ([first, ...rest]) => first.toUpperCase() + rest.join('').toLowerCase();
exports.capitalizeFirstLetter = capitalizeFirstLetter;
const capitalizeSentence = (words) => words
    .split(' ')
    .map((word) => (0, exports.capitalizeFirstLetter)(word))
    .join(' ');
exports.capitalizeSentence = capitalizeSentence;
const onlyLetters = (text) => {
    const regex = /^[a-zA-Z ]*$/;
    return regex.test(text);
};
exports.onlyLetters = onlyLetters;
const stringHasNumbers = (text) => {
    return /[0-9]/.test(text);
};
exports.stringHasNumbers = stringHasNumbers;
const isValidApplication = (app) => {
    const options = Object.values(Enums_1.IssuerEnum);
    return options.includes(app);
};
exports.isValidApplication = isValidApplication;
const fetchRole = async (args) => {
    const url = process.env.USERS_MS_URL || 'error';
    const logger = new common_1.Logger(exports.fetchRole.name);
    logger.log('fetching role');
    if (url === 'error') {
        logger.error(`Missing USERS_MS_URL env variable`);
        throw new common_1.NotFoundException('USERS_MS_URL env variable not found', {
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
        const foundRole = await (0, cross_fetch_1.fetch)(roleApi, opts)
            .then((response) => response.json())
            .catch((err) => {
            logger.error(`An error has occurred`);
            logger.error(err);
        });
        return foundRole;
    }
    catch (e) {
        logger.error(`An error has occurred`);
        logger.error(e);
    }
};
exports.fetchRole = fetchRole;
const transformLineItemsData = async (data, recordAdditionalFieldByTypeRepository) => {
    if (!data || data.length === 0) {
        throw new common_1.BadRequestException('Bad request: data is empty');
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
exports.transformLineItemsData = transformLineItemsData;
const getPropertyNameByTag = (tag, additionalFields) => {
    const additionalFieldId = tag.split(';')[2];
    const additionalField = additionalFields.find((field) => field.id === Number(additionalFieldId));
    return additionalField?.name;
};
const getKey = (pattern, transformedResult) => {
    return Object.keys(transformedResult).find((key) => key.replace(/\s+/g, '').toLowerCase() === pattern.replace(/\s+/g, '').toLowerCase());
};
const getValue = (pattern, transformedResult) => {
    const key = getKey(pattern, transformedResult);
    return key ? transformedResult[key] : undefined;
};
exports.getValue = getValue;
const checkField = (pattern, fields) => {
    const regexPattern = new RegExp(pattern, 'i');
    return fields.find((field) => regexPattern.test(field.replace(/\//g, '').replace(/\\i/g, '').toLowerCase()));
};
exports.checkField = checkField;
function optionsBuilder(item) {
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
exports.optionsBuilder = optionsBuilder;
const getValidEndpointUrl = (configUrl, type) => {
    if (!configUrl)
        throw new common_1.NotFoundException(`${type} env variable not found`, {
            cause: new Error(),
            description: `Missing ${type} env variable`,
        });
    return configUrl.endsWith('/') ? configUrl : `${configUrl}/`;
};
exports.getValidEndpointUrl = getValidEndpointUrl;
const catalogMsUrl = () => {
    return (0, exports.getValidEndpointUrl)(process.env.CATALOG_MS_URL, 'CATALOG_MS_URL');
};
exports.catalogMsUrl = catalogMsUrl;
const tenantsMsUrl = () => {
    return (0, exports.getValidEndpointUrl)(process.env.TENANTS_MS_URL, 'TENANTS_MS_URL');
};
exports.tenantsMsUrl = tenantsMsUrl;
const usersMsUrl = () => {
    return (0, exports.getValidEndpointUrl)(process.env.USERS_MS_URL, 'USERS_MS_URL');
};
exports.usersMsUrl = usersMsUrl;
const recordGridsMsUrl = () => {
    return (0, exports.getValidEndpointUrl)(process.env.RECORDS_GRID_MS_URL, 'RECORDS_GRID_MS_URL');
};
exports.recordGridsMsUrl = recordGridsMsUrl;
const appModulesMsUrl = () => {
    return (0, exports.getValidEndpointUrl)(process.env.APP_MODULES_MS_URL, 'APP_MODULES_MS_URL');
};
exports.appModulesMsUrl = appModulesMsUrl;
const generalConfigMsUrl = () => {
    return (0, exports.getValidEndpointUrl)(process.env.GENERAL_MS_URL, 'GENERAL_MS_URL');
};
exports.generalConfigMsUrl = generalConfigMsUrl;
const recordsMsUrl = () => {
    return (0, exports.getValidEndpointUrl)(process.env.RECORDS_MS_URL, 'RECORDS_MS_URL');
};
exports.recordsMsUrl = recordsMsUrl;
const fileManagementMsUrl = () => {
    return (0, exports.getValidEndpointUrl)(process.env.FILE_MANAGEMENT_MS_URL, 'FILE_MANAGEMENT_MS_URL');
};
exports.fileManagementMsUrl = fileManagementMsUrl;
const getResponse = async (url, options, logger) => {
    const response = await (0, cross_fetch_1.fetch)(url, options)
        .then((response) => response.json())
        .catch((err) => {
        logger.error(err.message);
        throw new common_1.InternalServerErrorException(err.message);
    });
    switch (response.statusCode) {
        case 400:
            logger.log(`Bad Request: ${response.message}`);
            throw new common_1.BadRequestException(response.message);
        case 401:
            logger.log(`Unauthorized: ${response.message}`);
            throw new common_1.UnauthorizedException(response.message);
        case 403:
            logger.log(`Forbidden: ${response.message}`);
            throw new common_1.ForbiddenException(response.message);
        case 404:
            logger.log(`Not Found: ${response.message}`);
            throw new common_1.NotFoundException(response.message);
        case 408:
            logger.log(`Request Timeout: ${response.message}`);
            throw new common_1.RequestTimeoutException(response.message);
        case 409:
            logger.log(`Conflict: ${response.message}`);
            throw new common_1.ConflictException(response.message);
        case 413:
            logger.log(`Payload Too Large: ${response.message}`);
            throw new common_1.PayloadTooLargeException(response.message);
        case 500:
            logger.log(`Internal Server Error: ${response.message}`);
            throw new common_1.InternalServerErrorException(response.message);
    }
    return response;
};
exports.getResponse = getResponse;
const getResponseAsText = async (url, options, logger) => {
    const response = await (0, cross_fetch_1.fetch)(url, options);
    switch (response.status) {
        case 400:
            logger.log(`Bad Request`);
            throw new common_1.BadRequestException();
        case 401:
            logger.log(`Unauthorized`);
            throw new common_1.UnauthorizedException();
        case 403:
            logger.log(`Forbidden`);
            throw new common_1.ForbiddenException();
        case 404:
            logger.log(`Not Found`);
            throw new common_1.NotFoundException();
        case 408:
            logger.log(`Request Timeout`);
            throw new common_1.RequestTimeoutException();
        case 409:
            logger.log(`Conflict`);
            throw new common_1.ConflictException();
        case 413:
            logger.log(`Payload Too Large`);
            throw new common_1.PayloadTooLargeException();
        case 500:
            logger.log(`Internal Server Error`);
            throw new common_1.InternalServerErrorException();
    }
    return response.text();
};
exports.getResponseAsText = getResponseAsText;
const getObjectPropertiesDataTypeEnum = (type) => {
    type = type.toLowerCase();
    switch (type) {
        case 'string':
            return Enums_1.ObjectPropertiesDataTypeEnum.String;
        case 'number':
            return Enums_1.ObjectPropertiesDataTypeEnum.Number;
        case 'date':
            return Enums_1.ObjectPropertiesDataTypeEnum.Date;
        case 'list':
            return Enums_1.ObjectPropertiesDataTypeEnum.List;
        case 'file':
            return Enums_1.ObjectPropertiesDataTypeEnum.File;
        case 'textarea':
            return Enums_1.ObjectPropertiesDataTypeEnum.TextArea;
        case 'datetime':
            return Enums_1.ObjectPropertiesDataTypeEnum.Datetime;
        case 'time':
            return Enums_1.ObjectPropertiesDataTypeEnum.Time;
        case 'decimal':
            return Enums_1.ObjectPropertiesDataTypeEnum.Decimal;
        case 'url':
            return Enums_1.ObjectPropertiesDataTypeEnum.Url;
        case 'image':
            return Enums_1.ObjectPropertiesDataTypeEnum.Image;
        case 'multiselect':
            return Enums_1.ObjectPropertiesDataTypeEnum.Multiselect;
        case 'checkbox':
            return Enums_1.ObjectPropertiesDataTypeEnum.Checkbox;
        case 'object':
            return Enums_1.ObjectPropertiesDataTypeEnum.Object;
        case 'multiselect-checkbox':
            return Enums_1.ObjectPropertiesDataTypeEnum.MultiselectCheckbox;
        default:
            return Enums_1.ObjectPropertiesDataTypeEnum.String;
    }
};
exports.getObjectPropertiesDataTypeEnum = getObjectPropertiesDataTypeEnum;
const toISODateString = (date) => {
    return new Date(date).toISOString().split('T')[0];
};
exports.toISODateString = toISODateString;
const toISOTimeString = (time) => {
    return createTimeDate(time).toISOString().split('T')[1].split('Z')[0];
};
exports.toISOTimeString = toISOTimeString;
const createTimeDate = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date;
};
const toISODateTimeString = (date) => {
    return new Date(date).toISOString();
};
exports.toISODateTimeString = toISODateTimeString;
//# sourceMappingURL=utils.js.map