---
title: "Building Git Archaeologist: A RAG System for Git History, in Java"
description: "How I built an AI-powered Q&A tool over commit history — and what I actually learned about RAG along the way."
pubDate: 2026-07-16
tags: ["rag", "java", "spring-boot", "pgvector", "llm", "projects"]
---

*How I built an AI-powered Q&A tool over commit history — and what I actually learned about RAG along the way.*

## The idea

Every codebase has a story buried in its commit history — why a feature was added, when a dependency got swapped out, what tradeoffs got made under deadline pressure. That story is usually accessible only through `git log`, `git blame`, and a lot of patience.

I wanted to ask questions instead of searching for them. Something like:

- *"Why was Redis caching added to this project?"*
- *"What commits touched the authentication logic?"*
- *"Who has made the most changes to this file?"*

That's the seed of **Git Archaeologist**: a system that clones a repo, indexes its commit history, and answers natural-language questions about it — grounded in real commits, with citations back to actual commit hashes.

The original idea was bigger — a full knowledge graph linking commits to PRs, issues, discussions, and code architecture, able to answer things like *"who introduced this bug"* or *"which engineer understands authentication."* I deliberately scoped that down. Building the smaller, provable version first mattered more than chasing the ambitious one and shipping nothing.

## Why Java, not Python

Most RAG tutorials live in Python — LangChain, PyDriller, Chroma, sentence-transformers. I build backend systems in Java and Spring Boot for a living, so I built this in Java instead, on purpose.

The ecosystem is thinner, but not missing:

| Concern | Tool |
|---|---|
| Git mining | **JGit** — Eclipse's pure-Java git implementation |
| Storage + vectors | **PostgreSQL + pgvector** |
| Embeddings | **OpenAI API** (`text-embedding-3-small`) |
| Answer generation | **Gemini 2.5 Flash** |
| App framework | **Spring Boot** |

Using Postgres for both relational data and vector search turned out to be a genuine advantage, not just a familiarity shortcut — commit metadata and embeddings live in the same table, so I never need to join across two different databases to answer a query.

## How it actually works

### 1. Extraction

`GitExtractionService` clones a target repo with JGit and walks its full commit history using `RevWalk`. For each commit, I diff it against its parent to get the list of changed files, then persist hash, author, date, message, and a diff summary into Postgres. Re-running extraction is idempotent — a uniqueness constraint on `(repoName, commitHash)` means already-indexed commits get skipped instead of duplicated.

Merge commits get special handling — or rather, special *exclusion*. A merge commit has more than one parent, and diffing against only the first parent (which is what a naive implementation does) produces a diff that silently ignores whatever the second parent's branch contributed. Rather than build proper multi-parent diff handling for a v1, I flag merge commits and exclude them from the next stage entirely.

### 2. Filtering, then embedding

Not every commit deserves a place in the vector index. Before embedding, I filter out:

- Merge commits (unreliable diffs, no independent intent)
- Trivial messages — "wip", "fix typo", "update readme"
- Bot commits (dependabot, renovate, CI bots)
- Version bump commits

This isn't about deleting data — every commit still lives in Postgres for completeness. It's about keeping the *searchable* index clean. A vector index full of "wip" and "fix typo" doesn't help anyone; it just adds noise that dilutes retrieval quality for the commits that actually explain *why* something happened.

For what gets embedded, I concatenate the commit message with the list of changed files — not the diff itself. The diff, in my current implementation, is a compact per-file summary (`MODIFY: path/a.py -> path/a.py`), not real code content, so it adds no semantic signal an embedding model could use. Message + files is a stronger, cleaner signal for a question like *"why was caching added."*

### 3. Retrieval and generation

When a question comes in, I embed it with the same model used for the commits — `text-embedding-3-small` — because query and stored vectors have to live in the same vector space to be comparable at all. I run a similarity search in pgvector, filtered to the target repo, and take the top-k most relevant commits.

Those commits — hash, message, files changed — get assembled into a prompt alongside the original question, with an explicit instruction: answer only from what's provided, and cite the commit hash for anything used. That prompt goes to Gemini 2.5 Flash, which generates the final answer.

The citations aren't a magic LLM feature — they work because the actual hashes are sitting right there in the prompt's context. The model isn't inventing them; it's referencing what it was handed.

## What I'd change with more time

Being honest about the gaps is more useful than pretending they don't exist:

- **No hard guardrail against hallucination beyond the prompt instruction.** Right now, if retrieval comes back irrelevant, I rely on the LLM following instructions and saying it doesn't know. A more robust version would add a similarity-distance threshold *before* the LLM call — if nothing retrieved is actually close to the question, short-circuit and return "no relevant history found" deterministically, instead of trusting the model's compliance.
- **Extraction is synchronous.** A `POST /extract` call blocks until the entire repo is walked. Fine for a few thousand commits; not fine for something the size of the Linux kernel. The real fix is decoupling the request from the work — publish the job to a queue, process it asynchronously, and let the client poll or subscribe for status.
- **No formal evaluation.** I've tested it against questions I know the answers to, but there's no labeled set of question/expected-commit pairs I run systematically to catch regressions when I change the prompt or swap models.

None of these are surprises — they're the natural next layer once the core loop proves out. That's the point of scoping a v1 tightly: you find out what's actually worth building next by using the thing, not by guessing upfront.

## What building this actually taught me

The mechanics of RAG are simple to describe and easy to get subtly wrong. Embedding the wrong text, retrieving too little or too much context, trusting a prompt instruction to do what a code-level guardrail should — these aren't exotic mistakes, they're the default failure modes if you don't think carefully about each stage.

The other lesson was about scope. It's tempting to build the full knowledge graph — commits, PRs, issues, code structure, ownership — all at once. Cutting that down to "can I answer a real question from commit history, with a citation I can trust" first meant I had something working in days instead of a half-finished graph database months later.

---

*Git Archaeologist is a work in progress — Phase 1 through 3 are done: extraction, filtered embedding, and RAG-based Q&A with citations. Code structure parsing (AST) and blame-based bug tracing are next, if the current version keeps proving useful.*
