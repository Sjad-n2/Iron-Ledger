const fs = require("node:fs");
const vm = require("node:vm");

const source = fs
  .readFileSync("app.js", "utf8")
  .replace(/\$\("#sessionDate"\)\.value = getStoredValue\(LAST_SESSION_DATE_KEY\);\s*state\.voiceNotes = loadVoiceNotes\(\);\s*bindEvents\(\);\s*renderDashboard\(\);\s*renderParsed\(\[\]\);\s*renderVoiceNotes\(\);\s*setView\("log"\);\s*initAccount\(\);\s*$/, "");

const context = { console };
vm.createContext(context);
vm.runInContext(source, context);
vm.runInContext(
  `
  const testFiles = {
    "Sets_Reps_RIR.md": \`| Date | Exercise | Set | Reps | RIR | Weight | Notes |
|---|---|---|---|---|---|---|
| **2026-06-08** | Lat pulldown | 1 | 8, 5 | 0 | 93kg, 100kg | |
| | Chest Fly | 1 | 8 | 0 | 139kg | |
| **2026-06-10** | Upper back row | 1 | 6 | 1 | 93kg | Breathing issue resolved |
| | Machine shoulder press | 1 | 5 | 0 | 59kg | |\`,
    "Workout_Log.md": \`# Session Log: June 10th, 2026

## Exercises Performed
- Close grip pulldown: 1x5 @ 0 RIR (93kg - Nice form).
- Plate loaded chest press: 1x6 @ 0 RIR (50kg).\`
  };
  const parsed = parseRawNotes(SAMPLE_RAW_NOTES);
  const emptyVault = parseVaultRows(seedFiles);
  const vault = parseVaultRows(testFiles);
  const markdown = rowsToMarkdown(parsed);
  const sessions = getSessions(vault);
  const appended = appendSessionsToWorkoutLog("Before\\n--- START OF NEW SESSION LOG ---", markdown);
  globalThis.result = {
    freshRows: emptyVault.length,
    parsedRows: parsed.length,
    markdownHasCableNote: markdown.includes("Cable pulley difference"),
    vaultRows: vault.length,
    latestDate: getLatestDate(vault),
    totalVolume: Math.round(sumVolume(vault)),
    sessionCount: sessions.length,
    statsRows: filterRowsForStats ? "available" : "missing",
    syncAppendWorks: appended.includes(markdown) && appended.includes("--- START OF NEW SESSION LOG ---")
  };
`,
  context
);

const result = context.result;
const failures = [];

if (result.parsedRows < 9) failures.push("Expected at least 9 parsed raw-note rows.");
if (result.freshRows !== 0) failures.push("Expected fresh app seed data to be empty.");
if (!result.markdownHasCableNote) failures.push("Expected cable pulley note in exported markdown.");
if (result.vaultRows < 6) failures.push("Expected imported markdown rows to parse.");
if (result.latestDate !== "2026-06-10") failures.push("Expected latest seeded vault date to be 2026-06-10.");
if (result.totalVolume <= 0) failures.push("Expected positive non-cable training volume.");
if (result.sessionCount < 2) failures.push("Expected session history grouping to find at least 2 sessions.");
if (result.statsRows !== "available") failures.push("Expected stats filter helpers to be available.");
if (!result.syncAppendWorks) failures.push("Expected pending sync markdown to append after the vault marker.");

console.log(JSON.stringify(result, null, 2));

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
