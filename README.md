# Kontext for Grok Bot

Persistent, portable memory for your work.

Kontext gives Grok Bot a Space of your own — Projects, Tasks, Documents, quick
saves, and reusable Agent Skills — reachable from every MCP client you connect.
A decision recorded in one session is there tomorrow in Cursor, Claude, or
ChatGPT. Nothing is tied to one checkout, one client, or one conversation.

This repository is the Cursor Marketplace plugin Grok Bot’s plugin catalog
searches. It does not run a local server. It points at the hosted Kontext MCP
endpoint and teaches the agent when to use it.

## Install

Once the plugin is listed in the [Cursor Marketplace](https://cursor.com/marketplace):

1. In Grok Bot, open **Plugins**, search for **Kontext**, and add it.
2. When Grok Bot asks you to authorize, finish sign-in in the browser
   (Google or email). The client receives its own revocable OAuth grant.
3. Confirm Kontext appears under **Installed**, then ask the agent to run
   `kontext_status`.

In Cursor, install the same plugin from **Customize**.

No API key, no environment variable, and nothing to run locally. The MCP
server is hosted at `https://thekontextco.ai/mcp`.

Until the listing is public, you can still connect the same endpoint as a
custom MCP URL. Marketplace listing is what makes Kontext searchable in Grok
Bot without pasting that URL.

### Local development

To try this bundle before Marketplace review:

```bash
ln -s /path/to/kontext-grok-plugin ~/.cursor/plugins/local/kontext
```

Then reload Cursor and confirm the Kontext MCP server and skills appear under
**Customize**. Team and Enterprise admins may need to allow local plugin
imports.

## Commands

| Command | What it does |
| --- | --- |
| Catch up | Rebuilds context for the current repository — project state, open tasks, prior decisions — before you start work |
| Recall | Searches your Space for prior work, decisions, or notes on a topic |
| Save | Saves what this session produced, minus anything git already records |
| Log decision | Records a decision with its rationale, rejected alternatives, and consequences |
| Status | Confirms the connection and summarises what is in your Space |

## Automatic use

The bundled skills activate on their own when a session touches something that
outlives it:

- **kontext-context** — retrieve before working, save intentionally, preview
  destructive actions
- **kontext-memory** — what is worth `save_to_kontext`, and what must never be
  saved
- **kontext-tasks** — check what exists → track → update → close → decide
  what’s next
- **kontext-sharing** — `readOnly` boundaries, edit permissions, invitations

They bias toward recalling before inferring, and toward saving only what the
repository cannot already tell you. They will not save secrets, and they will
not delete anything without previewing exactly what would be removed first.

## Tools

The plugin bundles the hosted Kontext MCP server, which provides:

- **Context** — `get_my_context`, `search_context`, `get_timeline`, `kontext_status`
- **Projects** — `list_projects`, `manage_project`
- **Tasks** — `list_tasks`, `manage_task`, `manage_task_relationship`
- **Documents** — `list_documents`, `manage_document`, `read_document`
- **Quick saves** — `save_to_kontext`
- **Skills** — `list_skills`, `get_skill`, `read_skill_file`, `save_skill`, `manage_skill`
- **Imported history** — `list_conversations`, `read_conversation`
- **Relationships** — `manage_context_relationship`
- **Account** — `sign_out`, `request_account_deletion`

Projects, tasks, documents, and quick saves archive without losing metadata,
relationships, revisions, or bodies. Deletion always previews first and
requires explicit confirmation.

## Sharing

Any project, task, document, quick save, or Skill can be shared from the web
Library with up to 20 email addresses at a time, as view or edit access.
Shared records appear in normal MCP results marked with their permission;
Kontext keeps them in the owner's Space rather than copying them.

## Privacy and data

Your Space is yours. Kontext stores what you save to it and nothing else — it
does not read your repository, and it has no access to a session beyond the
tool calls the client makes.

- Account deletion: <https://thekontextco.ai/account>, or the
  `request_account_deletion` tool, which requires two explicit confirmations
  and fresh email verification.
- Privacy policy and support: <https://thekontextco.ai/support>
- Questions, bugs, or plugin feedback: <support@thekontextco.ai>

## Publish

This repo is the public plugin bundle. After the files are on `main`, submit
the repository at [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish)
for Cursor review. Grok Bot’s searchable catalog is that marketplace.

## Links

- Product: <https://thekontextco.ai>
- Library: <https://thekontextco.ai/library>
- Developer guide: <https://thekontextco.ai/developers>
- MCP server card: <https://thekontextco.ai/mcp/server-card>
- Official skills: <https://github.com/TheKontextCo/kontext-skills>
- Claude Code plugin: <https://github.com/TheKontextCo/kontext-claude-plugin>

## License

MIT — see [LICENSE](LICENSE).
