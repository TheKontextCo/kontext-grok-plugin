---
name: log-decision
description: Record a technical decision in Kontext with its rationale and rejected alternatives
---

# Log a decision

Record the decision the user named. With no topic, use the decision this
session just reached. If the session reached more than one, ask which — do not
log all of them as a batch.

## What makes it worth reading later

The decision alone has almost no value in six months. The reasoning does.
Capture:

- **Decision** — what was chosen, in one line.
- **Context** — what forced the choice. The constraint, the bug, the scaling
  limit.
- **Alternatives rejected** — what else was on the table and why it lost. This
  is the part a future session cannot reconstruct from the code.
- **Consequences** — what this now commits the project to, and what it rules
  out.
- **Status** — settled, or provisional and worth revisiting under what
  condition.

Use only what the conversation or the records you actually read support. Do
not invent a rationale to fill out the shape, and do not upgrade a guess into
a stated reason. If the "why" was never established in this session, ask the
user for it rather than fabricating it.

## Write it

1. `search_context` first — if this supersedes an earlier decision, update that
   record and note what changed rather than leaving two contradictory entries
   in the Space.
2. `list_projects` and set `projectId` so the decision lands in the right
   workstream.
3. `manage_document` with a title that states the decision, not the topic:
   "Postgres over schema-per-tenant for isolation", not "Database notes".
4. When the decision bears on a specific task or document, link it with
   `manage_relationship` and a concise rationale for the link itself.

Report back with the `markdownLink`.
