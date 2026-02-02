# NestJS Microservice Skeleton

A production-ready NestJS microservice skeleton for building new backend services. Pre-configured with TypeScript, TypeORM, PostgreSQL, structured logging, AWS SQS messaging, and AI-assisted development workflows.

## 📋 Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Pre-Built Infrastructure](#pre-built-infrastructure)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Project Structure](#project-structure)
- [Extending the Skeleton](#extending-the-skeleton)
- [Contributing](#contributing)

## Description

This skeleton provides a **ready-to-use foundation** for building NestJS microservices. It includes:

- **Pre-configured Infrastructure**: Database, logging, messaging, and middleware already set up
- **Utility Library**: Common functions for HTTP requests, date handling, and data transformation
- **AI-Assisted Development**: Cursor rules and OpenSpec integration for consistent, high-quality code
- **Code Quality Pipeline**: ESLint, Prettier, Husky, and Jest pre-configured
- **Multi-tenancy Ready**: Built-in support for tenant-based data isolation

## Features

### Core Infrastructure

| Feature | Description |
|---------|-------------|
| **PostgreSQL + TypeORM** | Database connection with shared entity library (`@avantodev/avanto-db`) |
| **NestJS Logger** | `Logger` from `@nestjs/common` with Pino transport for structured output |
| **Correlation ID Middleware** | Automatic request tracing across services |
| **AWS SQS Integration** | Message queue service for async communication |
| **Swagger/OpenAPI** | Auto-generated API documentation at `/docs` |
| **Validation Pipeline** | Global validation with `class-validator` |

### Utility Functions

| Utility | Description |
|---------|-------------|
| `getResponse()` / `getResponseAsText()` | HTTP client wrappers with error handling |
| `catalogMsUrl()`, `usersMsUrl()`, etc. | Microservice URL helpers with validation |
| `ValidFutureDate()` / `ValidPastDate()` | Date validation helpers |
| `toISODateString()` / `toISOTimeString()` | Date/time formatting |
| `capitalizeFirstLetter()` / `capitalizeSentence()` | String manipulation |

### Data Types

| Type | Description |
|------|-------------|
| `MyContext` | Request context with user, tenant, and payload data |
| `TenantData` | Multi-tenant data structure |
| `IssuerEnum` | Application issuer types (BackOffice, Saas) |
| `ObjectPropertiesDataTypeEnum` | Property data types (string, number, date, list, etc.) |
| `MappingStatus` / `MappingType` | Data mapping enumerations |

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) v9.x / v10.x
- **Language**: TypeScript 4.7.4
- **Database**: PostgreSQL with TypeORM 0.3.x
- **Logging**: NestJS Logger (`@nestjs/common`) with Pino transport (nestjs-pino)
- **Messaging**: AWS SQS (@aws-sdk/client-sqs)
- **Validation**: class-validator, class-transformer
- **API Documentation**: Swagger/OpenAPI (@nestjs/swagger)
- **Unit Testing**: Jest with @nestjs/testing
- **E2E Testing**: Supertest for HTTP endpoint testing
- **Code Quality**: ESLint, Prettier, Husky, Commitlint

## Architecture

### Module Organization

```
src/
├── main.ts                    # Application entry point with Swagger setup
├── app.module.ts              # Root module with TypeORM and Logger config
├── app.controller.ts          # Health check endpoint
├── app.service.ts             # Base service example
├── context/                   # Feature modules (add your modules here)
│   └── entities/              # Shared entity registration module
└── shared/                    # Cross-cutting concerns
    ├── dataTypes/             # Type definitions and enums
    ├── infrastructure/        # Database, logging, messaging
    │   ├── logger/            # Logger transport configuration (Pino)
    │   ├── persistance/       # TypeORM/PostgreSQL setup
    │   └── sqs/               # AWS SQS service
    ├── middleware/            # HTTP middleware
    │   └── correlation-id/    # Request correlation tracking
    └── utils.ts               # Utility functions
```

### Key Components

#### Database Configuration (`shared/infrastructure/persistance/`)

- **PostgresDataSource.ts**: TypeORM data source with auto-loaded entities from `@avantodev/avanto-db`
- **dbConfig.ts**: Environment-based database configuration

#### Logging (`shared/infrastructure/logger/`)

- **pinoLoggerOptions.ts**: Pino transport configuration with correlation ID injection
- Use `Logger` from `@nestjs/common` in your services (Pino handles the output)

#### Messaging (`shared/infrastructure/sqs/`)

- **sqs.service.ts**: AWS SQS client with:
  - `sendMessage()` - Single message sending
  - `sendBulkMessages()` - Batch sending (10 messages per batch)
  - `receiveMessage()` - Message polling
  - `deleteMessage()` - Message acknowledgment

#### Middleware (`shared/middleware/`)

- **CorrelationIdMiddleware**: Generates UUID for each request, sets `X-Correlation-Id` header

## Getting Started

### Prerequisites

- Node.js (v16+)
- Yarn package manager
- PostgreSQL database
- AWS credentials (for SQS features)

### Installation

1. **Clone or use as template:**

   ```bash
   git clone <repository-url> my-new-microservice
   cd my-new-microservice
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Configure environment variables:**

   Create a `.env` file:

   ```env
   # Server
   PORT=3000

   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_NAME=your_database
   DB_SCHEMA=public
   DB_SYNC=false
   DB_LOGGING=false

   # Microservice URLs (optional, for inter-service communication)
   USERS_MS_URL=http://localhost:3001/
   CATALOG_MS_URL=http://localhost:3002/
   TENANTS_MS_URL=http://localhost:3003/
   RECORDS_GRID_MS_URL=http://localhost:3004/
   APP_MODULES_MS_URL=http://localhost:3005/
   GENERAL_MS_URL=http://localhost:3006/
   RECORDS_MS_URL=http://localhost:3007/
   FILE_MANAGEMENT_MS_URL=http://localhost:3008/

   # AWS (for SQS)
   AWS_ACCESS_KEY_ID=your_key
   AWS_SECRET_ACCESS_KEY=your_secret
   AWS_REGION=us-east-1
   ```

4. **Set up Husky git hooks:**

   ```bash
   yarn prepare
   ```

### Running the Application

```bash
# Development mode (with watch)
yarn dev

# Development mode
yarn start

# Production mode
yarn prod

# Debug mode
yarn debug
```

The application will be available at `http://localhost:3000`

### API Documentation

Access Swagger UI at: `http://localhost:3000/docs`

## Pre-Built Infrastructure

### Database Connection

The skeleton uses TypeORM with PostgreSQL. **All entities are managed exclusively by `@avantodev/avanto-db`.**

#### ⚠️ Important: Entity Management Policy

| Action | Allowed? |
|--------|----------|
| Import entities from `@avantodev/avanto-db` | ✅ Yes |
| Update `@avantodev/avanto-db` dependency | ✅ Yes |
| Create local `@Entity()` classes | ❌ **PROHIBITED** |
| Run migrations | ❌ **PROHIBITED** |
| Modify database schemas | ❌ **PROHIBITED** |

#### Using Entities

```typescript
// ✅ CORRECT: Import entities from avanto-db
import { Tenant, User } from '@avantodev/avanto-db';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant, User]),
  ],
})
export class YourModule {}
```

#### When You Need New Database Entities

1. The AI exports requirements to `docs/database-requests/`
2. Implement the entity in the `avanto-db` repository
3. Publish a new version of `@avantodev/avanto-db`
4. Update the dependency: `yarn upgrade @avantodev/avanto-db@latest`

See `.cursor/rules/database-standards.mdc` for full details.

### Structured Logging

Use the NestJS `Logger` from `@nestjs/common`. The skeleton configures Pino as the underlying transport for structured JSON output with correlation IDs:

```typescript
import { Logger } from '@nestjs/common';

@Injectable()
export class YourService {
  private readonly logger = new Logger(YourService.name);

  doSomething() {
    this.logger.log('Operation started');   // Info level
    this.logger.debug('Debug details');     // Debug level
    this.logger.warn('Warning message');    // Warning level
    this.logger.error('Error occurred', error.stack); // Error with stack trace
  }
}
```

Correlation IDs are automatically injected into all log entries via the middleware.

### AWS SQS Messaging

Use the SQS manager for async messaging:

```typescript
import { SQSManager } from './shared/infrastructure/sqs/sqs.service';

const sqsManager = new SQSManager('https://sqs.region.amazonaws.com/account/queue');

// Send single message
await sqsManager.sendMessage({
  groupId: 'my-group',
  deduplicationId: 'unique-id',
  data: { /* your data */ }
});

// Send batch messages
await sqsManager.sendBulkMessages(messages);

// Receive and process
const message = await sqsManager.receiveMessage();
await sqsManager.deleteMessage(message.ReceiptHandle);
```

### HTTP Client Utilities

Pre-built functions for microservice communication:

```typescript
import { getResponse, usersMsUrl } from './shared/utils';

const url = usersMsUrl() + 'endpoint';
const response = await getResponse(url, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' },
}, this.logger);
```

## Development Workflow

### Adding a New Feature Module

1. **Create module structure:**

   ```bash
   mkdir -p src/context/your-feature
   ```

2. **Create files:**

   ```
   src/context/your-feature/
   ├── your-feature.module.ts
   ├── your-feature.controller.ts
   ├── your-feature.service.ts
   └── dto/
       └── create-your-feature.dto.ts
   ```

3. **Register in AppModule:**

   ```typescript
   import { YourFeatureModule } from './context/your-feature/your-feature.module';

   @Module({
     imports: [
       // ... existing imports
       YourFeatureModule,
     ],
   })
   export class AppModule {}
   ```

### Code Standards

This project follows strict coding standards defined in Cursor Rules (`.cursor/rules/`):

| Rule File | Purpose |
|-----------|---------|
| `nestjs-typescript-standards.mdc` | NestJS patterns and conventions |
| `testing-standards-typescript.mdc` | Jest unit tests and Supertest E2E requirements |
| `dto-patterns.mdc` | DTO validation patterns |
| `error-handling-patterns.mdc` | Exception handling |
| `typeorm-patterns.mdc` | Database access patterns |
| `api-standards.mdc` | REST API conventions |

## Testing

This project requires **complete test coverage** with both unit tests and E2E tests for all features.

### Testing Stack

| Type | Framework | Location | Description |
|------|-----------|----------|-------------|
| **Unit Tests** | Jest | `src/**/*.spec.ts` | Test individual services, controllers, and utilities in isolation |
| **E2E Tests** | Supertest | `test/*.e2e-spec.ts` | Test complete API workflows and endpoint behavior |

### Running Tests

```bash
# Run unit tests (Jest)
yarn test

# Run unit tests in watch mode
yarn test:watch

# Run unit tests with coverage report
yarn test:cov

# Run E2E tests (Supertest)
yarn test:e2e

# Debug tests
yarn test:debug
```

### Test Requirements

**All code must be covered by both unit tests AND E2E tests.**

#### Unit Tests (Jest)

- **New Features**: Minimum 5 unit tests per feature
- **Bug Fixes**: Minimum 2 regression tests per bug
- **Coverage Target**: 80% minimum
- Test services, controllers, guards, pipes, and utilities in isolation
- Mock all external dependencies

```typescript
// Example: src/context/your-feature/your-feature.service.spec.ts
describe('YourFeatureService', () => {
  let service: YourFeatureService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [YourFeatureService, { provide: Repository, useValue: mockRepo }],
    }).compile();
    service = module.get(YourFeatureService);
  });

  it('should create entity successfully', async () => {
    // Test implementation
  });
});
```

#### E2E Tests (Supertest)

- **All endpoints** must have E2E tests
- Test complete request/response cycles
- Verify HTTP status codes, response bodies, and headers
- Test authentication and authorization flows

```typescript
// Example: test/your-feature.e2e-spec.ts
describe('YourFeature (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /your-feature should create entity', () => {
    return request(app.getHttpServer())
      .post('/your-feature')
      .send({ name: 'Test' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
```

### Pre-Commit Hooks

Tests run automatically via Husky before each commit. Commits are blocked if tests fail.

## Code Quality

### Linting and Formatting

```bash
# Run linter
yarn lint

# Format code
yarn format

# Run both (lint + format)
yarn pretty:lint
```

### Pre-Commit Hooks

Husky automatically runs:

- Unit tests (`yarn test`)
- Linting (via lint-staged)
- Commit message validation (Commitlint)

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat(users): add user registration endpoint
fix(auth): resolve token validation issue
docs(readme): update installation instructions
```

## Project Structure

```
NestJS-MS-Skeleton/
│
├── .cursor/                           # AI-assisted development configuration
│   ├── commands/                      # Cursor slash commands for OpenSpec workflows
│   │   ├── openspec-apply.md          # Apply approved change proposals
│   │   ├── openspec-archive.md        # Archive completed specs
│   │   └── openspec-proposal.md       # Create new change proposals
│   └── rules/                         # Coding standards (30+ rule files)
│       ├── global.mdc                 # Constitution - immutable core rules
│       ├── nestjs-typescript-standards.mdc  # NestJS patterns and conventions
│       ├── testing-standards-typescript.mdc # Jest and E2E testing requirements
│       ├── dto-patterns.mdc           # DTO validation patterns
│       ├── error-handling-patterns.mdc # Exception handling standards
│       ├── typeorm-patterns.mdc       # Database access patterns
│       ├── api-standards.mdc          # REST API conventions
│       ├── security-standards.mdc     # Security best practices
│       └── ...                        # 22+ additional rule files
│
├── .husky/                            # Git hooks configuration
│   ├── commit-msg                     # Commitlint validation hook
│   └── pre-commit                     # Pre-commit tests and linting
│
├── docs/                              # Business and technical documentation
│   ├── done_specs/                    # Archived completed specifications
│   │   └── README.md                  # Archive index and guidelines
│   ├── reference/                     # Durable context documentation
│   │   ├── README.md                  # Reference docs index
│   │   └── Strata Dev Framework...md  # AI development framework guide
│   └── specs/                         # Active specifications
│       ├── prd/                       # Product requirement documents
│       │   └── README.md              # PRD guidelines
│       ├── stories/                   # User stories
│       │   └── README.md              # Stories guidelines
│       ├── stories.json               # Atomic tasks with binary criteria
│       └── README.md                  # Specs overview
│
├── src/                               # Application source code
│   ├── main.ts                        # Application entry point + Swagger setup
│   ├── app.module.ts                  # Root NestJS module with TypeORM config
│   ├── app.controller.ts              # Health check endpoint (/)
│   ├── app.controller.spec.ts         # Unit tests for app controller
│   ├── app.service.ts                 # Base service example
│   ├── agents.md                      # AI agent memory for src/ folder
│   │
│   ├── context/                       # Feature modules (add your modules here)
│   │   ├── agents.md                  # AI agent memory for context/
│   │   └── entities/                  # Shared entity registration module
│   │       ├── entities.module.ts     # TypeORM entity imports from @avantodev/avanto-db
│   │       └── agents.md              # AI agent memory for entities/
│   │
│   └── shared/                        # Cross-cutting concerns and utilities
│       ├── agents.md                  # AI agent memory for shared/
│       ├── utils.ts                   # Utility functions (HTTP, date, string helpers)
│       │
│       ├── dataTypes/                 # Type definitions, interfaces, and enums
│       │   ├── agents.md              # AI agent memory for dataTypes/
│       │   ├── Enums.ts               # Application enumerations (IssuerEnum, MappingStatus, etc.)
│       │   ├── MyContext.ts           # Request context type (user, tenant, payload)
│       │   ├── Options.ts             # Configuration options types
│       │   ├── RoleInTenant.DataType.ts    # Role-tenant relationship type
│       │   ├── RoleInUser.DataType.ts      # Role-user relationship type
│       │   ├── UnknownKeysObject.ts        # Dynamic object type helper
│       │   └── UserInTenant.DataType.ts    # User-tenant relationship type
│       │
│       ├── infrastructure/            # Infrastructure services
│       │   ├── agents.md              # AI agent memory for infrastructure/
│       │   │
│       │   ├── logger/                # Logging configuration
│       │   │   ├── agents.md          # AI agent memory for logger/
│       │   │   └── pinoLoggerOptions.ts    # Pino transport config with correlation ID
│       │   │
│       │   ├── persistance/           # Database configuration
│       │   │   ├── agents.md          # AI agent memory for persistance/
│       │   │   └── postgre-sql/       # PostgreSQL + TypeORM setup
│       │   │       ├── agents.md      # AI agent memory for postgre-sql/
│       │   │       ├── dbConfig.ts    # Environment-based DB configuration
│       │   │       └── PostgresDataSource.ts  # TypeORM data source with entity loading
│       │   │
│       │   └── sqs/                   # AWS SQS messaging
│       │       ├── agents.md          # AI agent memory for sqs/
│       │       └── sqs.service.ts     # SQS client (send, receive, delete messages)
│       │
│       └── middleware/                # HTTP middleware
│           ├── agents.md              # AI agent memory for middleware/
│           └── correlation-id/        # Request correlation tracking
│               ├── agents.md          # AI agent memory for correlation-id/
│               ├── correlation-id.middleware.ts      # UUID generation per request
│               └── correlation-id.middleware.spec.ts # Middleware unit tests
│
├── test/                              # End-to-end tests
│   ├── app.e2e-spec.ts                # E2E tests for application endpoints
│   └── jest-e2e.json                  # Jest E2E configuration
│
├── .env.example                       # Environment variables template
├── .eslintrc.js                       # ESLint configuration
├── .gitignore                         # Git ignore rules
├── .lintstagedrc                      # Lint-staged configuration
├── .markdownlint.json                 # Markdown linting rules
├── .prettierrc                        # Prettier code formatting config
├── AGENTS.md                          # AI agent instructions (OpenSpec)
├── CLAUDE.md                          # Claude-specific AI instructions
├── commitlint.config.js               # Commit message validation config
├── Dockerfile                         # Docker build configuration
├── nest-cli.json                      # NestJS CLI configuration
├── package.json                       # Dependencies and scripts
├── tsconfig.json                      # TypeScript configuration
├── tsconfig.build.json                # TypeScript build configuration
└── yarn.lock                          # Yarn dependency lock file
```

### Folder Descriptions

| Folder | Purpose |
|--------|---------|
| `.cursor/` | AI-assisted development with Cursor IDE (rules and commands) |
| `.cursor/commands/` | Slash commands for OpenSpec spec-driven development workflow |
| `.cursor/rules/` | 30+ coding standards files for consistent AI-generated code |
| `.husky/` | Git hooks for automated testing and commit validation |
| `docs/` | Business documentation following Strata Dev Framework |
| `docs/done_specs/` | Archive for completed specifications |
| `docs/reference/` | Durable context documents loaded as needed |
| `docs/specs/` | Active specifications, PRDs, and user stories |
| `src/` | Application source code |
| `src/context/` | Feature modules - add your business logic here |
| `src/context/entities/` | Shared entity registration from `@avantodev/avanto-db` |
| `src/shared/` | Cross-cutting concerns shared across all modules |
| `src/shared/dataTypes/` | TypeScript types, interfaces, and enumerations |
| `src/shared/infrastructure/` | Infrastructure services (DB, logging, messaging) |
| `src/shared/infrastructure/logger/` | Pino logger transport configuration |
| `src/shared/infrastructure/persistance/` | TypeORM/PostgreSQL database setup |
| `src/shared/infrastructure/sqs/` | AWS SQS message queue service |
| `src/shared/middleware/` | HTTP middleware (correlation ID, etc.) |
| `test/` | End-to-end tests with Supertest |

### agents.md Files (Fractal Memory)

The `agents.md` files distributed throughout the codebase serve as **local AI memory**. They contain:
- Critical lessons learned
- Known issues and workarounds
- Local conventions specific to that folder
- Dependencies between modules

These files help AI assistants understand context-specific patterns and avoid repeating past mistakes.

## Extending the Skeleton

### Adding New Cursor Rules

When introducing new patterns:

- **ALWAYS** create new `.mdc` files in `.cursor/rules/`
- **NEVER** modify existing cursor rules directly
- Use descriptive filenames: `{topic}-{purpose}.mdc`

### Adding New Entities

1. Add entity to `@avantodev/avanto-db` (shared library)
2. Register in `EntitiesModule`
3. Create repository in your feature module

### Adding New Middleware

```typescript
// Create middleware
@Injectable()
export class YourMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Your logic
    next();
  }
}

// Register in AppModule
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware, YourMiddleware).forRoutes('*');
  }
}
```

## Scripts Reference

| Script | Description |
|--------|-------------|
| `yarn dev` | Start in watch mode |
| `yarn start` | Start in development mode |
| `yarn prod` | Start in production mode |
| `yarn build` | Build for production |
| `yarn test` | Run unit tests |
| `yarn test:watch` | Run tests in watch mode |
| `yarn test:cov` | Run tests with coverage |
| `yarn test:e2e` | Run e2e tests |
| `yarn lint` | Run linter |
| `yarn format` | Format code |
| `yarn pretty:lint` | Format and lint |

## Contributing

### Before You Start

1. Read the coding standards in `.cursor/rules/`
2. Understand the project structure
3. Review existing patterns in the codebase

### Development Process

1. Create feature branch from main
2. Implement following cursor rules
3. Write tests (minimum 5 for new features)
4. Run quality checks: `yarn test && yarn lint`
5. Commit (tests run automatically)
6. Create Pull Request

## License

UNLICENSED - Private project

---

**Built with ❤️ using NestJS, TypeScript, and the Strata Dev Framework**
