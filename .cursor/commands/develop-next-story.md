---
name: /develop-next-story
id: develop-next-story
category: Stories
description: Read stories.json, find the next pending task (passes: false), and develop it. If stories.json doesn't exist, create one based on the PRD.
---

# Develop Next Story Command

## Purpose

This command automates the development workflow by:

1. Reading `docs/specs/stories.json` to find the next pending story
2. If `stories.json` doesn't exist, creating it based on `docs/specs/prd/API PRD.md` and `docs/reference/bill_schema.json`
3. Implementing the next pending story following the Strata Dev Framework PPRE cycle

## Workflow

### Step 0: Create Feature Branch

**MANDATORY: Create a new branch for the story**

- Check current git status and ensure working directory is clean
- Determine base branch (prefer `staging` if it exists, otherwise use `main`)
- Create branch name: `feature/STORY-ID-short-description` (e.g., `feature/BILLS-02-get-bills-endpoint`)
- Switch to the new branch: `git checkout -b feature/STORY-ID-short-description`
- Verify branch was created successfully
- If branch creation fails, report error and do NOT proceed

**Branch Naming Convention:**

- Format: `feature/STORY-ID-kebab-case-description`
- Use lowercase and hyphens for description
- Keep description concise (max 50 characters)
- Examples:
  - `feature/BILLS-02-get-bills-endpoint`
  - `feature/AUTH-01-login-form-component`
  - `feature/BUG-123-fix-validation-error`

### Step 1: Check for stories.json

**If stories.json exists:**

- Read `docs/specs/stories.json`
- Find the first story where `"passes": false`
- Load the story details (id, description, files_to_touch, acceptance_criteria)
- Proceed to Step 2

**If stories.json does NOT exist:**

- Read `docs/specs/prd/API PRD.md`
- Read `docs/reference/bill_schema.json` (if exists)
- Read `docs/reference/Strata Dev Framework The compounding AI Playbook 2.md` for story format
- Create `docs/specs/stories.json` following the Ralph Protocol format:
  - Epic: Based on PRD section
  - Stories: Atomic tasks with binary acceptance criteria
  - Each story must be completable in one context window
- After creating, proceed to Step 2 with the first story

### Step 2: PRIME Phase

Load all relevant context:

- Read the story from `stories.json`
- Read relevant reference docs from `docs/reference/`
- Read related code files if they exist
- Read `.cursor/rules/` files relevant to the story
- Understand existing patterns in the codebase

### Step 3: PLAN Phase

Create an implementation plan:

- Break down the story into concrete steps
- Identify files to create/modify (including test files)
- **Identify test files needed**:
  - If creating a controller → plan E2E test file
  - If creating a service → plan unit test file (minimum 5 tests)
  - If creating DTOs/mappers → plan unit tests if complex logic
- List dependencies and imports needed
- Verify acceptance criteria are binary (true/false)
- Document the plan before execution

### Step 4: EXECUTE Phase

Implement the story:

- Create/modify files as specified in `files_to_touch`
- Follow project coding standards from `.cursor/rules/`
- Use proper validation decorators, Swagger documentation, etc.
- Ensure all acceptance criteria are met

**MANDATORY: Create Tests**

- **For Controllers**: Create E2E tests in `test/*.e2e-spec.ts` (one test file per controller)
- **For Services**: Create unit tests `*.spec.ts` next to the service file (minimum 5 tests for new services)
- **For DTOs/Mappers**: Create unit tests if complex transformation logic exists
- **For Bug Fixes**: Create minimum 2 regression tests
- Test files should follow naming: `{filename}.spec.ts` for unit tests, `{feature}.e2e-spec.ts` for E2E tests
- Reference `.cursor/rules/testing-standards-typescript.mdc` for test patterns

### Step 5: VERIFY Phase

Self-verify against acceptance criteria:

- Check each acceptance criterion in the story
- Run linting: `yarn lint` (must pass)
- **MANDATORY: Run and verify tests pass**
  - Run unit tests: `yarn test` (must pass)
  - Run E2E tests: `yarn test:e2e` (must pass if controller/service created)
  - Check test coverage: `yarn test:cov` (must be ≥80% for new code)
- Verify no TypeScript compilation errors
- Verify all files compile successfully
- **CRITICAL**: Tests MUST pass before marking story complete
- Only mark `"passes": true` when ALL criteria are met AND all tests pass

### Step 6: UPDATE Phase

Update stories.json:

- Set `"passes": true` for the completed story

**MANDATORY: Update Progress Log**

