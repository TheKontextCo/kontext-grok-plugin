---
name: recall
description: Search Kontext for prior work, decisions, or notes on a topic
---

# Recall from Kontext

Search the user's Space for the topic they named. If they did not name one,
infer the query from what this session is currently working on — the
repository, the file under discussion, the feature name — and say which query
you used.

1. Call `search_context` with the query. It matches text directly, then follows
   one graph hop, so related work surfaces even when it uses different words.
2. Search returns metadata and document *summaries*, not bodies. When a result
   looks like the answer, call `read_document` for the actual content before
   reporting it.
3. If a record names the conversations it was imported from and the detail
   matters, use `read_conversation` rather than guessing at what the summary
   compressed. `list_conversations` and `list_documents` enumerate what exists
   when the query is too vague for search to rank well.
4. Shared results report `readOnly` and a permission. Say so when you cite one
   — the user may not be able to change it.

Report what you found, grouped by relevance rather than by type. For each item
give the title, what it says, and its `markdownLink` so the user can open it
in their Library.

Treat the relationship paths in the results as explanations of why something
surfaced, not as proof. If a stored record contradicts what the code currently
does, report both and say which is which — do not silently prefer either.

If nothing matches, say so plainly and offer to save the current work instead.
Do not pad the answer with near-misses.
