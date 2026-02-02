# 📖 Stories Directory

This directory contains **atomic story files** for the Strata Dev Framework.

## Purpose

Stories are the executable units of work. Each story must be completable in **ONE context window**.

## File Format

Each story file should follow this structure:

```json
{
  "id": "FEATURE-01",
  "description": "Clear, concise description of the task",
  "files_to_touch": ["src/path/to/file.ts"],
  "acceptance_criteria": [
    "Binary criterion 1",
    "Binary criterion 2"
  ],
  "passes": false
}
```

## Rules of Atomicity

A story is **atomic** if:
- It can be completed in ONE context window (~1 file or ~1 function)
- It does NOT require "figuring things out" (that's research, not a story)
- All acceptance criteria are binary (true/false)

## Binary Acceptance Criteria

| ❌ Bad (Vague)              | ✅ Good (Binary)                           |
|-----------------------------|---------------------------------------------|
| "Make the UI look modern"   | "Button uses Tailwind class `rounded-lg`"   |
| "Fix the bug"               | "Function returns 100 for input [1,2,3]"    |
| "Add error handling"        | "API returns 400 on invalid JSON"           |

## Self-Verification

The Agent must:
1. Read the story
2. Check its own code against `acceptance_criteria`
3. Only then mark `passes: true`

Humans verify AFTER the agent claims success.