- Create `logs/` directory if it doesn't exist
- Append entry to `logs/progress.txt` with the following format:

  ```
  [YYYY-MM-DD HH:MM] ✅ STORY-ID: Story Description
  - Summary of key changes made
  - Files created/modified
  - Tests added
  - All acceptance criteria passed
  ```

- Include timestamp, story ID, description, and key implementation details
- Use bullet points to summarize what was accomplished
- End with confirmation that all acceptance criteria passed

### Step 7: Commit and Create Pull Request

**MANDATORY: Commit Changes**

- Stage all changes: `git add .`
- Create commit with descriptive message:
  - Format: `feat(STORY-ID): Story Description`
  - Include key changes in commit body if needed
  - Example: `feat(BILLS-02): Create BillsController with GET /api/v1/bills endpoint`
- Commit changes: `git commit -m "feat(STORY-ID): Story Description"`
- Push branch to remote: `git push origin feature/STORY-ID-short-description`

**MANDATORY: Create Pull Request**

- Create PR with the following structure:
  - **Title**: `feat(STORY-ID): Story Description`
  - **Description Template**:

    ```markdown
    ## Story
    **Story ID**: STORY-ID
    **Description**: Story Description
    
    ## Changes
    - Summary of key changes made
    - Files created/modified
    - Tests added
    
    ## Acceptance Criteria
    ✅ All acceptance criteria passed
    
    ## Testing
    - [x] Unit tests pass
    - [x] E2E tests pass
    - [x] Test coverage ≥80%
    - [x] Linting passes
    - [x] TypeScript compilation successful
    
    ## Files Changed
    - List of files modified/created
    
    ## Related
    - Closes #[issue-number] (if applicable)
    ```

- Set base branch to `staging` (if exists) or `main`
- Add appropriate labels (e.g., `feature`, `story`, `STORY-ID`)
- Request review if team review process is in place
- Link to related issues if applicable

**PR Summary Requirements:**

- Clear title with story ID and description
- Comprehensive description of changes
- List of files modified/created
- Testing status confirmation
- Acceptance criteria verification

## Acceptance Criteria Format

All acceptance criteria must be:

- **Binary**: Can be verified as true/false
- **Specific**: Clear and unambiguous
- **Testable**: Can be verified through code inspection or tests

Examples:

- ✅ "Controller uses @ApiTags('Bills') decorator"
- ✅ "CreateBillDto matches bill_schema.json structure with billInfo, vendor, lineItems required"
- ❌ "Make the code better" (too vague)
- ❌ "Add error handling" (not specific enough)

## Story Format Requirements

Each story must follow this structure:

```json
{
  "id": "STORY-ID",
  "description": "Clear description of what to build",
  "files_to_touch": [
    "path/to/file1.ts",
    "path/to/file2.ts"
  ],
  "acceptance_criteria": [
    "Criterion 1 (binary, testable)",
    "Criterion 2 (binary, testable)"
  ],
  "passes": false
}
```

## Error Handling

**If stories.json is malformed:**

- Report the error
- Suggest fixes
- Do NOT proceed with development

**If no pending stories found:**

- Report: "All stories completed!"
- Suggest creating new stories or checking the PRD for additional requirements

**If PRD is missing when creating stories.json:**

- Report: "Cannot create stories.json: PRD not found at docs/specs/prd/API PRD.md"
- Suggest creating the PRD first

## Reference Files

When creating stories.json from PRD:

- Use `docs/reference/Strata Dev Framework The compounding AI Playbook 2.md` for story format
- Use `docs/reference/bill_schema.json` for schema-based stories
- Follow atomic task principles (one context window per story)
- Group related stories under the same epic

## Example Usage

User: `/develop-next-story`

AI Response:

1. "Creating feature branch: feature/BILLS-02-get-bills-endpoint..."
2. "Reading stories.json..."
3. "Found pending story: BILLS-02 - Create BillsController with GET /api/v1/bills endpoint"
4. "Planning implementation: Controller + E2E tests..."
5. "Implementing story BILLS-02..."
6. "Creating E2E tests for BillsController..."
7. "Running tests: yarn test && yarn test:e2e..."
8. "Verifying acceptance criteria and test coverage..."
9. "✅ Story BILLS-02 completed. All tests passing. Marking as passes: true"
10. "Updating logs/progress.txt with completion details..."
11. "Committing changes and pushing to remote..."
12. "Creating pull request with summary..."

## Testing Requirements (MANDATORY)

**No story is complete without passing tests.**

### When to Create Tests

