# 📜 Specs Directory

This directory contains the **Input Contract** for the Strata Dev Framework.

## Purpose

Specs define executable instructions with **Binary Acceptance Criteria** (Pass/Fail). These are the atomic tasks that the AI agent will execute.

## Structure

```
specs/
├── prd/          # Product Requirements Documents
├── stories/      # Story files with acceptance criteria
└── stories.json  # Main stories file (optional consolidated)
```

## Usage

1. Create stories in `stories/` directory or use a consolidated `stories.json`
2. Each story must have:
   - Unique ID
   - Clear description
   - Files to touch
   - Binary acceptance criteria
   - `passes: false` (until verified)

## Template

See `stories.json` for the template format.

## Rules

- Stories must be **atomic** (completable in one context window)
- Acceptance criteria must be **binary** (true/false, not subjective)
- Agent self-verifies before marking `passes: true`

## Archive

When a feature is complete, move specs to `../done_specs/` to keep this folder clean.
