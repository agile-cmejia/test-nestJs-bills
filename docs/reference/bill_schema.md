# Bill Schema

**Source:** [Notion Page](https://www.notion.so/Bill-Schema-2c4acc211ff180e4ae9dc22a32416b79)  
**Last Updated:** 2026-01-22

## Overview

The **Bill Schema** defines a standardized JSON structure for representing vendor bills within the OrderBahn/Strata platform. This schema captures comprehensive bill header information with detailed line-item data, incorporating the industry-standard **Standard Interchange Format (SIF)** for product specifications.

## Purpose

This schema supports the **GWOW (Get Work, Order Work)** workflow by enabling:

- Structured bill data capture and validation
- Consistent representation of bill metadata and line items
- Integration between OrderBahn's record system and SIF-based product data
- Multi-level approval workflow tracking
- Comprehensive vendor and project management

## Key Components

### Header-Level Fields

#### Vendor Information
- **Vendor Name** - `record_additional_field_16`
- **Vendor ID** - `record_additional_field_149`
- **Vendor Internal Number**

#### Invoice Details
- **Invoice Number** - `record_additional_field_93`
- **Invoice Date** - `record_additional_field_94`
- **Invoice Total** - `record_additional_field_95`

#### Purchase Order
- **PO Number** - `record_additional_field_96`
- **PO Date** - `record_additional_field_293`
- **PO Total** - `record_additional_field_293`

#### Financial Details
- **Due Date** - `record_additional_field_99`
- **Discount Terms** - `record_additional_field_105`
- **Balance Due**
- **Date Paid**

#### Approval Chain
- **Three-level approver system** with status and comments
- **Approver 1** - `list_id=14`
- **Approver 2** - `list_id=15`
- **Approver 3** - `list_id=16`
- **Status tracking** - `list_id=17`, `list_id=18`, `list_id=19`

#### Assignment
- **Assigned To** - `list_id=13`
- **Department** - `list_id=12`
- **Location** - `list_id=10`

### Project and Location Fields

#### Project Information
- **Project ID**
- **Project Name**
- **Project Status** - `list_id=69`
- **Project Phase** - `list_id=73`

#### Project Management
- **Project Manager** - `list_id=72`
- **Capital Manager** - `list_id=95`

#### Address Details
- **Installation Address**
- **Property Address**
- **Shipping Address**

#### Location Details
- **Floor Number**
- **Region** - `record_additional_field_248`
- **State**

### Workflow and Tracking Fields

#### Status Tracking
- **Record Status** - `list_id=84`
- **FAS/OB Tracking Status** - `list_id=104`
- **Problem Code** - `list_id=22`

#### Notifications
- **Accounting Team** notification date - `record_additional_field_637`
- **CBRE** notification date
- **Dealer** notification date
- **FAS Team** notification date

#### Error Management
- **Error Tracking** - `list_id=67`
- **Error Description**
- **Non-Compliance Reasons** - `list_id=89`

#### Processing
- **Processed On** - `record_additional_field_98`
- **Client Processed On**
- **Actionable Date**

### Line Items Array

Each bill contains a **lineItems** array with detailed product and pricing information. Line items combine:

#### SIF Standard Fields
- Product identification (Product Number, Description, Catalog Code)
- Pricing structure (List, Sell, Cost, Discounts)
- Quantities and options
- Manufacturing and catalog codes
- Tags for categorization and filtering

#### OrderBahn Additional Fields
- **Customer Order Line Item #** - `line_item_id=12`
- **Extended Prices** - Extended List Price, Extended Net Price
- **GL Account** - `line_item_id=3`
- **Line Status and Comments** - `line_item_id=13`
- **Quantity Details** - QTY Ordered, QTY Shipped, QTY Backordered

## Data Sources

The schema integrates data from multiple sources:

- **OrderBahn Record Fields**: Bill header metadata stored as additional fields and list values
- **SIF Product Data**: Standardized product specifications from manufacturers
- **Line Item Configuration**: Extended pricing and GL account fields configured in OrderBahn
- **Object Values**: Complex objects like Addresses, Capital Manager, Project Manager

## Integration with OrderBahn

This schema aligns with OrderBahn's approach to structured data capture:

- **Validation**: JSON Schema validation ensures data integrity before ingestion
- **API Ingestion**: External API accepts bill payloads in this format
- **Review Queue**: Human-in-the-loop validation for approval workflows and compliance
- **Record Creation**: Validated bills create OrderBahn records with proper field mapping
- **Multi-Level Approval**: Three approver levels with independent status tracking

## Approval Workflow

The Bill Schema supports a comprehensive three-level approval process:

- **Approver 1, 2, 3**: Each level has its own approver assignment (`list_id=14`, `list_id=15`, `list_id=16`)
- **Status Tracking**: Independent status for each approver level (`list_id=17`, `list_id=18`, `list_id=19`)
- **Comments**: Approver comments field for each level
- **Notification State**: Tracks approver notification state
- **Additional Approvals**: PJM Approval with rejection reasons and comments

## Financial Management

- **Payment Terms**: Terms, Discount Terms, Discount Due Date
- **Discount Management**: Discount Amount tracking
- **Balance Tracking**: Balance Due calculation
- **Payment Recording**: Date Paid field
- **Additional Charges**: Freight, Freight 2, Sales Tax, Surcharge, Tariff
- **Totals**: Product Subtotal, Total Sale Amount, Total Gross Profit, Gross Margin %

## JSON Schema Definition

### Revised Bill JSON Schema

The revised schema uses a grouped structure for better organization:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Bill",
  "type": "object",
  "properties": {
    "billInfo": {
      "type": "object",
      "description": "Core Bill header information",
      "properties": {
        "invoiceNumber": {
          "type": "string",
          "description": "Invoice Number - source: record_additional_field_93"
        },
        "invoiceDate": {
          "type": "string",
          "format": "date",
          "description": "Invoice Date - source: record_additional_field_94"
        },
        "invoiceType": {
          "type": "string",
          "description": "Invoice Type"
        },
        "acknowledgementNumber": {
          "type": "string",
          "description": "Acknowledgement Number"
        },
        "poNumber": {
          "type": "string",
          "description": "PO Number - source: record_additional_field_96"
        },
        "poDate": {
          "type": "string",
          "format": "date",
          "description": "PO Date"
        },
        "dueDate": {
          "type": "string",
          "format": "date",
          "description": "Due Date - source: record_additional_field_99"
        },
        "discountDueDate": {
          "type": "string",
          "format": "date",
          "description": "Discount Due Date"
        },
        "discountTerms": {
          "type": "string",
          "description": "Discount Terms - source: record_additional_field_105"
        },
        "terms": {
          "type": "string",
          "description": "Terms - source: record_additional_field_97"
        },
        "datePaid": {
          "type": "string",
          "format": "date",
          "description": "Date Paid"
        },
        "shipDate": {
          "type": "string",
          "format": "date",
          "description": "Ship Date - source: record_additional_field_109"
        },
        "shipmentNumber": {
          "type": "string",
          "description": "Shipment Number"
        },
        "trackingNumber": {
          "type": "string",
          "description": "Tracking Number"
        },
        "universalNumber": {
          "type": "string",
          "description": "Universal Number"
        },
        "invoiceStatus": {
          "type": "string",
          "enum": [
            "Pending",
            "InReview",
            "Approved",
            "Rejected",
            "Paid",
            "Overdue",
            "Cancelled"
          ],
          "description": "Current high-level status of the bill"
        }
      },
      "required": [
        "invoiceNumber",
        "invoiceDate"
      ]
    },
    "vendor": {
      "type": "object",
      "description": "Vendor (supplier) information for this bill",
      "properties": {
        "vendorName": {
          "type": "string",
          "description": "Vendor Name - source: record_additional_field_16"
        },
        "vendorId": {
          "type": "string",
          "description": "Vendor ID - source: record_additional_field_149"
        },
        "vendorInternalNumber": {
          "type": "string",
          "description": "Vendor Internal Number"
        },
        "vendorPoNumber": {
          "type": "string",
          "description": "Vendor PO Number"
        },
        "vendorSalesOrderNumber": {
          "type": "string",
          "description": "Vendor Sales Order Number"
        },
        "manufacturer": {
          "type": "string",
          "description": "Manufacturer"
        },
        "region": {
          "type": "string",
          "description": "Region - source: record_additional_field_248"
        },
        "facilityPartner": {
          "type": "string",
          "description": "Facility Partner - source: list_id=68 + lists_values"
        }
      },
      "required": [
        "vendorName"
      ]
    },
    "dealer": {
      "type": "object",
      "description": "Dealer or customer related to this bill",
      "properties": {
        "dealerCompany": {
          "type": "string",
          "description": "Dealer Company"
        },
        "customerNumber": {
          "type": "string",
          "description": "Customer Number"
        },
        "customerEmail": {
          "type": "string",
          "format": "email",
          "description": "Customer Email"
        },
        "dealerPhone1": {
          "type": "string",
          "description": "Dealer Phone 1"
        },
        "endCustomerName": {
          "type": "string",
          "description": "End Customer Name - source: record_additional_field_173"
        },
        "endUserPo": {
          "type": "string",
          "description": "End User PO"
        }
      }
    },
    "billing": {
      "type": "object",
      "description": "Billing-related information for this bill",
      "properties": {
        "propertyAddress": {
          "type": "string",
          "description": "Property Address"
        },
        "glCode": {
          "type": "string",
          "description": "GL Code"
        },
        "glCodeOverride": {
          "type": "string",
          "description": "Optional override GL Code (if used)"
        }
      }
    },
    "shipping": {
      "type": "object",
      "description": "Shipping party, address, and logistics information",
      "properties": {
        "installationAddress": {
          "type": "string",
          "description": "Installation Address"
        },
        "atShippingAddress": {
          "type": "object",
          "description": "AT_Shipping Address - source: record_additional_field_458 + object_value"
        },
        "addresses": {
          "type": "object",
          "description": "Addresses - source: Addresses Object"
        },
        "location": {
          "type": "string",
          "description": "Location - source: list_id=10 + lists_values"
        },
        "floorNumber": {
          "type": "string",
          "description": "Floor Number"
        },
        "state": {
          "type": "string",
          "description": "State"
        },
        "shippingMethod": {
          "type": "string",
          "description": "Shipping Method - source: record_additional_field_101"
        },
        "fobTerm": {
          "type": "string",
          "description": "FOB Term"
        }
      }
    },
    "project": {
      "type": "object",
      "description": "Project associated with this bill",
      "properties": {
        "projectId": {
          "type": "string",
          "description": "Project Id"
        },
        "projectName": {
          "type": "string",
          "description": "Project Name"
        },
        "projectStatus": {
          "type": "string",
          "description": "Project Status - source: list_id=69 + lists_values"
        },
        "projectPhase": {
          "type": "string",
          "description": "Project Phase - source: list_id=73 + lists_values"
        },
        "projectSubType": {
          "type": "string",
          "description": "Project Sub Type - source: list_id=74 + lists_values"
        },
        "projectCapitalDriver": {
          "type": "string",
          "description": "Project Capital Driver - source: list_id=103 + lists_values"
        },
        "projectSiteId": {
          "type": "string",
          "description": "Project Site ID"
        },
        "projectManager": {
          "type": "object",
          "description": "Project Manager - source: list_id=72 + object_values"
        },
        "capitalManager": {
          "type": "object",
          "description": "Capital Manager - source: list_id=95 + object_values"
        }
      }
    },
    "contract": {
      "type": "object",
      "description": "Contract details related to this bill",
      "properties": {
        "contractNumber": {
          "type": "string",
          "description": "Contract #"
        },
        "contractName": {
          "type": "string",
          "description": "Contract Name"
        }
      }
    },
    "financials": {
      "type": "object",
      "description": "Bill financial summary and reconciliation",
      "properties": {
        "invoiceTotal": {
          "type": "number",
          "description": "Invoice Total - source: record_additional_field_95"
        },
        "poTotal": {
          "type": "number",
          "description": "PO Total - source: record_additional_field_293"
        },
        "productSubtotal": {
          "type": "number",
          "description": "Product Subtotal"
        },
        "discountAmount": {
          "type": "number",
          "description": "Discount Amount"
        },
        "depositAmount": {
          "type": "number",
          "description": "Deposit Amount"
        },
        "salesTax": {
          "type": "number",
          "description": "Sales Tax - source: record_additional_field_111"
        },
        "freight": {
          "type": "number",
          "description": "Freight - source: record_additional_field_100"
        },
        "freight2": {
          "type": "number",
          "description": "Freight 2 - source: record_additional_field_110"
        },
        "surcharge": {
          "type": "number",
          "description": "Surcharge - source: record_additional_field_224"
        },
        "tariff": {
          "type": "number",
          "description": "Tariff - source: record_additional_field_143"
        },
        "balanceDue": {
          "type": "number",
          "description": "Balance Due"
        },
        "totalSaleAmount": {
          "type": "number",
          "description": "Total Sale Amount"
        },
        "totalGrossProfit": {
          "type": "number",
          "description": "Total Gross Profit"
        },
        "grossMarginPercentage": {
          "type": "string",
          "description": "Gross Margin %"
        },
        "actualPercentage": {
          "type": "string",
          "description": "Actual Percentage"
        }
      }
    },
    "sourceDocument": {
      "type": "object",
      "description": "Source SIF / Spec document information for this bill",
      "properties": {
        "sifFileName": {
          "type": "string",
          "description": "SIF File Name (SF)"
        },
        "version": {
          "type": "string",
          "description": "Project Spec Version (VR)"
        },
        "fileDate": {
          "type": "string",
          "description": "File creation date (DT)"
        },
        "fileTime": {
          "type": "string",
          "description": "File creation time (TM)"
        },
        "filePath": {
          "type": "string",
          "description": "SIF File Path - Cyncly only (FPPRJ)"
        },
        "endOfFile": {
          "type": "string",
          "description": "End of SIF marker (SL)"
        }
      }
    },
    "workflow": {
      "type": "object",
      "description": "Workflow, approvals, assignments, QA and notifications for this bill",
      "properties": {
        "acComments": {
          "type": "string",
          "description": "AC Comments - source: record_additional_field_273"
        },
        "apComments": {
          "type": "string",
          "description": "AP Comments - source: record_additional_field_265"
        },
        "apRepresentative": {
          "type": "string",
          "description": "AP Representative - source: record_additional_field_258 + lists_values"
        },
        "approverNotificationState": {
          "type": "string",
          "description": "Approver Notification State"
        },
        "notificationState": {
          "type": "string",
          "description": "Notification State"
        },
        "rejectionState": {
          "type": "string",
          "description": "Rejection State"
        },
        "recordStatus": {
          "type": "string",
          "description": "Record Status - source: list_id=84 + lists_values"
        },
        "problemCode": {
          "type": "string",
          "description": "Problem Code - source: list_id=22 + lists_values"
        },
        "errorTracking": {
          "type": "array",
          "description": "Error Tracking - source: list_id=67 + lists_values",
          "items": {
            "type": "string"
          }
        },
        "nonComplianceReason": {
          "type": "array",
          "description": "Non-Compliance Reason(s) - source: list_id=89 + lists_values",
          "items": {
            "type": "string"
          }
        },
        "qaTransferSingleselect": {
          "type": "string",
          "description": "QA transfer Singleselect - source: list_id=7 + lists_values"
        },
        "obsolete": {
          "type": "boolean",
          "description": "Obsolete"
        },
        "approval": {
          "type": "object",
          "description": "Approver configuration, statuses and comments",
          "properties": {
            "approver1": {
              "type": "string",
              "description": "Approver 1 - source: list_id=14 + lists_values"
            },
            "approver1Status": {
              "type": "string",
              "description": "Approver 1 Status - source: list_id=17 + lists_values"
            },
            "approver1Comments": {
              "type": "string",
              "description": "Approver 1 Comments"
            },
            "approver2": {
              "type": "string",
              "description": "Approver 2 - source: list_id=15 + lists_values"
            },
            "approver2Status": {
              "type": "string",
              "description": "Approver 2 Status - source: list_id=18 + lists_values"
            },
            "approver2Comments": {
              "type": "string",
              "description": "Approver 2 Comments"
            },
            "approver3": {
              "type": "string",
              "description": "Approver 3 - source: list_id=16 + lists_values"
            },
            "approver3Status": {
              "type": "string",
              "description": "Approver 3 Status - source: list_id=19 + lists_values"
            },
            "approver3Comments": {
              "type": "string",
              "description": "Approver 3 Comments"
            },
            "pjmApproval": {
              "type": "string",
              "description": "PJM Approval - source: list_id=99 + lists_values"
            },
            "pjmRejectionReason": {
              "type": "array",
              "description": "PJM Rejection Reason(s) - source: list_id=100 + lists_values",
              "items": {
                "type": "string"
              }
            },
            "pjmRejectionAdditionalComments": {
              "type": "string",
              "description": "PJM Rejection Additional Comments"
            },
            "fasObComments": {
              "type": "string",
              "description": "FAS/OB Comments"
            },
            "fasObReviewReasons": {
              "type": "array",
              "description": "FAS/OB Review Reasons - source: list_id=105 + lists_values",
              "items": {
                "type": "string"
              }
            },
            "fasObTrackingStatus": {
              "type": "string",
              "description": "FAS/OB Tracking Status - source: list_id=104 + lists_values"
            }
          }
        },
        "assignment": {
          "type": "object",
          "description": "Assignment and ownership of the bill",
          "properties": {
            "assignedTo": {
              "type": "string",
              "description": "Assigned To - source: list_id=13 + lists_values"
            },
            "department": {
              "type": "string",
              "description": "Department - source: list_id=12 + lists_values"
            },
            "adminRetail": {
              "type": "string",
              "description": "Admin/Retail - source: list_id=71 + lists_values"
            },
            "manualApproverName": {
              "type": "string",
              "description": "Manual Approver Name"
            },
            "manualAssignedDepartment": {
              "type": "string",
              "description": "Manual Assigned Department"
            },
            "manualAssignedTo": {
              "type": "string",
              "description": "Manual Assigned To"
            },
            "assignedDepartmentMigrated": {
              "type": "string",
              "description": "Assigned Department Migrated"
            },
            "assignedToMigrated": {
              "type": "string",
              "description": "Assigned To Migrated"
            }
          }
        },
        "notifications": {
          "type": "object",
          "description": "Notification-related timestamps",
          "properties": {
            "accountingTeamNotificationDate": {
              "type": "string",
              "format": "date-time",
              "description": "Accounting Team Notification Date - source: record_additional_field_637"
            },
            "cbreNotificationDate": {
              "type": "string",
              "format": "date-time",
              "description": "CBRE Notification Date"
            },
            "dealerNotificationDate": {
              "type": "string",
              "format": "date-time",
              "description": "Dealer Notification Date"
            },
            "fasTeamNotificationDate": {
              "type": "string",
              "format": "date-time",
              "description": "FAS Team Notification Date"
            }
          }
        },
        "performLookup": {
          "type": "boolean",
          "description": "Perform Lookup"
        }
      }
    },
    "lineItems": {
      "type": "array",
      "description": "Line items on the bill (SIF-based + ERP fields)",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": [
          "productNumber",
          "productDescription",
          "catalogCode",
          "quantity",
          "productSell"
        ],
        "properties": {
          "productNumber": {
            "type": "string",
            "description": "Product Number (PN) / Item Number - source: line_item_id=12"
          },
          "productDescription": {
            "type": "string",
            "description": "Product Description (PD) / Item Description - source: line_item_id=12"
          },
          "catalogCode": {
            "type": "string",
            "description": "Catalog Code (MC) / Line Catalogue - source: line_item_id=13"
          },
          "manufacturerCode": {
            "type": "string",
            "description": "Manufacturer Code (EC) / Line Manufacturer - source: line_item_id=13"
          },
          "tags": {
            "type": "array",
            "description": "All tag fields TG, GC, T3, T4, T5, L1, L2, L3",
            "items": {
              "type": "string"
            }
          },
          "quantity": {
            "type": "number",
            "minimum": 1,
            "description": "Line Item Quantity (QT) / QTY Ordered - source: line_item_id=13"
          },
          "productList": {
            "type": "number",
            "minimum": 0,
            "description": "Product List Price (PL) / Unit List Price - source: line_item_id=13"
          },
          "productSell": {
            "type": "number",
            "minimum": 0,
            "description": "Product Sell Price (SP / PS)"
          },
          "productCost": {
            "type": "number",
            "minimum": 0,
            "description": "Product Cost (BP / PB) / Unit Net Price - source: line_item_id=12"
          },
          "sellDiscount": {
            "type": "number",
            "minimum": 0,
            "maximum": 100,
            "description": "Sell Discount Percentage (S-)"
          },
          "purchaseDiscount": {
            "type": "number",
            "minimum": 0,
            "maximum": 100,
            "description": "Purchase Discount Percentage (P%)"
          },
          "totalProduct": {
            "type": "number",
            "description": "Line total product amount (PT-like)"
          },
          "totalList": {
            "type": "number",
            "description": "Line total list amount (TL-like)"
          },
          "totalSell": {
            "type": "number",
            "description": "Line total sell amount (TS-like)"
          },
          "totalPurchase": {
            "type": "number",
            "description": "Line total purchase amount (TP-like)"
          },
          "options": {
            "type": "object",
            "description": "Option information (ON, OD, OG)",
            "properties": {
              "optionNumber": {
                "type": "string",
                "description": "Option Number (ON)"
              },
              "optionDescription": {
                "type": "string",
                "description": "Option Description (OD)"
              },
              "optionGroup": {
                "type": "string",
                "description": "Option Group (OG)"
              }
            },
            "additionalProperties": false
          },
          "customerOrderLineItemNumber": {
            "type": "string",
            "description": "Customer Order Line Item # - source: line_item_id=12"
          },
          "extendedListPrice": {
            "type": "number",
            "description": "Extended List Price - source: line_item_id=13"
          },
          "extendedNetPrice": {
            "type": "number",
            "description": "Extended Net Price - source: line_item_id=12"
          },
          "glAccount": {
            "type": "string",
            "description": "GL Account - source: line_item_id=3"
          },
          "lineComments": {
            "type": "string",
            "description": "Line Comments - source: line_item_id=13"
          },
          "lineNumber": {
            "type": "string",
            "description": "Line Number - source: line_item_id=13"
          },
          "lineStatus": {
            "type": "string",
            "description": "Line Status - source: line_item_id=13"
          },
          "qtyBackordered": {
            "type": "string",
            "description": "QTY Backordered - source: line_item_id=12"
          },
          "qtyShipped": {
            "type": "string",
            "description": "QTY Shipped - source: line_item_id=12"
          },
          "skuPartNumber": {
            "type": "string",
            "description": "SKU/Part Number - source: line_item_id=13"
          }
        }
      }
    },
    "warrantyInformation": {
      "type": "string",
      "description": "Warranty or coverage details associated with this bill, if any"
    },
    "metadata": {
      "type": "object",
      "description": "System, capture, and migration metadata for the bill",
      "properties": {
        "comments": {
          "type": "string",
          "description": "Comments - source: record_additional_field_14"
        },
        "emailFrom": {
          "type": "string",
          "description": "EmailFrom"
        },
        "emailTo": {
          "type": "string",
          "description": "EmailTo"
        },
        "emailSubject": {
          "type": "string",
          "description": "EmailSubject"
        },
        "attachment": {
          "type": "string",
          "description": "Attachment"
        },
        "testUrlAgain": {
          "type": "string",
          "description": "Test URL again"
        },
        "batchNumber": {
          "type": "string",
          "description": "Batch Number"
        },
        "runNumber": {
          "type": "string",
          "description": "Run Number - source: record_additional_field_447"
        },
        "lastRunDateTime": {
          "type": "string",
          "description": "Last Run Date Time - source: record_additional_field_448"
        },
        "errorDescription": {
          "type": "string",
          "description": "Error Description"
        },
        "invalidDates": {
          "type": "string",
          "description": "Invalid Dates"
        },
        "captureData": {
          "type": "object",
          "description": "Data related to the document capture process (shared pattern with PO and Acknowledgment)",
          "properties": {
            "batchId": {
              "type": "string",
              "description": "Identifier for the batch process"
            },
            "workflowId": {
              "type": "string",
              "description": "Identifier for the workflow instance"
            },
            "recordId": {
              "type": "string",
              "description": "Unique identifier for the record within a system"
            }
          }
        },
        "processing": {
          "type": "object",
          "description": "Processing timestamps and process labels",
          "properties": {
            "processName": {
              "type": "string",
              "description": "Process Name - source: record_additional_field_186"
            },
            "processedOn": {
              "type": "string",
              "format": "date-time",
              "description": "Processed On - source: record_additional_field_98"
            },
            "clientProcessedOn": {
              "type": "string",
              "format": "date-time",
              "description": "Client Processed On"
            }
          }
        },
        "migration": {
          "type": "object",
          "description": "Migration-specific metadata for legacy bill records",
          "properties": {
            "batchNameMigrated": {
              "type": "string",
              "description": "BatchNameMigrated"
            },
            "filenameMigrated": {
              "type": "string",
              "description": "FilenameMigrated"
            },
            "originalFileNameMigrated": {
              "type": "string",
              "description": "OriginalFileNameMigrated"
            },
            "pageCountMigrated": {
              "type": "number",
              "description": "PageCountMigrated"
            },
            "hashSignatureMigrated": {
              "type": "string",
              "description": "HashSignatureMigrated"
            },
            "itemHashMigrated": {
              "type": "string",
              "description": "ItemHashMigrated"
            },
            "itemIdMigrated": {
              "type": "string",
              "description": "ItemIdMigrated"
            },
            "internalRecordIdMigrated": {
              "type": "string",
              "description": "InternalRecordIdMigrated"
            },
            "statusMigrated": {
              "type": "string",
              "description": "StatusMigrated"
            },
            "viewLinkMigrated": {
              "type": "string",
              "description": "ViewLinkMigrated"
            },
            "indexDateMigrated": {
              "type": "string",
              "format": "date",
              "description": "Index Date Migrated"
            },
            "dateCapturedMigrated": {
              "type": "string",
              "format": "date-time",
              "description": "Date Captured Migrated"
            },
            "migratedDateCaptured": {
              "type": "string",
              "description": "Migrated Date Captured"
            },
            "migratedTenantName": {
              "type": "string",
              "description": "Migrated Tenant Name"
            },
            "problemCodeMigrated": {
              "type": "string",
              "description": "Problem Code Migrated"
            }
          }
        }
      }
    }
  },
  "required": [
    "billInfo",
    "vendor",
    "lineItems"
  ]
}
```

## Usage Scenarios

1. **Bill Import**: External systems submit vendor bills via REST API
2. **Validation**: Schema ensures required fields and data types are correct
3. **Multi-Level Approval Routing**: Bills route through three approval levels
4. **Project Assignment**: Bills linked to projects with capital drivers and managers
5. **Financial Tracking**: Comprehensive tracking of payments, discounts, and additional charges
6. **Compliance Management**: Non-compliance reasons and error tracking
7. **SIF Compliance**: Product data maintains industry standard compatibility

## Relationship to Other Schemas

- **Customer Invoice Schema**: Shares core structure but adds vendor-specific fields
- **Line Items Schema**: Shares the core SIF structure for product data
- **Acknowledgment Schema**: Similar approval workflow patterns
- **SIF Supported Codes**: References standard SIF field definitions

## Field Mapping Reference

### OrderBahn Record Fields

| Schema Field | OrderBahn Source | Type |
|-------------|-----------------|------|
| vendorName | record_additional_field_16 | string |
| vendorId | record_additional_field_149 | string |
| invoiceNumber | record_additional_field_93 | string |
| invoiceDate | record_additional_field_94 | date |
| invoiceTotal | record_additional_field_95 | number |
| poNumber | record_additional_field_96 | string |
| poDate | record_additional_field_293 | date |
| poTotal | record_additional_field_293 | number |
| dueDate | record_additional_field_99 | date |
| terms | record_additional_field_97 | string |
| discountTerms | record_additional_field_105 | string |
| freight | record_additional_field_100 | number |
| freight2 | record_additional_field_110 | number |
| salesTax | record_additional_field_111 | number |
| surcharge | record_additional_field_224 | number |
| tariff | record_additional_field_143 | number |
| shipDate | record_additional_field_109 | date |
| shippingMethod | record_additional_field_101 | string |
| processedOn | record_additional_field_98 | date-time |
| region | record_additional_field_248 | string |
| comments | record_additional_field_14 | string |
| processName | record_additional_field_186 | string |
| runNumber | record_additional_field_447 | string |
| lastRunDateTime | record_additional_field_448 | string |
| accountingTeamNotificationDate | record_additional_field_637 | date-time |
| acComments | record_additional_field_273 | string |
| apComments | record_additional_field_265 | string |
| apRepresentative | record_additional_field_258 + lists_values | string |

### OrderBahn List Fields

| Schema Field | OrderBahn Source | Type |
|-------------|-----------------|------|
| assignedTo | list_id=13 + lists_values | string |
| department | list_id=12 + lists_values | string |
| location | list_id=10 + lists_values | string |
| approver1 | list_id=14 + lists_values | string |
| approver1Status | list_id=17 + lists_values | string |
| approver2 | list_id=15 + lists_values | string |
| approver2Status | list_id=18 + lists_values | string |
| approver3 | list_id=16 + lists_values | string |
| approver3Status | list_id=19 + lists_values | string |
| projectManager | list_id=72 + object_values | object |
| capitalManager | list_id=95 + object_values | object |
| projectStatus | list_id=69 + lists_values | string |
| projectPhase | list_id=73 + lists_values | string |
| projectSubType | list_id=74 + lists_values | string |
| projectCapitalDriver | list_id=103 + lists_values | string |
| recordStatus | list_id=84 + lists_values | string |
| problemCode | list_id=22 + lists_values | string |
| errorTracking | list_id=67 + lists_values | array |
| nonComplianceReason | list_id=89 + lists_values | array |
| fasObTrackingStatus | list_id=104 + lists_values | string |
| fasObReviewReasons | list_id=105 + lists_values | array |
| pjmApproval | list_id=99 + lists_values | string |
| pjmRejectionReason | list_id=100 + lists_values | array |
| adminRetail | list_id=71 + lists_values | string |
| facilityPartner | list_id=68 + lists_values | string |
| qaTransferSingleselect | list_id=7 + lists_values | string |

### Line Item Fields

| Schema Field | OrderBahn Source | Type |
|-------------|-----------------|------|
| productNumber | line_item_id=12 | string |
| productDescription | line_item_id=12 | string |
| catalogCode | line_item_id=13 | string |
| manufacturerCode | line_item_id=13 | string |
| quantity | line_item_id=13 | number |
| productList | line_item_id=13 | number |
| productCost | line_item_id=12 | number |
| extendedNetPrice | line_item_id=12 | number |
| extendedListPrice | line_item_id=13 | number |
| glAccount | line_item_id=3 | string |
| lineComments | line_item_id=13 | string |
| lineNumber | line_item_id=13 | string |
| lineStatus | line_item_id=13 | string |
| qtyBackordered | line_item_id=12 | string |
| qtyShipped | line_item_id=12 | string |
| customerOrderLineItemNumber | line_item_id=12 | string |

## Notes

- All dates should be in ISO 8601 format (YYYY-MM-DD for dates, YYYY-MM-DDTHH:mm:ss.sssZ for date-times)
- List values must match values defined in OrderBahn's list management system
- Object values (like addresses, project manager, capital manager) are complex objects with their own structure
- The schema supports both flat and grouped structures (revised schema uses grouping for better organization)
- Required fields: `billInfo`, `vendor`, and `lineItems` are mandatory at the root level
- Line items require: `productNumber`, `productDescription`, `catalogCode`, `quantity`, `productSell`