1. **Controllers** → Always create E2E tests:
   - File: `test/{feature}.e2e-spec.ts`
   - Test all endpoints (GET, POST, PATCH, DELETE)
   - Test authentication, validation, error cases
   - Minimum: One E2E test per endpoint

2. **Services** → Always create unit tests:
   - File: `src/**/{service}.spec.ts` (next to service file)
   - Minimum 5 tests for new services
   - Test all public methods
   - Test error cases and edge cases
   - Mock all dependencies

3. **DTOs/Mappers** → Create tests if complex:
   - Test transformation logic
   - Test validation rules
   - Test edge cases

4. **Bug Fixes** → Always create regression tests:
   - Minimum 2 tests that reproduce and verify the fix
   - Test both the bug scenario and the fixed behavior

### Test Execution Requirements

Before marking a story as `"passes": true`:

1. ✅ All unit tests pass: `yarn test`
2. ✅ All E2E tests pass: `yarn test:e2e`
3. ✅ Test coverage ≥80%: `yarn test:cov`
4. ✅ No linting errors: `yarn lint`
5. ✅ No TypeScript errors

### Test File Patterns

**Unit Test Example:**

```typescript
// src/context/bills/bills.service.spec.ts
describe('BillsService', () => {
  let service: BillsService;
  let repository: Repository<Bill>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BillsService,
        {
          provide: getRepositoryToken(Bill),
          useValue: mockRepository,
        },
      ],
    }).compile();
    service = module.get<BillsService>(BillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Minimum 5 tests for new services
  it('should find all bills with pagination', async () => {});
  it('should filter bills by invoiceNumber', async () => {});
  it('should enforce tenant isolation', async () => {});
  it('should throw NotFoundException when bill not found', async () => {});
  it('should create bill successfully', async () => {});
});
```

**E2E Test Example:**

```typescript
// test/bills.e2e-spec.ts
describe('Bills (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /api/v1/bills should return paginated bills', () => {
    return request(app.getHttpServer())
      .get('/api/v1/bills')
      .set('x-api-key', 'test-key')
      .set('x-api-secret', 'test-secret')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('pagination');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
```

## Progress Log Format

The `logs/progress.txt` file should follow this format for each completed story:

```
[2026-02-02 15:38] ✅ BILLS-02: Create BillsController with GET /api/v1/bills endpoint
- Created BillsController with GET /api/v1/bills endpoint
- Implemented pagination and filtering support via FindBillsDto
- Added Swagger documentation with @ApiOperation(), @ApiQuery(), @ApiResponse()
- Implemented tenant isolation validation (extracts tenantId from request)
- Added structured logging with tenantId and correlationId
- Created E2E tests for GET endpoint
- All acceptance criteria passed
```

**Key Requirements:**

- Use timestamp format: `[YYYY-MM-DD HH:MM]`
- Include story ID and description
- List key implementation details as bullet points
- Mention files created/modified
- Note tests added
- Confirm all acceptance criteria passed

## Git Workflow

### Branch Management

- **ALWAYS** create a feature branch before starting development
- Use naming convention: `feature/STORY-ID-kebab-case-description`
- Base branch priority: `staging` > `main`
- Ensure working directory is clean before creating branch
- Never commit directly to `main` or `staging` branches

### Commit Messages

- Follow conventional commits format: `feat(STORY-ID): Description`
- Use appropriate type: `feat`, `fix`, `docs`, `test`, `refactor`, etc.
- Include story ID in commit message
- Keep commit message concise but descriptive

### Pull Request Requirements

- **MANDATORY**: Create PR after completing story
- PR title must include story ID and description
- PR description must include:
  - Story information
  - Changes summary
  - Testing status
  - Files changed
  - Acceptance criteria verification
- Set appropriate base branch (`staging` or `main`)
- Add relevant labels
- Link related issues if applicable

## Notes

- Always follow the PPRE cycle (PRIME -> PLAN -> RESET -> EXECUTE)
- Reset context between PLAN and EXECUTE phases
- If scope changes during execution, return to PRIME + PLAN
- **MANDATORY**: Create feature branch before starting development
- **MANDATORY**: Commit changes and create PR after story completion
- Update at least one `.md` file per bug fix (Strata Dev Framework requirement)
- **MANDATORY**: Update `logs/progress.txt` after completing each story (Strata Dev Framework requirement)
- Follow all coding standards in `.cursor/rules/`
- **CRITICAL**: Tests are not optional - they are mandatory for story completion
- Reference `.cursor/rules/testing-standards-typescript.mdc` for detailed test patterns
