export enum IssuerEnum {
  BackOffice = 'BackOffice',
  Saas = 'Saas',
}

export enum FieldAccessEnum {
  NotAllowed = 'NotAllowed',
  Editable = 'Editable',
  ViewOnly = 'ViewOnly',
}

export enum AdditionalFieldDataTypeEnum {
  String = 'string',
  Number = 'number',
  Date = 'date',
  DropDown = 'dropdown',
  File = 'file',
  TextArea = 'textarea',
  Datetime = 'datetime',
  Time = 'time',
  Currency = 'currency',
  URL = 'url',
}

export enum ObjectPropertiesDataTypeEnum {
  String = 'string',
  Number = 'number',
  Date = 'date',
  List = 'list',
  SingleSelect = 'single-select',
  File = 'file',
  TextArea = 'textarea',
  Datetime = 'datetime',
  Time = 'time',
  Decimal = 'decimal',
  Url = 'url',
  Image = 'image',
  Multiselect = 'multiselect',
  Checkbox = 'checkbox',
  MultiselectCheckbox = 'multiselect-checkbox',
  Object = 'object',
}

export enum TransferType {
  ExternalToInternal = 'ExternalToInternal',
  InternalToInternal = 'InternalToInternal',
  InternalToExternal = 'InternalToExternal',
}

export enum MappingStatus {
  Mapped = 'mapped',
  Pending = 'pending',
  Error = 'error',
}

export enum OriginList {
  BackOffice = 'BackOffice',
  Saas = 'Saas',
}
export enum ListDataTypeEnum {
  User = 'User',
  Value = 'Value',
}

export enum MappingType {
  Text = 'text',
  Field = 'field',
  List = 'list',
  Rule = 'rule',
}
