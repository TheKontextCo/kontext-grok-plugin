---
name: status
description: Check that Kontext is connected and show what is in the user's Space
---

# Kontext status

Confirm the connection, then summarise the Space.

1. Call `kontext_status`. It returns the authoritative `accountEmail` for the
   account. Use that value verbatim — never substitute an email from the
   client profile or from this conversation.
2. Call `get_my_context`.

Report, briefly:

- Connected account email.
- Counts of active projects, tasks, documents, and Skills.
- Open tasks, if there are few enough to list usefully.
- Anything marked `readOnly` — those are shared with the account by someone
  else and cannot be edited from here.

If `kontext_status` fails with an authentication or authorization error, the
OAuth grant for this client is missing or revoked. Tell the user to reconnect
the Kontext plugin from Grok Bot Plugins or Cursor Customize; do not attempt
to re-authenticate on their behalf.
