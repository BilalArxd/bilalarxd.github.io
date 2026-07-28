# Apex Commands

Available commands after initialization:

| Command | Description |
|---------|-------------|
| `/apex:auto` |  |
| `/apex:clarify` |  |
| `/apex:compliance` |  |
| `/apex:design` |  |
| `/apex:implement` |  |
| `/apex:plan` |  |
| `/apex:review` |  |
| `/apex:ship` | ## Step 1 — Pre-flight checks |
| `/apex:specify` |  |
| `/apex:start` |  |
| `/apex:test` |  |
| `/apex:util:add-tech` |  |
| `/apex:util:adr` |  |
| `/apex:util:agents` |  |
| `/apex:util:audit` | <objective> |
| `/apex:util:commit` | ## Step 1 — Prepare changes |
| `/apex:util:constitution` | <objective> |
| `/apex:util:frontend-architecture-decision` |  |
| `/apex:util:graph` |  |
| `/apex:util:health` | Check Apex installation health and component integrity. |
| `/apex:util:help` |  |
| `/apex:util:hooks` |  |
| `/apex:util:learn` | <objective> |
| `/apex:util:logs` |  |
| `/apex:util:migration-decision` |  |
| `/apex:util:profile` | <objective> |
| `/apex:util:rules` |  |
| `/apex:util:skills` |  |
| `/apex:util:stack-check` |  |
| `/apex:util:status` | <objective> |
| `/apex:util:tasks` |  |
| `/apex:util:ui-designer` |  |
| `/apex:util:understand` |  |
| `/apex:validate` |  |

## Quick Start

1. `/apex:util:status` — check current state
2. `/apex:start` — begin a new story
3. `/apex:specify` → `/apex:design` → `/apex:implement` — full workflow
4. `/apex:test` → `/apex:compliance` → `/apex:ship` — validate and ship

Commands are published to IDE-native prompt folders such as `.cursor/prompts/`, `.github/prompts/`, `.claude/commands/`, and `.kiro/prompts/`. Utility commands (everything except the 12 core workflow steps + `/apex:auto`) are namespaced under `apex:util:*`.
