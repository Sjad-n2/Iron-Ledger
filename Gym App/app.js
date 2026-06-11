const SAMPLE_RAW_NOTES = `Unilateral preacher curl right arm 27kg: 1x6 0rir
Left arm 1x6 0 RIR

Lat pulldown 100kg 1x5 0 RIR last rep was bad form, maybe put in notes to regress to 93kg

Close grip pulldown 93kg 1x 5 nice form

Upper back row got the breathin problem sorted 93kg 1x6 1rir

Chest fly 139kg 1x8 0rir

Plate loaded chest press 1x6 50kg 0rir

unilateral tricep pushdown cuffed 47.5kg (leftmost cables put this in notes) right arm 1x6 0rir, left arm 1x6 0rir

Cuffed lat raise 27.5kg unilateral right arm 1x4 0 RIR left arm 1x3 sent to failure on 4th rep

Cuffed reverse curl 37.5kg left arm 1x4 0rir right arm 1x4 0 RIR

Also please note for all cable exercises the weights are different than the cable I was using last session because of pulley difference; don't calculate the volume in this session and put this in the notes of tricep extension, lat raise, and reverse curl.

Machine shoulder press 59kg 1x5 0rir`;

const seedFiles = {
  "Workout_Log.md": `# Session Log: June 8th, 2026 (Initial Workout)

## Exercises Performed
- Lat pulldown: Started with a lighter weight/higher rep set and progressed to a heavier single set.
- Close grip pulldown: Single controlled set completed at specified weight.
- Kelso shrugs: One set recorded for traps work.
- Rear delt fly: Single set recorded for rear delts.
- Chest fly: Core chest movement logged (139kg).
- Plate loaded chest press upper chest focus: Controlled single set.
- Pin loaded shoulder press: Standard pressing volume captured.
- Unilateral preacher curl: Volume tracked for both arms with specific weights/reps maintained across the session.
- Tricep Extension unilateral: Volume tracked for both arms with specific weights/reps maintained across the session.

---

# Session Log: June 10th, 2026 (Second Workout)

## Exercises Performed
- Unilateral preacher curl (Right arm): 1x6 @ 0 RIR (27kg). Left arm: 1x6 @ 0 RIR.
- Lat pulldown: 1x5 @ 0 RIR (100kg - Form was noted as poor, recommend regressing to 93kg).
- Close grip pulldown: 1x5 @ 0 RIR (93kg - Nice form).
- Upper back row: 1x6 @ 1 RIR (93kg - Breathing issue resolved).
- Chest fly: 1x8 @ 0 RIR (139kg).
- Plate loaded chest press: 1x6 @ 0 RIR (50kg).
- Unilateral tricep pushdown (Left arm): 1x6 @ 0 RIR (47.5kg), Right arm: 1x6 @ 0 RIR (47.5kg).
- Cuffed lat raise (Right arm): 1x4 @ 0 RIR (27.5kg, Left arm: 1x3 to failure on rep 4).
- Cuffed reverse curl (Left arm): 1x4 @ 0 RIR (37.5kg).
- Cuffed reverse curl (Right arm): 1x4 @ 0 RIR (37.5kg).
- Machine shoulder press: 1x5 @ 0 RIR (59kg).

## Cable Weight Note
* Important note on cable weights: The weights used for all cable exercises (Lat Raise, Reverse Curl, Tricep Pushdown) were different from previous sessions due to pulley differences. Please **do not calculate volume** for these specific movements in future statistics. Note the actual weight used in the RIR log instead.

--- START OF NEW SESSION LOG ---`,
  "Sets_Reps_RIR.md": `# Sets, Reps, and RIR

| Date       | Exercise                                  | Set | Reps  | RIR | Weight      | Notes |
|-------------|-------------------------------------------|-----|-------|-----|-------------|-------|
| **2026-06-08** | Lat pulldown                             | 1   | 8, 5  | 0   | 93kg, 100kg |       |
|             | Close grip pulldown                      | 1   | 5     | 0   | 93kg        |       |
|             | Kelso shrugs                            | 1   | 5     | 0   | 100kg       |       |
|             | Rear delt fly                           | 1   | 5     | 0   | 100kg       |       |
|             | Chest Fly                                | 1   | 8     | 0   | 139kg       |       |
|             | Plate loaded chest press upper chest focus | 1   | 4     | 0   | 50kg        |       |
|             | Pin loaded shoulder press               | 1   | 6     | 0   | 59kg        |       |
|             | Unilateral preacher curl (L/R)          | 1   | 4 / 5 | 0   | 27kg        |       |
|             | Tricep Extension unilateral (L/R)       | 1   | 4 / 5 | 0   | 23kg        |       |
| **2026-06-10** | Unilateral preacher curl (L/R)          | 1   | 6     | 0   | 27kg        |       |
|             | Lat pulldown                            | 1   | 5     | 0   | 100kg       |       |
|             | Close grip pulldown                    | 1   | 5     | 0   | 93kg        |       |
|             | Upper back row                         | 1   | 6     | 1   | 93kg        | Breathing issue resolved |
|             | Chest fly                               | 1   | 8     | 0   | 139kg       |       |
|             | Plate loaded chest press               | 1   | 6     | 0   | 50kg        |       |
|             | Unilateral tricep pushdown (L/R)       | 1   | 6 / 6 | 0   | 47.5kg      |       |
|             | Cuffed lat raise (Right arm): L/R      | 1   | 4 / 3 | 0   | 27.5kg      |       |
|             | Cuffed reverse curl (L/R)              | 1   | 4     | 0   | 37.5kg      |       |
|             | Machine shoulder press                 | 1   | 5     | 0   | 59kg        |       |`,
  "Notes_For_Next_Session.md": `# Notes For Next Session

## Focus Goals
* **Lat Pulldown:** Do not undershoot the weight. Start the first working set at **100kg** to ensure adequate load and progression focus.
* **Upper Back Alternative:** Try to find an upper back row alternative for Lat Pulldowns, such as bar row or cable row.
* **New Focus:** Incorporate **Cuffed Lateral Raise** and **Cuffed Reverse Curl** into the next session's plan.`,
  "Workout_Statistics.md": `## Important Note on Cable Weights
The weights used for cable exercises (Lat Raise, Reverse Curl, Tricep Pushdown) are excluded from volume calculations.`
};

