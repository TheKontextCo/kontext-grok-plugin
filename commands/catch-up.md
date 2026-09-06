---
name: catch-up
description: Rebuild Kontext context for the current repository or a named project before starting work
---

# Catch up

Rebuild the context for the topic the user named — or, with no topic, for the
repository in the current working directory.

1. Establish what "here" is. With no topic, read the repository name and recent
   history (`git log`, `git status`, current branch).
2. Call `get_my_context` for the snapshot of active projects, tasks, documents,
   and Skills. It is bounded — if its counts or truncation metadata indicate
   more, follow up with the list and search tools rather than briefing from a
   partial view.
3. Find the matching workstream. If one project clearly corresponds, use it.
   Otherwise `search_context` on the repository name and the branch or feature
   name.
4. Call `get_timeline` with `scope: "project"` and the project id — this is
   exactly the "what changed, where did I leave off" case the timeline exists
   for. Fall back to `scope: "account"` when no single project matches.
5. Call `list_tasks` for that project to get open work.
6. `read_document` on anything the timeline or search surfaced that looks
   load-bearing — a design note, a decision record, a migration plan.

Then brief the user in a few sentences:

- What this project is and where it stands.
- The open tasks, and which one the current branch appears to be about.
- Decisions or constraints from Kontext that bear on the work ahead.
- Anything in Kontext that no longer matches the code, flagged as a
  discrepancy rather than resolved silently.

The timeline is bounded, best-effort history. It is not an audit log and not
evidence of what the user considers important — present it as "recent
activity", not as priorities.

If the Space has nothing for this repository, say so in one line and offer to
start a project for it. Do not create one unprompted.
