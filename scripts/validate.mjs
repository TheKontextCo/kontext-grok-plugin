#!/usr/bin/env node
import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

function fail(message) {
  errors.push(message);
}

function requireFrontmatter(name, text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    fail(`${name} is missing YAML frontmatter`);
    return;
  }
  if (!/^name:\s+\S+/m.test(match[1])) fail(`${name} is missing frontmatter name`);
  if (!/^description:\s+\S+/m.test(match[1])) {
    fail(`${name} is missing frontmatter description`);
  }
}

const plugin = JSON.parse(await readFile(join(root, ".cursor-plugin/plugin.json"), "utf8"));
if (!/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(plugin.name)) {
  fail(`plugin name must be kebab-case: ${plugin.name}`);
}
for (const field of ["description", "version", "license", "logo"]) {
  if (!plugin[field]) fail(`plugin.json is missing ${field}`);
}
if (!plugin.author?.name) fail("plugin.json is missing author.name");

const mcp = JSON.parse(await readFile(join(root, "mcp.json"), "utf8"));
const server = mcp.mcpServers?.kontext;
if (!server?.url) fail("mcp.json must declare mcpServers.kontext.url");
if (server.url !== "https://thekontextco.ai/mcp") {
  fail(`unexpected MCP url: ${server.url}`);
}
if (server.headers || server.env) {
  fail("mcp.json must not ship secrets or auth headers");
}

const expectedSkills = [
  "kontext-context",
  "kontext-memory",
  "kontext-sharing",
  "kontext-tasks",
];
const skillDirs = (await readdir(join(root, "skills"), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
if (JSON.stringify(skillDirs) !== JSON.stringify(expectedSkills)) {
  fail(`skills/ should contain ${expectedSkills.join(", ")}; found ${skillDirs.join(", ")}`);
}
for (const skill of skillDirs) {
  requireFrontmatter(
    `skills/${skill}/SKILL.md`,
    await readFile(join(root, "skills", skill, "SKILL.md"), "utf8"),
  );
}

const expectedCommands = [
  "catch-up.md",
  "log-decision.md",
  "recall.md",
  "save.md",
  "status.md",
];
const commands = (await readdir(join(root, "commands"))).sort();
if (JSON.stringify(commands) !== JSON.stringify(expectedCommands)) {
  fail(`commands/ mismatch: ${commands.join(", ")}`);
}
for (const command of commands) {
  requireFrontmatter(
    `commands/${command}`,
    await readFile(join(root, "commands", command), "utf8"),
  );
}

await readFile(join(root, plugin.logo));
await readFile(join(root, "LICENSE"), "utf8");
await readFile(join(root, "README.md"), "utf8");

if (errors.length) {
  console.error(errors.map((error) => `error: ${error}`).join("\n"));
  process.exit(1);
}

console.log("kontext-grok-plugin: ok");
