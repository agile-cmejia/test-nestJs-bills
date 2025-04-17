"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappingType = exports.ListDataTypeEnum = exports.OriginList = exports.MappingStatus = exports.TransferType = exports.ObjectPropertiesDataTypeEnum = exports.AdditionalFieldDataTypeEnum = exports.FieldAccessEnum = exports.IssuerEnum = void 0;
var IssuerEnum;
(function (IssuerEnum) {
    IssuerEnum["BackOffice"] = "BackOffice";
    IssuerEnum["Saas"] = "Saas";
})(IssuerEnum = exports.IssuerEnum || (exports.IssuerEnum = {}));
var FieldAccessEnum;
(function (FieldAccessEnum) {
    FieldAccessEnum["NotAllowed"] = "NotAllowed";
    FieldAccessEnum["Editable"] = "Editable";
    FieldAccessEnum["ViewOnly"] = "ViewOnly";
})(FieldAccessEnum = exports.FieldAccessEnum || (exports.FieldAccessEnum = {}));
var AdditionalFieldDataTypeEnum;
(function (AdditionalFieldDataTypeEnum) {
    AdditionalFieldDataTypeEnum["String"] = "string";
    AdditionalFieldDataTypeEnum["Number"] = "number";
    AdditionalFieldDataTypeEnum["Date"] = "date";
    AdditionalFieldDataTypeEnum["DropDown"] = "dropdown";
    AdditionalFieldDataTypeEnum["File"] = "file";
    AdditionalFieldDataTypeEnum["TextArea"] = "textarea";
    AdditionalFieldDataTypeEnum["Datetime"] = "datetime";
    AdditionalFieldDataTypeEnum["Time"] = "time";
    AdditionalFieldDataTypeEnum["Currency"] = "currency";
    AdditionalFieldDataTypeEnum["URL"] = "url";
})(AdditionalFieldDataTypeEnum = exports.AdditionalFieldDataTypeEnum || (exports.AdditionalFieldDataTypeEnum = {}));
var ObjectPropertiesDataTypeEnum;
(function (ObjectPropertiesDataTypeEnum) {
    ObjectPropertiesDataTypeEnum["String"] = "string";
    ObjectPropertiesDataTypeEnum["Number"] = "number";
    ObjectPropertiesDataTypeEnum["Date"] = "date";
    ObjectPropertiesDataTypeEnum["List"] = "list";
    ObjectPropertiesDataTypeEnum["SingleSelect"] = "single-select";
    ObjectPropertiesDataTypeEnum["File"] = "file";
    ObjectPropertiesDataTypeEnum["TextArea"] = "textarea";
    ObjectPropertiesDataTypeEnum["Datetime"] = "datetime";
    ObjectPropertiesDataTypeEnum["Time"] = "time";
    ObjectPropertiesDataTypeEnum["Decimal"] = "decimal";
    ObjectPropertiesDataTypeEnum["Url"] = "url";
    ObjectPropertiesDataTypeEnum["Image"] = "image";
    ObjectPropertiesDataTypeEnum["Multiselect"] = "multiselect";
    ObjectPropertiesDataTypeEnum["Checkbox"] = "checkbox";
    ObjectPropertiesDataTypeEnum["MultiselectCheckbox"] = "multiselect-checkbox";
    ObjectPropertiesDataTypeEnum["Object"] = "object";
})(ObjectPropertiesDataTypeEnum = exports.ObjectPropertiesDataTypeEnum || (exports.ObjectPropertiesDataTypeEnum = {}));
var TransferType;
(function (TransferType) {
    TransferType["ExternalToInternal"] = "ExternalToInternal";
    TransferType["InternalToInternal"] = "InternalToInternal";
    TransferType["InternalToExternal"] = "InternalToExternal";
})(TransferType = exports.TransferType || (exports.TransferType = {}));
var MappingStatus;
(function (MappingStatus) {
    MappingStatus["Mapped"] = "mapped";
    MappingStatus["Pending"] = "pending";
    MappingStatus["Error"] = "error";
})(MappingStatus = exports.MappingStatus || (exports.MappingStatus = {}));
var OriginList;
(function (OriginList) {
    OriginList["BackOffice"] = "BackOffice";
    OriginList["Saas"] = "Saas";
})(OriginList = exports.OriginList || (exports.OriginList = {}));
var ListDataTypeEnum;
(function (ListDataTypeEnum) {
    ListDataTypeEnum["User"] = "User";
    ListDataTypeEnum["Value"] = "Value";
})(ListDataTypeEnum = exports.ListDataTypeEnum || (exports.ListDataTypeEnum = {}));
var MappingType;
(function (MappingType) {
    MappingType["Text"] = "text";
    MappingType["Field"] = "field";
    MappingType["List"] = "list";
    MappingType["Rule"] = "rule";
})(MappingType = exports.MappingType || (exports.MappingType = {}));
//# sourceMappingURL=Enums.js.map