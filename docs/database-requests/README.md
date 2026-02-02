# Database Change Requests

This directory contains database change request documents that need to be implemented in the `@avantodev/avanto-db` repository.

## Purpose

When this microservice requires new database entities, schema changes, or migrations:

1. **AI Agent** exports a specification document to this folder
2. **Developer** takes the document to the `avanto-db` repository
3. **Developer** implements the changes in `avanto-db`
4. **Developer** publishes a new version of `@avantodev/avanto-db`
5. **Developer** updates the dependency in this repository

## ⚠️ Important

**This repository NEVER:**
- Creates database entities locally
- Runs migrations
- Modifies database schemas

**All database changes happen in `avanto-db`.**

## Workflow

```
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│  This Repository    │     │    avanto-db        │     │  This Repository    │
│                     │     │                     │     │                     │
│  1. Export spec to  │────▶│  2. Implement       │────▶│  4. Update dep:     │
│     docs/database-  │     │     entity +        │     │     yarn upgrade    │
│     requests/*.md   │     │     migration       │     │     @avantodev/     │
│                     │     │  3. Publish new     │     │     avanto-db@x.x.x │
│                     │     │     version         │     │                     │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘
```

## Document Template

Each request document should include:

- Entity name and table name
- Column definitions (type, nullable, default, description)
- Indexes
- Relations (foreign keys)
- Constraints
- Migration notes

See `.cursor/rules/database-standards.mdc` for the full template.

## File Naming

Use descriptive names with dates:
- `2026-02-02-add-order-entity.md`
- `2026-02-02-add-product-catalog-tables.md`
