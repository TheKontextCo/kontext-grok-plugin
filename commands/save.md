---
name: save
description: Save what this session produced to Kontext so a later session can pick it up
---

# Save to Kontext

Save what the user named — or, with no topic, whatever this session produced
that is worth keeping.

## Decide what to save

With no topic, pick out the durable things from the session:

- Decisions, with the rationale and the alternatives that were rejected.
- Constraints discovered the hard way — a rate limit, an ordering requirement,
  a name that cannot change without a migration.
- Open threads: the follow-up not done, the test skipped and why.

Leave out what git already records: the diff, the file layout, the commit
message. A memory that duplicates the tree only goes stale.

Never save secrets — tokens, keys, credentials, customer data. Save the shape,
not the value. If the user's instruction would sweep a secret in, save the rest
and say what you left out.

## Pick the right record

- `save_to_kontext` — the default for a standalone note. Do not make the user
  categorise it first.
- `manage_document` — long-form output they will come back to.
- `manage_task` — a real action item, with status.
- `manage_project` — only when a genuinely new workstream is starting.

Before creating anything, `search_context` for an existing record on the same
subject and `list_projects` for the owning project. Updating the existing
record beats filing a near-duplicate.

## Anchor it

A Kontext Space is read from every client the user connects, not just this
checkout. Name the repository. Name files and symbols rather than line
numbers, which drift.

Set `projectId` when the work belongs to a project. Add `source` and time
fields when the provenance matters — they let a future session tell fresh from
stale.

## Confirm

Show the user what you saved, using the `markdownLink` each tool returns so
the title links to its permanent Library page. If you deliberately left
something out, say what and why.