const STORAGE_KEY = "iron-ledger-local-sessions";
const VOICE_NOTES_KEY = "iron-ledger-voice-notes";
const MAX_IMPORT_FILES = 20;
const MAX_IMPORT_BYTES = 2 * 1024 * 1024;
const SESSION_MARKER = "--- START OF NEW SESSION LOG ---";
const cableExercises = ["lat raise", "lateral raise", "reverse curl", "pushdown", "tricep extension", "tricep pushdown"];
const muscleMap = [
  ["Chest", ["chest fly", "chest press", "plate loaded chest press", "press upper chest"]],
  ["Back", ["lat pulldown", "close grip pulldown", "upper back row", "row"]],
  ["Shoulders", ["shoulder press", "lat raise", "lateral raise"]],
  ["Biceps", ["preacher curl", "reverse curl", "curl"]],
  ["Triceps", ["tricep", "pushdown", "extension"]],
  ["Rear Delts", ["rear delt"]],
  ["Traps", ["kelso", "shrug"]]
];

const state = {
  files: { ...seedFiles },
  rows: [],
  localSessions: [],
  voiceNotes: [],
  recognition: null,
  voiceDraft: "",
  voiceInterim: "",
  voiceSaved: false,
  isListening: false,
  vaultDirHandle: null,
  parsed: [],
  selectedHistoryDate: null
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function cleanText(value) {
  return String(value || "")
    .replace(/\*\*/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/[^\S\r\n]+/g, " ")
    .trim();
}

function normaliseExercise(name) {
  return cleanText(name)
    .replace(/\(.*?\)/g, "")
    .replace(/:.*$/, "")
    .replace(/\b(left|right|arm|unilateral|cuffed)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getMuscleGroup(exercise) {
  const lower = exercise.toLowerCase();
  const match = muscleMap.find(([, terms]) => terms.some((term) => lower.includes(term)));
  return match ? match[0] : "Other";
}

function isCableExcluded(exercise, notes = "") {
  const text = `${exercise} ${notes}`.toLowerCase();
  return cableExercises.some((term) => text.includes(term));
}

function parseReps(value) {
  return String(value || "")
    .split(/[,\s/]+/)
    .map((part) => Number(part.replace(/[^\d.]/g, "")))
    .filter(Number.isFinite);
}

function parseWeight(value) {
  const match = String(value || "").match(/(\d+(?:\.\d+)?)\s*kg/i);
  return match ? Number(match[1]) : null;
}

function dateLabel(dateValue) {
  if (!dateValue || dateValue === "Unknown") return "Unknown date";
  const [year, month, day] = dateValue.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function todayIso() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function parseVaultRows(files) {
  const tableRows = [];
  Object.entries(files).forEach(([fileName, table]) => {
    let activeDate = "";

    table.split(/\r?\n/).forEach((line) => {
      if (!line.trim().startsWith("|") || line.includes("---") || line.includes("Exercise")) return;
      const cells = line.split("|").slice(1, -1).map((cell) => cleanText(cell));
      if (cells.length < 6) return;
      const dateMatch = cells[0].match(/\d{4}-\d{2}-\d{2}/);
      if (dateMatch) activeDate = dateMatch[0];
      const exercise = normaliseExercise(cells[1]);
      if (!exercise) return;
      const reps = parseReps(cells[3]);
      const weight = parseWeight(cells[5]);
      const rir = Number((cells[4].match(/\d+/) || [0])[0]);
      const notes = cells[6] || "";
      tableRows.push({
        id: `vault-${fileName}-${activeDate}-${tableRows.length}`,
        source: "Vault",
        date: activeDate || "Unknown",
        sessionName: fileName.replace(/\.(md|txt)$/i, "") || "Vault session",
        exercise,
        muscle: getMuscleGroup(exercise),
        set: Number(cells[2]) || 1,
        reps,
        rir,
        weight,
        notes,
        excluded: isCableExcluded(exercise, notes)
      });
    });
  });

  return tableRows;
}

function getLocalStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function loadLocalSessions() {
  const storage = getLocalStorage();
  if (!storage) return [];
  try {
    return JSON.parse(storage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveLocalSessions(sessions) {
  const storage = getLocalStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

function loadVoiceNotes() {
  const storage = getLocalStorage();
  if (!storage) return [];
  try {
    return JSON.parse(storage.getItem(VOICE_NOTES_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveVoiceNotes(notes) {
  const storage = getLocalStorage();
  if (!storage) return;
  storage.setItem(VOICE_NOTES_KEY, JSON.stringify(notes.slice(0, 20)));
}

function rowsFromLocalSessions(sessions) {
  return sessions.flatMap((session) =>
    session.rows.map((row, index) => ({
      ...row,
      id: `${session.id}-${index}`,
      source: "Local",
      date: session.date,
      sessionName: session.name || "Logged session",
      synced: Boolean(session.synced),
      muscle: row.muscle || getMuscleGroup(row.exercise),
      reps: Array.isArray(row.reps) ? row.reps : [Number(row.reps)].filter(Number.isFinite),
      set: row.set || 1,
      excluded: row.excluded ?? isCableExcluded(row.exercise, row.notes)
    }))
  );
}

function refreshRows() {
  state.localSessions = loadLocalSessions();
  state.rows = [...parseVaultRows(state.files), ...rowsFromLocalSessions(state.localSessions)];
  return state.rows;
}

function getPendingSessions() {
  return loadLocalSessions().filter((session) => !session.synced);
}

function updateSyncStatus() {
  const pending = getPendingSessions();
  const title = pending.length
    ? `${pending.length} pending session${pending.length === 1 ? "" : "s"}`
    : "No pending sessions";
  const status = pending.length
    ? "Pending sessions are safe in this browser. Sync to a chosen vault or download a bundle."
    : "Saved sessions stay in this browser until you sync or export them.";
  $("#syncQueueTitle").textContent = title;
  $("#syncQueueStatus").textContent = status;
  $("#syncVaultButton").disabled = !pending.length;
  $("#downloadSyncButton").disabled = !pending.length;
}

function getLatestDate(rows) {
  return rows.map((row) => row.date).filter(Boolean).sort().at(-1) || "Unknown";
}

function rowVolume(row, includeExcluded = false) {
  if (!includeExcluded && row.excluded) return 0;
  const reps = row.reps.reduce((sum, value) => sum + value, 0);
  return (row.weight || 0) * reps;
}

function rowTopSet(row, includeExcluded = false) {
  if (!includeExcluded && row.excluded) return 0;
  return (row.weight || 0) * Math.max(...row.reps, 0);
}

function rowReps(row, includeExcluded = false) {
  if (!includeExcluded && row.excluded) return 0;
  return row.reps.reduce((sum, value) => sum + value, 0);
}

function metricValue(row, metric, includeExcluded = false) {
  if (metric === "topSet") return rowTopSet(row, includeExcluded);
  if (metric === "reps") return rowReps(row, includeExcluded);
  return rowVolume(row, includeExcluded);
}

function sumVolume(rows, date = null, includeExcluded = false) {
  return rows
    .filter((row) => !date || row.date === date)
    .reduce((total, row) => total + rowVolume(row, includeExcluded), 0);
}

function volumeByMuscle(rows, date = null, includeExcluded = false) {
  return rows
    .filter((row) => !date || row.date === date)
    .reduce((acc, row) => {
      acc[row.muscle] = (acc[row.muscle] || 0) + rowVolume(row, includeExcluded);
      return acc;
    }, {});
}

function getSessions(rows) {
  const grouped = rows.reduce((acc, row) => {
    const key = row.date;
    acc[key] ||= {
      date: key,
      title: row.sessionName || "Workout",
      rows: [],
      source: row.source
    };
    acc[key].rows.push(row);
    if (row.source === "Local") acc[key].source = "Local";
    if (row.sessionName && row.sessionName !== "Vault session") acc[key].title = row.sessionName;
    return acc;
  }, {});

  return Object.values(grouped).sort((a, b) => b.date.localeCompare(a.date));
}

function filterRowsForStats(rows) {
  const range = $("#statsRange")?.value || "all";
  const muscle = $("#statsMuscle")?.value || "all";
  const exercise = $("#statsExercise")?.value || "all";
  const sessions = getSessions(rows);
  const allowedDates =
    range === "latest"
      ? sessions.slice(0, 1).map((session) => session.date)
      : range === "last2"
        ? sessions.slice(0, 2).map((session) => session.date)
        : range === "last4"
          ? sessions.slice(0, 4).map((session) => session.date)
          : null;

  return rows.filter((row) => {
    if (allowedDates && !allowedDates.includes(row.date)) return false;
    if (muscle !== "all" && row.muscle !== muscle) return false;
    if (exercise !== "all" && row.exercise !== exercise) return false;
    return true;
  });
}

function extractFlags(files, rows) {
  const log = files["Workout_Log.md"] || "";
  const stats = files["Workout_Statistics.md"] || "";
  const flags = [];
  const candidates = [...log.split(/\r?\n/), ...stats.split(/\r?\n/)]
    .map(cleanText)
    .filter(Boolean)
    .filter((line) => /bad form|regress|breath|pulley|cable|do not calculate|failure|resolved/i.test(line));

  candidates.forEach((line) => {
    if (!flags.includes(line)) flags.push(line);
  });

  rows.filter((row) => row.notes).forEach((row) => {
    const note = `${row.exercise}: ${row.notes}`;
    if (!flags.includes(note)) flags.push(note);
  });

  return flags.slice(0, 8);
}

function extractFocus(files) {
  const notes = files["Notes_For_Next_Session.md"] || "";
  return notes
    .split(/\r?\n/)
    .map(cleanText)
    .filter((line) => line.startsWith("*") || line.startsWith("-"))
    .map((line) => line.replace(/^[-*]\s*/, ""))
    .filter(Boolean);
}

function renderDashboard() {
  const rows = refreshRows();
  const latest = getLatestDate(rows);
  const latestRows = rows.filter((row) => row.date === latest);
  const avgRir = latestRows.length
    ? latestRows.reduce((sum, row) => sum + row.rir, 0) / latestRows.length
    : 0;
  const flags = extractFlags(state.files, rows);

  $("#latestDate").textContent = latest;
  $("#latestCount").textContent = `${latestRows.length} exercises tracked`;
  $("#workingSets").textContent = latestRows.reduce((sum, row) => sum + (row.set || 1), 0);
  $("#rirAverage").textContent = `${avgRir.toFixed(1)} avg RIR`;
  $("#flagCount").textContent = flags.length;
  $("#weeklyVolume").textContent = `${Math.round(sumVolume(rows)).toLocaleString()}kg`;
  $("#sessionSubtitle").textContent = `Latest tracked session: ${latest}`;

  renderVolumeChart("#volumeChart", volumeByMuscle(rows, latest), "kg");
  renderRirChart("#rirChart", latestRows);
  renderRecentSessions(getSessions(rows).slice(0, 5));
  renderList($("#flagList"), flags.length ? flags : ["No current form or calculation flags found."]);
  renderList($("#focusList"), extractFocus(state.files));
  renderList($("#ruleList"), [
    "Cable exercises can be excluded from volume when pulley differences make weights incomparable.",
    "RIR is tracked per working set and surfaced as a session effort signal.",
    "Saved parser sessions live in this browser's local storage until you clear site data."
  ]);
  populateStatsFilters(rows);
  renderStats();
  renderHistory();
  renderExercises(rows);
  updateSyncStatus();
}

function renderVolumeChart(selector, data, unit = "") {
  const chart = $(selector);
  if (!chart) return;
  const entries = Object.entries(data).filter(([, value]) => value > 0).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, value]) => value), 1);
  chart.innerHTML = entries.length
    ? entries
        .map(([label, value]) => `
          <div class="bar-row">
            <span>${escapeHtml(label)}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${Math.max(4, (value / max) * 100)}%"></div></div>
            <span>${Math.round(value).toLocaleString()}${unit}</span>
          </div>
        `)
        .join("")
    : `<p class="empty-state">No matching data.</p>`;
}

function renderTimeline(rows, metric, includeExcluded) {
  const chart = $("#timelineChart");
  const sessions = getSessions(rows).sort((a, b) => a.date.localeCompare(b.date));
  const values = sessions.map((session) =>
    session.rows.reduce((sum, row) => sum + metricValue(row, metric, includeExcluded), 0)
  );
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const width = 680;
  const height = 220;
  const points = values.map((value, index) => {
    const x = values.length === 1 ? width / 2 : (index / (values.length - 1)) * width;
    const y = height - ((value - min) / (max - min || 1)) * (height - 34) - 18;
    return { x, y, value, date: sessions[index]?.date || "" };
  });
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");

  chart.innerHTML = points.length
    ? `
      <svg class="sparkline tall" viewBox="0 0 ${width} ${height}" role="img" aria-label="Session timeline">
        <line x1="0" y1="${height - 10}" x2="${width}" y2="${height - 10}" stroke="#303941" />
        <path d="${path}" fill="none" stroke="#8fdc92" stroke-width="4" stroke-linecap="round" />
        ${points.map((point) => `<circle cx="${point.x}" cy="${point.y}" r="5" fill="#8fdc92" />`).join("")}
      </svg>
      <div class="axis-labels">${points.map((point) => `<span>${escapeHtml(point.date.slice(5))}</span>`).join("")}</div>
    `
    : `<p class="empty-state">No matching timeline data.</p>`;
}

function renderRirChart(selector, rows) {
  const counts = rows.reduce((acc, row) => {
    const key = `${row.rir} RIR`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const entries = Object.entries(counts).sort();
  const max = Math.max(...entries.map(([, value]) => value), 1);
  $(selector).innerHTML = entries.length
    ? entries
        .map(([label, value]) => `
          <div class="rir-row">
            <span>${escapeHtml(label)}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${(value / max) * 100}%"></div></div>
            <span>${value}</span>
          </div>
        `)
        .join("")
    : `<p class="empty-state">No RIR data.</p>`;
}

function renderList(target, items) {
  if (!target) return;
  target.innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function populateStatsFilters(rows) {
  const muscleSelect = $("#statsMuscle");
  const exerciseSelect = $("#statsExercise");
  if (!muscleSelect || !exerciseSelect) return;
  const previousMuscle = muscleSelect.value || "all";
  const previousExercise = exerciseSelect.value || "all";
  const muscles = ["all", ...new Set(rows.map((row) => row.muscle).sort())];
  const exercises = ["all", ...new Set(rows.map((row) => row.exercise).sort())];
  muscleSelect.innerHTML = muscles.map((muscle) => `<option value="${escapeAttr(muscle)}">${muscle === "all" ? "All muscles" : escapeHtml(muscle)}</option>`).join("");
  exerciseSelect.innerHTML = exercises.map((exercise) => `<option value="${escapeAttr(exercise)}">${exercise === "all" ? "All exercises" : escapeHtml(exercise)}</option>`).join("");
  muscleSelect.value = muscles.includes(previousMuscle) ? previousMuscle : "all";
  exerciseSelect.value = exercises.includes(previousExercise) ? previousExercise : "all";
}

function renderStats() {
  const rows = refreshRows();
  const filteredRows = filterRowsForStats(rows);
  const metric = $("#statsMetric")?.value || "volume";
  const includeExcluded = $("#includeCable")?.checked || false;
  const unit = metric === "reps" ? " reps" : metric === "topSet" ? "kg" : "kg";
  const label = metric === "reps" ? "total reps" : metric === "topSet" ? "top set load" : "volume";
  const breakdown = filteredRows.reduce((acc, row) => {
    acc[row.muscle] = (acc[row.muscle] || 0) + metricValue(row, metric, includeExcluded);
    return acc;
  }, {});

  $("#timelineTitle").textContent = `Session ${label}`;
  renderTimeline(filteredRows, metric, includeExcluded);
  renderVolumeChart("#statsBreakdown", breakdown, unit);
  renderRirChart("#statsRir", filteredRows);
}

function renderRecentSessions(sessions) {
  const target = $("#recentSessions");
  target.innerHTML = sessions
    .map((session) => sessionCard(session, true))
    .join("");
}

function renderHistory() {
  const rows = refreshRows();
  const sessions = getSessions(rows);
  const query = ($("#historySearch")?.value || "").toLowerCase();
  const filtered = sessions.filter((session) => {
    const text = `${session.date} ${session.title} ${session.rows.map((row) => row.exercise).join(" ")}`.toLowerCase();
    return text.includes(query);
  });
  const selected = filtered.find((session) => session.date === state.selectedHistoryDate) || filtered[0];
  state.selectedHistoryDate = selected?.date || null;

  $("#historyList").innerHTML = filtered.length
    ? filtered.map((session) => sessionCard(session, false, session.date === state.selectedHistoryDate)).join("")
    : `<p class="empty-state">No sessions match that filter.</p>`;
  renderHistoryDetail(selected);
}

function sessionCard(session, compact = false, active = false) {
  const volume = Math.round(sumVolume(session.rows));
  const setCount = session.rows.reduce((sum, row) => sum + (row.set || 1), 0);
  const muscles = [...new Set(session.rows.map((row) => row.muscle))].slice(0, 4);
  const syncLabel = session.source === "Local" ? (session.rows.some((row) => row.synced) ? "synced" : "pending") : "vault";
  return `
    <button class="session-card ${active ? "active" : ""}" data-history-date="${escapeAttr(session.date)}" type="button">
      <span>
        <strong>${escapeHtml(dateLabel(session.date))}</strong>
        <small>${escapeHtml(session.title)}</small>
      </span>
      <span class="session-meta">
        <span>${session.rows.length} lifts</span>
        <span>${setCount} sets</span>
        <span>${volume.toLocaleString()}kg</span>
        <span>${syncLabel}</span>
      </span>
      ${compact ? "" : `<span class="exercise-meta">${muscles.map((muscle) => `<span class="mini-chip">${escapeHtml(muscle)}</span>`).join("")}</span>`}
    </button>
  `;
}

function renderHistoryDetail(session) {
  if (!session) {
    $("#historyDetailTitle").textContent = "Select a session";
    $("#historyDetail").innerHTML = `<p class="empty-state">No session selected.</p>`;
    return;
  }
  $("#historyDetailTitle").textContent = dateLabel(session.date);
  const volume = Math.round(sumVolume(session.rows));
  $("#historyDetail").innerHTML = `
    <div class="detail-summary">
      <span><strong>${session.rows.length}</strong><small>Exercises</small></span>
      <span><strong>${volume.toLocaleString()}kg</strong><small>Volume</small></span>
      <span><strong>${escapeHtml(session.source)}</strong><small>Source</small></span>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Muscle</th>
            <th>Weight</th>
            <th>Reps</th>
            <th>RIR</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          ${session.rows.map(rowTableHtml).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderExercises(rows) {
  const target = $("#exerciseList");
  const search = ($("#exerciseSearch").value || "").toLowerCase();
  const grouped = rows.reduce((acc, row) => {
    const key = row.exercise;
    acc[key] ||= { ...row, sessions: new Set(), best: 0, volume: 0 };
    acc[key].sessions.add(row.date);
    acc[key].best = Math.max(acc[key].best, rowTopSet(row, true));
    acc[key].volume += rowVolume(row, false);
    return acc;
  }, {});

  target.innerHTML = Object.values(grouped)
    .filter((item) => item.exercise.toLowerCase().includes(search) || item.muscle.toLowerCase().includes(search))
    .sort((a, b) => a.exercise.localeCompare(b.exercise))
    .map((item) => `
      <article class="exercise-card">
        <strong>${escapeHtml(item.exercise)}</strong>
        <div class="exercise-meta">
          <span class="mini-chip">${escapeHtml(item.muscle)}</span>
          <span class="mini-chip">${item.sessions.size} sessions</span>
          <span class="mini-chip">Top ${Math.round(item.best)}kg-reps</span>
          <span class="mini-chip">${Math.round(item.volume).toLocaleString()}kg volume</span>
          ${item.excluded ? '<span class="mini-chip">volume excluded</span>' : ""}
        </div>
      </article>
    `)
    .join("");
}

function parseRawNotes(text) {
  const cableNote = /pulley|different than.*cable|don't calculate|don.t calculate|do not calculate/i.test(text);
  const blocks = text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
  const rows = [];

  blocks.forEach((block) => {
    if (/also please note|all cable exercises/i.test(block)) return;
    const compact = cleanText(block);
    const weight = parseWeight(compact);
    const setRep = compact.match(/(\d+)\s*x\s*(\d+)/i) || compact.match(/1x\s*(\d+)/i);
    const rirMatch = compact.match(/(\d+)\s*rir/i);
    const splitName = compact.split(/\d+(?:\.\d+)?\s*kg|(\d+)\s*x/i)[0] || compact;
    let exercise = normaliseExercise(splitName);
    if (/^left arm/i.test(exercise) && rows.length) exercise = `${rows.at(-1).exercise} (Left arm)`;
    if (/right arm/i.test(compact) && !/left arm/i.test(compact)) exercise = `${exercise} (Right arm)`;
    if (/left arm/i.test(compact) && /right arm/i.test(compact) && !/\(L\/R\)/.test(exercise)) exercise = `${exercise} (L/R)`;

    const reps = setRep ? Number(setRep[2] || setRep[1]) : null;
    const notes = [];
    if (/bad form|poor/i.test(compact)) notes.push("Form issue: regress next exposure if needed.");
    if (/regress to\s*(\d+(?:\.\d+)?)kg/i.test(compact)) notes.push(`Regress target: ${compact.match(/regress to\s*(\d+(?:\.\d+)?)kg/i)[1]}kg.`);
    if (/nice form/i.test(compact)) notes.push("Nice form.");
    if (/breath/i.test(compact)) notes.push("Breathing issue resolved.");
    if (/failure|sent to failure/i.test(compact)) notes.push("Failure noted.");
    if (/leftmost cables/i.test(compact)) notes.push("Leftmost cables.");
    if (cableNote && isCableExcluded(exercise, compact)) notes.push("Cable pulley difference: exclude volume for this session.");

    if (exercise && (weight || reps || rirMatch)) {
      rows.push({
        exercise,
        muscle: getMuscleGroup(exercise),
        weight,
        reps: reps ? [reps] : [],
        rir: rirMatch ? Number(rirMatch[1]) : 0,
        set: 1,
        notes: notes.join(" "),
        excluded: isCableExcluded(exercise, notes.join(" "))
      });
    }
  });

  return rows;
}

function rowsToMarkdown(rows, options = {}) {
  const hasDocument = typeof document !== "undefined";
  const date = options.date || (hasDocument ? $("#sessionDate")?.value : "") || todayIso();
  const name = options.name || (hasDocument ? $("#sessionName")?.value : "") || "Workout";
  const lines = [`# Session Log: ${dateLabel(date)} (${name})`, "", "## Exercises Performed"];
  rows.forEach((row) => {
    const reps = Array.isArray(row.reps) ? row.reps.join(" / ") : row.reps;
    const bits = [];
    if (reps) bits.push(`1x${reps}`);
    if (row.rir !== null && row.rir !== undefined) bits.push(`@ ${row.rir} RIR`);
    if (row.weight) bits.push(`(${row.weight}kg)`);
    if (row.notes) bits.push(`- ${row.notes}`);
    lines.push(`- ${row.exercise}: ${bits.join(" ")}.`);
  });
  return lines.join("\n");
}

function rowTableHtml(row) {
  const reps = Array.isArray(row.reps) ? row.reps.join(" / ") : row.reps;
  return `
    <tr>
      <td>${escapeHtml(row.exercise)}</td>
      <td>${escapeHtml(row.muscle || getMuscleGroup(row.exercise))}</td>
      <td>${row.weight ? `${row.weight}kg` : "-"}</td>
      <td>${escapeHtml(reps || "-")}</td>
      <td>${row.rir ?? "-"}</td>
      <td>${escapeHtml(row.notes || "-")}</td>
    </tr>
  `;
}

function renderParsed(rows) {
  $("#parsedRows").innerHTML = rows.length ? rows.map(rowTableHtml).join("") : `<tr><td colspan="6">No parsed rows yet.</td></tr>`;
  $("#markdownOutput").textContent = rowsToMarkdown(rows);
}

function getSpeechRecognition() {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function renderVoiceNotes() {
  const supported = Boolean(getSpeechRecognition());
  $("#voiceSupport").textContent = supported
    ? state.isListening
      ? "Listening..."
      : "Ready"
    : "Speech recognition not supported in this browser";
  $("#startVoiceButton").disabled = !supported || state.isListening;
  $("#stopVoiceButton").disabled = !supported || !state.isListening;
  $("#startVoiceButton").classList.toggle("recording", state.isListening);

  const current = [state.voiceDraft, state.voiceInterim].filter(Boolean).join(" ");
  $("#voiceTranscript").textContent = current || "Each saved voice note appends into Raw Notes below.";
  $("#voiceNoteList").innerHTML = state.voiceNotes.length
    ? state.voiceNotes
        .slice(0, 5)
        .map((note) => `
          <article class="voice-note">
            <strong>${escapeHtml(note.time)}</strong>
            <span>${escapeHtml(note.text)}</span>
          </article>
        `)
        .join("")
    : "";
}

function appendTranscriptToRawNotes(text) {
  const clean = cleanText(text);
  if (!clean) return;
  const raw = $("#rawNotes");
  raw.value = [raw.value.trim(), clean].filter(Boolean).join("\n\n");
  state.voiceNotes.unshift({
    id: `vn-${Date.now()}`,
    time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    text: clean
  });
  saveVoiceNotes(state.voiceNotes);
  state.parsed = parseRawNotes(raw.value);
  renderParsed(state.parsed);
  $("#parseStatus").textContent = `Saved voice note and parsed ${state.parsed.length} rows.`;
}

function saveVoiceDraft() {
  if (state.voiceSaved) return;
  state.voiceSaved = true;
  appendTranscriptToRawNotes(state.voiceDraft);
  state.voiceDraft = "";
  state.voiceInterim = "";
  renderVoiceNotes();
}

function startVoiceNote() {
  const SpeechRecognition = getSpeechRecognition();
  if (!SpeechRecognition) {
    $("#parseStatus").textContent = "Voice transcription needs Chrome, Edge, or another browser with SpeechRecognition support.";
    renderVoiceNotes();
    return;
  }

  if (state.recognition && state.isListening) return;

  const recognition = new SpeechRecognition();
  recognition.lang = "en-GB";
  recognition.continuous = true;
  recognition.interimResults = true;
  state.recognition = recognition;
  state.voiceDraft = "";
  state.voiceInterim = "";
  state.voiceSaved = false;
  state.isListening = true;

  recognition.onresult = (event) => {
    let finalChunk = "";
    let interimChunk = "";
    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      const transcript = event.results[index][0].transcript;
      if (event.results[index].isFinal) finalChunk += ` ${transcript}`;
      else interimChunk += ` ${transcript}`;
    }
    if (finalChunk) state.voiceDraft = cleanText(`${state.voiceDraft} ${finalChunk}`);
    state.voiceInterim = cleanText(interimChunk);
    renderVoiceNotes();
  };

  recognition.onerror = (event) => {
    state.isListening = false;
    $("#parseStatus").textContent = `Voice note stopped: ${event.error || "microphone error"}.`;
    renderVoiceNotes();
  };

  recognition.onend = () => {
    state.isListening = false;
    saveVoiceDraft();
    renderVoiceNotes();
  };

  try {
    recognition.start();
    $("#parseStatus").textContent = "Recording voice note. Say one or more set notes, then press Stop & Save.";
    renderVoiceNotes();
  } catch (error) {
    state.isListening = false;
    $("#parseStatus").textContent = `Could not start voice note: ${error.message}`;
    renderVoiceNotes();
  }
}

function stopVoiceNote() {
  if (!state.recognition || !state.isListening) return;
  $("#parseStatus").textContent = "Saving voice note...";
  state.recognition.stop();
}

function clearVoiceNotes() {
  state.voiceNotes = [];
  state.voiceDraft = "";
  state.voiceInterim = "";
  saveVoiceNotes([]);
  renderVoiceNotes();
}

async function chooseVaultFolder() {
  if (!("showDirectoryPicker" in window)) {
    $("#vaultStatus").textContent = "Folder picker needs Chromium on localhost.";
    return;
  }
  const dir = await window.showDirectoryPicker();
  state.vaultDirHandle = dir;
  const files = {};
  for await (const [name, handle] of dir.entries()) {
    if (handle.kind === "file" && /\.(md|txt)$/i.test(name)) {
      files[name] = await (await handle.getFile()).text();
    }
  }
  state.files = { ...state.files, ...files };
  $("#vaultName").textContent = dir.name;
  $("#vaultStatus").textContent = `${Object.keys(files).length} markdown files loaded`;
  renderDashboard();
}

async function ensureVaultWritePermission() {
  if (!state.vaultDirHandle) return false;
  if (!state.vaultDirHandle.requestPermission) return true;
  const current = await state.vaultDirHandle.queryPermission({ mode: "readwrite" });
  if (current === "granted") return true;
  const requested = await state.vaultDirHandle.requestPermission({ mode: "readwrite" });
  return requested === "granted";
}

function buildSyncBundle(sessions) {
  return sessions
    .map((session) => session.markdown || rowsToMarkdown(session.rows, { date: session.date, name: session.name }))
    .join("\n\n---\n\n");
}

function appendSessionsToWorkoutLog(existing, bundle) {
  const trimmedBundle = bundle.trim();
  if (!trimmedBundle) return existing;
  if (existing.includes(trimmedBundle)) return existing;
  if (existing.includes(SESSION_MARKER)) {
    return existing.replace(SESSION_MARKER, `${SESSION_MARKER}\n\n${trimmedBundle}\n`);
  }
  return `${existing.trim()}\n\n${trimmedBundle}\n`;
}

async function syncPendingToVault() {
  const pending = getPendingSessions();
  if (!pending.length) {
    $("#syncQueueStatus").textContent = "Nothing pending to sync.";
    return;
  }

  if (!state.vaultDirHandle) {
    $("#syncQueueStatus").textContent = "Choose your Obsidian vault folder first, then sync again.";
    await chooseVaultFolder();
    if (!state.vaultDirHandle) return;
  }

  const hasPermission = await ensureVaultWritePermission();
  if (!hasPermission) {
    $("#syncQueueStatus").textContent = "Vault write permission was not granted. Download a sync bundle instead.";
    return;
  }

  try {
    const fileHandle = await state.vaultDirHandle.getFileHandle("Workout_Log.md", { create: true });
    const file = await fileHandle.getFile();
    const existing = await file.text();
    const bundle = buildSyncBundle(pending);
    const nextContent = appendSessionsToWorkoutLog(existing, bundle);

    if (nextContent !== existing) {
      const writable = await fileHandle.createWritable();
      await writable.write(nextContent);
      await writable.close();
      state.files["Workout_Log.md"] = nextContent;
    }

    const syncedIds = new Set(pending.map((session) => session.id));
    const sessions = loadLocalSessions().map((session) =>
      syncedIds.has(session.id)
        ? { ...session, synced: true, syncedAt: new Date().toISOString() }
        : session
    );
    saveLocalSessions(sessions);
    $("#syncQueueStatus").textContent = `Synced ${pending.length} session${pending.length === 1 ? "" : "s"} to Workout_Log.md.`;
    renderDashboard();
  } catch (error) {
    $("#syncQueueStatus").textContent = `Sync failed: ${error.message}. Your sessions are still queued locally.`;
  }
}

function downloadPendingSyncBundle() {
  const pending = getPendingSessions();
  if (!pending.length) {
    $("#syncQueueStatus").textContent = "Nothing pending to export.";
    return;
  }
  const bundle = buildSyncBundle(pending);
  const blob = new Blob([bundle], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `iron-ledger-sync-${todayIso()}.md`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  $("#syncQueueStatus").textContent = "Downloaded sync bundle. Pending sessions remain queued until you sync them.";
}

async function readTextFiles(fileList) {
  const files = Array.from(fileList || [])
    .filter((file) => /\.(md|txt)$/i.test(file.name))
    .slice(0, MAX_IMPORT_FILES);
  const entries = [];
  for (const file of files) {
    if (file.size > MAX_IMPORT_BYTES) {
      $("#parseStatus").textContent = `${file.name} is too large. Limit is ${Math.round(MAX_IMPORT_BYTES / 1024 / 1024)}MB per file.`;
      continue;
    }
    entries.push({ name: file.name, text: await file.text() });
  }
  return entries;
}

function importTextEntries(entries, mode = "auto") {
  if (!entries.length) return;
  const rawNotes = [];
  let vaultCount = 0;

  entries.forEach((entry) => {
    const looksLikeStatsTable = /\|\s*Date\s*\|[\s\S]*\|\s*Exercise\s*\|/i.test(entry.text);
    const knownVaultFile = /^(Workout_Log|Sets_Reps_RIR|Current_Gym_Status|Workout_Statistics|Notes_For_Next_Session)\.md$/i.test(entry.name);

    if (mode === "notes" || (!looksLikeStatsTable && !knownVaultFile)) {
      rawNotes.push(entry.text);
      return;
    }

    state.files[entry.name] = entry.text;
    vaultCount += 1;
  });

  if (rawNotes.length) {
    $("#rawNotes").value = rawNotes.join("\n\n");
    state.parsed = parseRawNotes($("#rawNotes").value);
    renderParsed(state.parsed);
    setView("log");
    $("#parseStatus").textContent = `Imported ${rawNotes.length} note file${rawNotes.length === 1 ? "" : "s"} and parsed ${state.parsed.length} rows.`;
  }

  if (vaultCount) {
    $("#vaultName").textContent = "Imported files";
    $("#vaultStatus").textContent = `${vaultCount} markdown/text file${vaultCount === 1 ? "" : "s"} loaded`;
    renderDashboard();
  }
}

function isAllowedLocalAiEndpoint(endpoint) {
  try {
    const url = new URL(endpoint);
    return ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) && ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

async function tryLocalAi() {
  const endpoint = $("#aiEndpoint").value.trim();
  const model = $("#aiModel").value.trim();
  if (!isAllowedLocalAiEndpoint(endpoint)) {
    $("#parseStatus").textContent = "For security, local AI calls are restricted to localhost or 127.0.0.1.";
    return;
  }
  const prompt = `Convert these rushed gym notes into clean JSON rows with exercise, weight, reps, rir, notes. Return JSON only.\n\n${$("#rawNotes").value}`;
  $("#parseStatus").textContent = "Asking local model...";
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt, stream: false })
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const data = await response.json();
    const content = data.response || data.choices?.[0]?.message?.content || "";
    const json = content.match(/\[[\s\S]*\]/)?.[0] || content;
    const rows = JSON.parse(json).map((row) => ({
      ...row,
      muscle: row.muscle || getMuscleGroup(row.exercise),
      reps: Array.isArray(row.reps) ? row.reps : [Number(row.reps)].filter(Number.isFinite),
      excluded: row.excluded ?? isCableExcluded(row.exercise, row.notes)
    }));
    state.parsed = rows;
    renderParsed(rows);
    $("#parseStatus").textContent = "Local AI parsed the session.";
  } catch (error) {
    state.parsed = parseRawNotes($("#rawNotes").value);
    renderParsed(state.parsed);
    $("#parseStatus").textContent = `Local AI unavailable, used offline parser. ${error.message}`;
  }
}

function saveParsedSession() {
  if (!state.parsed.length) {
    $("#parseStatus").textContent = "Parse notes before saving to history.";
    return;
  }
  const date = $("#sessionDate").value || todayIso();
  const name = $("#sessionName").value || "Workout";
  const id = `local-${date}-${name}`;
  const sessions = loadLocalSessions().filter((session) => session.id !== id);
  sessions.push({
    id,
    date,
    name,
    markdown: rowsToMarkdown(state.parsed, { date, name }),
    rows: state.parsed,
    synced: false,
    savedAt: new Date().toISOString()
  });
  saveLocalSessions(sessions);
  $("#parseStatus").textContent = `Saved ${state.parsed.length} rows locally and queued sync for ${date}.`;
  renderDashboard();
}

function saveAndQueueSync() {
  saveParsedSession();
  setView("dashboard");
}

function setView(viewName) {
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === viewName));
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === `${viewName}View`));
  const titles = {
    dashboard: "Training Dashboard",
    stats: "Stats and Graphs",
    history: "Session History",
    log: "Log Session",
    exercises: "Exercises",
    notes: "Notes"
  };
  $("#pageTitle").textContent = titles[viewName] || "Iron Ledger";
}

function bindEvents() {
  $$(".nav-item").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });
  $$("[data-view-jump]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.viewJump));
  });

  $("#pickVaultButton").addEventListener("click", chooseVaultFolder);
  $("#fileImportInput").addEventListener("change", async (event) => {
    importTextEntries(await readTextFiles(event.target.files), "auto");
    event.target.value = "";
  });
  $("#topFileImportInput").addEventListener("change", async (event) => {
    importTextEntries(await readTextFiles(event.target.files), "auto");
    event.target.value = "";
  });
  $("#notesFileInput").addEventListener("change", async (event) => {
    importTextEntries(await readTextFiles(event.target.files), "notes");
    event.target.value = "";
  });
  $("#refreshButton").addEventListener("click", renderDashboard);
  $("#sampleButton").addEventListener("click", () => {
    $("#rawNotes").value = SAMPLE_RAW_NOTES;
    $("#sessionDate").value = "2026-06-10";
    $("#sessionName").value = "Upper A";
    setView("log");
    state.parsed = parseRawNotes($("#rawNotes").value);
    renderParsed(state.parsed);
  });
  $("#parseButton").addEventListener("click", () => {
    state.parsed = parseRawNotes($("#rawNotes").value);
    renderParsed(state.parsed);
    $("#parseStatus").textContent = `Parsed ${state.parsed.length} rows offline.`;
  });
  $("#aiButton").addEventListener("click", tryLocalAi);
  $("#startVoiceButton").addEventListener("click", startVoiceNote);
  $("#stopVoiceButton").addEventListener("click", stopVoiceNote);
  $("#clearVoiceButton").addEventListener("click", clearVoiceNotes);
  $("#syncVaultButton").addEventListener("click", syncPendingToVault);
  $("#downloadSyncButton").addEventListener("click", downloadPendingSyncBundle);
  $("#saveSessionButton").addEventListener("click", saveParsedSession);
  $("#saveAndSyncButton").addEventListener("click", saveAndQueueSync);
  $("#clearButton").addEventListener("click", () => {
    $("#rawNotes").value = "";
    state.parsed = [];
    renderParsed([]);
  });
  $("#copyMarkdownButton").addEventListener("click", async () => {
    await navigator.clipboard.writeText($("#markdownOutput").textContent);
    $("#parseStatus").textContent = "Markdown copied to clipboard.";
  });
  $("#exerciseSearch").addEventListener("input", () => renderExercises(state.rows));
  $("#historySearch").addEventListener("input", renderHistory);
  ["statsRange", "statsMuscle", "statsExercise", "statsMetric", "includeCable"].forEach((id) => {
    $(`#${id}`).addEventListener("input", renderStats);
    $(`#${id}`).addEventListener("change", renderStats);
  });
  $("#sessionDate").addEventListener("input", () => renderParsed(state.parsed));
  $("#sessionName").addEventListener("input", () => renderParsed(state.parsed));

  document.addEventListener("click", (event) => {
    const card = event.target.closest("[data-history-date]");
    if (!card) return;
    state.selectedHistoryDate = card.dataset.historyDate;
    setView("history");
    renderHistory();
  });
}

$("#sessionDate").value = todayIso();
state.voiceNotes = loadVoiceNotes();
bindEvents();
renderDashboard();
renderParsed([]);
renderVoiceNotes();
