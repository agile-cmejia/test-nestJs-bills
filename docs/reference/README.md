# 📚 Reference Documentation

This directory contains **modular context documentation** for Context Sharding.

## Purpose

We do NOT load all documentation at once. When an agent works on a specific feature, it loads only the relevant reference docs. This prevents **Context Poisoning**.

## Required Files

Create these reference files as your project grows:

| File                    | Purpose                                        |
|-------------------------|------------------------------------------------|
| `api_endpoints.md`      | All backend endpoints with request/response    |
| `auth.md`               | Authentication flow, token management          |
| `db_schema.md`          | Database tables, relationships, indexes        |
| `deployment.md`         | Build, test, and deployment procedures         |
| `env_variables.md`      | All environment variables and their purpose    |
| `architecture.md`       | System architecture and design decisions       |
| `testing.md`            | Testing strategy and patterns                  |

## Format Example

```markdown
# API Endpoints

## POST /api/users/login

**Purpose:** Authenticate user and return JWT token

**Request:**
```json
{
  "email": "user@example.com",
  "password": "hashed_password"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGc...",
  "user": { "id": 123, "name": "John" }
}
```

**Error Cases:**
- 401: Invalid credentials
- 429: Rate limit exceeded
```

## Usage

When working on a feature, load ONLY the relevant reference docs:
- Working on Auth? Load `auth.md`
- Working on Database? Load `db_schema.md`
- DO NOT load everything at once

## Update Rules

Update reference docs when:
- Adding new features/APIs
- Changing integration patterns
- Modifying database schema
- Updating deployment procedures
