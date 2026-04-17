import { useState, useEffect, useCallback, useRef } from "react";
import { CT, LC, CC, SI, AW, TC, TE } from "./data/gameData";
import { Q } from "./data/questions";
import { MG, FORMAT, RANK_COINS } from "./data/miniGames";

// ═══════════════════════════════════════════════════════
// BOARD DATA
// ═══════════════════════════════════════════════════════
const i1 = {
  name: "ÎLE MYSTÈRE", icon: "🏝", cx: 200, cy: 148, rx: 158, ry: 128, rot: -5, color: "#1B3A22",
  cases: [
    { id: "1a", x: 100, y: 88,  r: "question",   v: "duel"      },
    { id: "1b", x: 160, y: 56,  r: "coins",       v: "chaos"     },
    { id: "1c", x: 228, y: 46,  r: "question",   v: "duel"      },
    { id: "1d", x: 298, y: 66,  r: "duel",        v: "question"  },
    { id: "1e", x: 328, y: 128, r: "question",   v: "chaos"     },
    { id: "1f", x: 292, y: 195, r: "chaos",       v: "coins"     },
    { id: "1g", x: 220, y: 222, r: "coins",       v: "coins"     },
    { id: "1h", x: 142, y: 208, r: "chaos",       v: "question"  },
    { id: "1i", x: 85,  y: 152, r: "teleport",   v: "teleport"  },
    { id: "1x", x: 205, y: 118, r: "chaos",       v: "chaos"     },
    { id: "1y", x: 255, y: 148, r: "shop",        v: "chaos"     },
  ],
  mp:  ["1a","1b","1c","1d","1e","1f","1g","1h","1i"],
  sc:  [
    { id: "s1", f: "1c", t: "1x" }, { id: "s2", f: "1x", t: "1h" },
    { id: "s3", f: "1e", t: "1y" }, { id: "s4", f: "1y", t: "1x" },
  ],
  cfg: { 0: { s1:1, s2:1, s3:1, s4:1 }, 1: { s1:-1, s2:-1, s3:-1, s4:-1 } },
};
const i2 = {
  name: "ÎLE VOLCANIQUE", icon: "🌋", cx: 568, cy: 172, rx: 148, ry: 122, rot: 4, color: "#3A1B1B",
  cases: [
    { id: "2a", x: 568, y: 70,  r: "question",   v: "duel"      },
    { id: "2b", x: 646, y: 106, r: "duel",        v: "question"  },
    { id: "2c", x: 688, y: 172, r: "question",   v: "coins"     },
    { id: "2d", x: 646, y: 240, r: "coins",       v: "chaos"     },
    { id: "2e", x: 568, y: 270, r: "question",   v: "duel"      },
    { id: "2f", x: 490, y: 240, r: "chaos",       v: "chaos"     },
    { id: "2g", x: 452, y: 172, r: "question",   v: "coins"     },
    { id: "2h", x: 490, y: 106, r: "teleport",   v: "teleport"  },
    { id: "2x", x: 530, y: 145, r: "shop",        v: "chaos"     },
    { id: "2y", x: 608, y: 145, r: "question",   v: "chaos"     },
    { id: "2z", x: 608, y: 205, r: "coins",       v: "coins"     },
    { id: "2w", x: 530, y: 205, r: "chaos",       v: "question"  },
  ],
  mp:  ["2a","2b","2c","2d","2e","2f","2g","2h"],
  sc:  [
    { id: "s5",  f: "2h", t: "2x" }, { id: "s6",  f: "2x", t: "2w" },
    { id: "s7",  f: "2w", t: "2f" }, { id: "s8",  f: "2b", t: "2y" },
    { id: "s9",  f: "2y", t: "2z" }, { id: "s10", f: "2z", t: "2d" },
  ],
  cfg: { 0: { s5:1,s6:1,s7:1,s8:1,s9:1,s10:1 }, 1: { s5:-1,s6:-1,s7:-1,s8:-1,s9:-1,s10:-1 } },
};
const i3 = {
  name: "ÎLE CORAIL", icon: "🐚", cx: 348, cy: 438, rx: 162, ry: 110, rot: -2, color: "#1B2A3A",
  cases: [
    { id: "3a", x: 256, y: 373, r: "question",    v: "chaos"     },
    { id: "3b", x: 348, y: 346, r: "question",   v: "duel"      },
    { id: "3c", x: 440, y: 373, r: "chaos",       v: "chaos"     },
    { id: "3d", x: 480, y: 438, r: "chaos",       v: "coins"     },
    { id: "3e", x: 440, y: 500, r: "coins",       v: "question"  },
    { id: "3f", x: 348, y: 520, r: "teleport",   v: "teleport"  },
    { id: "3g", x: 256, y: 500, r: "question",   v: "question"  },
    { id: "3h", x: 216, y: 438, r: "shop",        v: "chaos"     },
    { id: "3x", x: 310, y: 408, r: "question",   v: "coins"     },
    { id: "3y", x: 392, y: 408, r: "coins",       v: "duel"      },
    { id: "3z", x: 348, y: 465, r: "coins",       v: "coins"     },
  ],
  mp:  ["3a","3b","3c","3d","3e","3f","3g","3h"],
  sc:  [
    { id: "s11", f: "3a", t: "3x" }, { id: "s12", f: "3x", t: "3z" },
    { id: "s13", f: "3c", t: "3y" }, { id: "s14", f: "3y", t: "3z" },
    { id: "s15", f: "3z", t: "3f" }, { id: "s16", f: "3x", t: "3y" },
  ],
  cfg: { 0: { s11:1,s12:1,s13:1,s14:1,s15:1,s16:1 }, 1: { s11:-1,s12:-1,s13:-1,s14:-1,s15:-1,s16:-1 } },
};
const islands = [i1, i2, i3];
const bridges = [
  { f: { x: 328, y: 128 }, t: { x: 452, y: 172 }, m: { x: 390, y: 142 } },
  { f: { x: 142, y: 208 }, t: { x: 256, y: 373 }, m: { x: 190, y: 292 } },
  { f: { x: 568, y: 270 }, t: { x: 480, y: 438 }, m: { x: 536, y: 354 } },
];
const tpLinks = [
  { f: i1.cases[8], t: i3.cases[5] },
  { f: i3.cases[5], t: i2.cases[7] },
  { f: i2.cases[7], t: i1.cases[8] },
];
function gc(id) {
  for (const isl of islands) { const c = isl.cases.find(c => c.id === id); if (c) return c; }
  return null;
}
function segs() {
  const s = [];
  islands.forEach(isl => {
    const m = isl.mp;
    for (let j = 0; j < m.length; j++) {
      const a = gc(m[j]), b = gc(m[(j + 1) % m.length]);
      if (a && b) s.push({ f: a, t: b, sid: `m-${m[j]}-${m[(j + 1) % m.length]}` });
    }
    isl.sc.forEach(sc => {
      const a = gc(sc.f), b = gc(sc.t);
      if (a && b) s.push({ f: a, t: b, sid: `sc-${sc.id}` });
    });
  });
  const BR_IDS = [["1e","2g"],["1h","3a"],["2e","3d"]];
  bridges.forEach((b, i) => s.push({ f: b.f, t: b.t, sid: `br-${i}`, fId: BR_IDS[i][0], tId: BR_IDS[i][1] }));
  return s;
}
const AS = segs();

// ═══════════════════════════════════════════════════════
// CHAOS DECK  (multiple copies per card based on count)
// ═══════════════════════════════════════════════════════
const CC_DECK = CC.flatMap((card, i) => Array(card.count || 1).fill(i));

// ═══════════════════════════════════════════════════════
// BRIDGE / TELEPORT CONSTANTS
// ═══════════════════════════════════════════════════════
const BRIDGE_CONNECTIONS = [["1e","2g"],["1h","3a"],["2e","3d"]];
const TELEPORT_IDS = ["1i","2h","3f"];
const BRIDGE_COST = 2;
const TELEPORT_COST = 3;
function getCaseIsland(caseId) {
  return islands.findIndex(il => il.cases.some(c => c.id === caseId));
}

// ── Board graph helpers ────────────────────────────────
function getNeighbors(caseId, side) {
  const neighbors = [];
  for (const isl of islands) {
    const idx = isl.mp.indexOf(caseId);
    if (idx !== -1) {
      neighbors.push(isl.mp[(idx + 1) % isl.mp.length]);
    }
    for (const sc of isl.sc) {
      const dir = isl.cfg[side]?.[sc.id] ?? 1;
      if (dir === 1  && sc.f === caseId) neighbors.push(sc.t);
      if (dir === -1 && sc.t === caseId) neighbors.push(sc.f);
    }
  }
  for (const [f, t] of BRIDGE_CONNECTIONS) {
    if (f === caseId) neighbors.push(t);
    if (t === caseId) neighbors.push(f); // bidirectional
  }
  return neighbors;
}

// BFS shortest path (directed graph) — returns full path including start and end
function findShortestPath(fromId, toId, side) {
  if (fromId === toId) return [toId];
  const queue = [{ id: fromId, path: [fromId] }];
  const visited = new Set([fromId]);
  while (queue.length > 0) {
    const { id, path } = queue.shift();
    if (path.length > 35) continue;
    for (const n of getNeighbors(id, side)) {
      if (n === toId) return [...path, n];
      if (!visited.has(n)) { visited.add(n); queue.push({ id: n, path: [...path, n] }); }
    }
  }
  return null; // no path found
}

// Returns the bridge index (0-2) if edge a→b or b→a is a bridge, else -1
function bridgeBit(a, b) {
  return BRIDGE_CONNECTIONS.findIndex(([f, t]) => (f === a && t === b) || (t === a && f === b));
}

// Returns [{id, path, usesBridge}] reachable in exactly `steps` moves.
// Uses a bridge-bitmask per state (3 bridges → 8 states) to prevent
// bridge oscillation (2-cycles like 1e↔2g inflating the reachable set).
function getReachableCases(fromId, steps, side) {
  if (steps <= 0) return [];

  // BFS layered by depth; state = (nodeId, bridgeMask)
  // bridgeMask: bit i set → bridge i already used in this path
  let frontier = [{ id: fromId, path: [], bridges: 0 }];

  for (let depth = 0; depth < steps; depth++) {
    const next = [];
    const seen = new Set(); // deduplicate (id, bridges) at this depth

    for (const { id, path, bridges } of frontier) {
      for (const n of getNeighbors(id, side)) {
        const bit = bridgeBit(id, n);
        if (bit !== -1 && (bridges >> bit & 1)) continue; // this bridge already used
        const nb = bit !== -1 ? bridges | (1 << bit) : bridges;
        const key = `${n}:${nb}`;
        if (!seen.has(key)) {
          seen.add(key);
          next.push({ id: n, path: [...path, n], bridges: nb });
        }
      }
    }

    frontier = next;
    if (frontier.length === 0) break;
  }

  // For each destination keep the path that crosses the fewest bridges
  // (prefer non-bridge path so affordability filter works correctly)
  const best = new Map(); // id → { path, bridgeCount }
  for (const { id, path, bridges } of frontier) {
    const bc = BRIDGE_CONNECTIONS.reduce((n, _, i) => n + (bridges >> i & 1), 0);
    const prev = best.get(id);
    if (!prev || bc < prev.bridgeCount) best.set(id, { path, bridgeCount: bc });
  }

  return [...best.entries()].map(([id, { path, bridgeCount }]) => ({
    id,
    path,
    usesBridge: bridgeCount > 0,
  }));
}

// ═══════════════════════════════════════════════════════
// LOCALSTORAGE HOOK
// ═══════════════════════════════════════════════════════
function useLS(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s !== null ? JSON.parse(s) : init; }
    catch { return init; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* quota/private-mode — ignore */ }
  }, [key, val]);
  return [val, setVal];
}

// ═══════════════════════════════════════════════════════
// INITIAL STATE
// ═══════════════════════════════════════════════════════
const INIT_TEAMS = [
  { name: "Équipe 1", coins: 0, stars: 0, shields: 0, qOk: 0, mgWon: 0, pos: "1a", visitedCases: ["1a"], items: [] },
  { name: "Équipe 2", coins: 0, stars: 0, shields: 0, qOk: 0, mgWon: 0, pos: "1a", visitedCases: ["1a"], items: [] },
  { name: "Équipe 3", coins: 0, stars: 0, shields: 0, qOk: 0, mgWon: 0, pos: "1a", visitedCases: ["1a"], items: [] },
  { name: "Équipe 4", coins: 0, stars: 0, shields: 0, qOk: 0, mgWon: 0, pos: "1a", visitedCases: ["1a"], items: [] },
];
const INIT_USED = { college: [], lycee: [], expert: [] };
const MAX_TOURS = 10;
const STAR_COST = 12;
const MG_PER_FLIP = 3;

// ═══════════════════════════════════════════════════════
// SMALL COMPONENTS
// ═══════════════════════════════════════════════════════
function Btn({ label, onClick, color = "#fff", small, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? "rgba(80,80,80,0.15)" : `${color}20`,
        border: `1px solid ${disabled ? "rgba(80,80,80,0.3)" : color + "45"}`,
        color: disabled ? "#555" : color,
        padding: small ? "2px 7px" : "6px 14px",
        borderRadius: small ? 6 : 10,
        fontSize: small ? 10 : 12,
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "inherit",
        minWidth: small ? 24 : undefined,
        lineHeight: small ? "18px" : undefined,
        transition: "background 0.15s",
      }}
    >
      {label}
    </button>
  );
}

function StatCounter({ emoji, value, onDec, onInc, label }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 3,
      padding: "4px 6px", borderRadius: 8,
      background: "rgba(255,255,255,0.03)", flex: 1, justifyContent: "center",
    }}>
      <span style={{ fontSize: 12 }}>{emoji}</span>
      <span style={{ color: "#fff", fontWeight: 700, fontSize: 13, minWidth: 16, textAlign: "center" }}>{value}</span>
      {label && <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 8, letterSpacing: 0.5 }}>{label}</span>}
      <button onClick={onDec} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 10, padding: "0 2px", fontFamily: "inherit" }}>−</button>
      <button onClick={onInc} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 10, padding: "0 2px", fontFamily: "inherit" }}>+</button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// CLUE ITEM (needs own state)
// ═══════════════════════════════════════════════════════
function ClueItem({ item }) {
  const [shown, setShown] = useState(0);
  return (
    <div style={{
      padding: "10px 12px", borderRadius: 10,
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>
        {item.name}
        {shown >= item.clues.length && (
          <span style={{ marginLeft: 8, color: "#2ECC71", fontWeight: 800, fontSize: 14 }}>→ {item.answer}</span>
        )}
      </div>
      {item.clues.slice(0, shown).map((clue, ci) => (
        <div key={ci} style={{
          display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 3,
          color: "rgba(255,255,255,0.65)", fontSize: 12,
        }}>
          <span style={{ color: "#F1C40F", fontWeight: 700, flexShrink: 0 }}>#{ci+1}</span>
          {clue}
        </div>
      ))}
      <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
        {shown < item.clues.length && (
          <button onClick={() => setShown(s => s + 1)} style={{
            background: "rgba(241,196,15,0.12)", border: "1px solid rgba(241,196,15,0.25)",
            color: "#F1C40F", borderRadius: 6, padding: "2px 8px",
            fontSize: 10, cursor: "pointer", fontFamily: "inherit",
          }}>
            Indice {shown + 1}/{item.clues.length}
          </button>
        )}
        {shown >= item.clues.length && (
          <button onClick={() => setShown(0)} style={{
            background: "none", border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.3)", borderRadius: 6, padding: "2px 8px",
            fontSize: 10, cursor: "pointer", fontFamily: "inherit",
          }}>↺ Reset</button>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// MINI-GAME CONTENT RENDERER
// ═══════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════
// ADD QUESTION FORM
// ══════════════════════════════════════════════════════════
function AddQuestionForm({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [r, setR] = useState("");
  const [cat, setCat] = useState("");
  const submit = () => {
    if (!q.trim() || !r.trim()) return;
    onAdd({ q: q.trim(), r: r.trim(), cat: cat.trim() || "CUSTOM" });
    setQ(""); setR(""); setCat(""); setOpen(false);
  };
  const inp = {
    width: "100%", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
    color: "#fff", padding: "6px 10px", fontSize: 12, fontFamily: "inherit", outline: "none",
  };
  if (!open) return (
    <button onClick={() => setOpen(true)} style={{
      marginTop: 8, width: "100%", padding: "6px", borderRadius: 8,
      background: "none", border: "1px dashed rgba(255,255,255,0.12)",
      color: "rgba(255,255,255,0.35)", fontSize: 11, cursor: "pointer", fontFamily: "inherit",
    }}>+ Ajouter une question</button>
  );
  return (
    <div style={{
      marginTop: 8, padding: "10px 12px", borderRadius: 10,
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
      display: "flex", flexDirection: "column", gap: 6,
    }}>
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Question…" style={inp} />
      <input value={r} onChange={e => setR(e.target.value)} placeholder="Réponse…" style={inp} />
      <input value={cat} onChange={e => setCat(e.target.value)} placeholder="Catégorie (ex: HIST, SCIENCE…)" style={inp} />
      <div style={{ display: "flex", gap: 6 }}>
        <button onClick={submit} style={{
          flex: 1, padding: "6px", borderRadius: 8, fontSize: 11, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
          background: "rgba(46,204,113,0.15)", border: "1px solid rgba(46,204,113,0.3)", color: "#2ECC71",
        }}>✓ Ajouter</button>
        <button onClick={() => setOpen(false)} style={{
          padding: "6px 12px", borderRadius: 8, fontSize: 11,
          cursor: "pointer", fontFamily: "inherit",
          background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)",
        }}>Annuler</button>
      </div>
    </div>
  );
}

function ContentRenderer({ content, gameId, editable = false, onItemsChange = null }) {
  const [revealed, setReveal] = useState({});
  const toggle = (k) => setReveal(p => ({ ...p, [k]: !p[k] }));

  if (!content) return null;
  const { type, title, items } = content;

  const sectionHeader = (
    <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8, marginTop: 14 }}>
      {title}
    </div>
  );

  if (type === "questions") return (
    <div>
      {sectionHeader}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((item, i) => {
          const key = `${gameId}-q-${i}`;
          return (
            <div key={key} style={{
              padding: "8px 12px", borderRadius: 10,
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, flex: 1 }}>{item.q}</span>
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 9, flexShrink: 0 }}>{item.cat}</span>
                {editable && onItemsChange && (
                  <button onClick={() => onItemsChange(items.filter((_, j) => j !== i))}
                    style={{ background: "none", border: "none", color: "rgba(231,76,60,0.6)", cursor: "pointer", fontSize: 15, flexShrink: 0, padding: "0 2px", lineHeight: 1 }}>×</button>
                )}
              </div>
              {revealed[key]
                ? <div style={{ marginTop: 5, color: "#2ECC71", fontWeight: 700, fontSize: 13 }}>→ {item.r}</div>
                : <button onClick={() => toggle(key)} style={{
                    marginTop: 5, background: "none", border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.4)", borderRadius: 6, padding: "2px 8px",
                    fontSize: 10, cursor: "pointer", fontFamily: "inherit",
                  }}>Voir réponse</button>
              }
            </div>
          );
        })}
        {editable && onItemsChange && (
          <AddQuestionForm onAdd={(item) => onItemsChange([...items, item])} />
        )}
      </div>
    </div>
  );

  if (type === "themes") return (
    <div>
      {sectionHeader}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            padding: "5px 10px", borderRadius: 8,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            {item.emoji && <span style={{ fontSize: 13 }}>{item.emoji}</span>}
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>{item.label}</span>
            {item.cat && <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 9 }}>{item.cat}</span>}
          </div>
        ))}
      </div>
    </div>
  );

  if (type === "words") return (
    <div>
      {sectionHeader}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {items.map((w, i) => (
          <div key={i} style={{
            padding: "5px 10px", borderRadius: 8,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
            color: "rgba(255,255,255,0.75)", fontSize: 12,
          }}>
            {w}
          </div>
        ))}
      </div>
    </div>
  );

  if (type === "pairs") return (
    <div>
      {sectionHeader}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, fontWeight: 700, textAlign: "center", padding: "2px 0" }}>MOT A</div>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, fontWeight: 700, textAlign: "center", padding: "2px 0" }}>MOT B</div>
        {items.map((p, i) => (
          <div key={i} style={{ display: "contents" }}>
            <div style={{
              padding: "5px 10px", borderRadius: "8px 0 0 8px",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
              borderRight: "none", color: "rgba(255,255,255,0.8)", fontSize: 12,
            }}>{p.a}</div>
            <div style={{
              padding: "5px 10px", borderRadius: "0 8px 8px 0",
              background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)",
              borderLeft: "1px solid rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", fontSize: 12,
            }}>{p.b}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (type === "statements") return (
    <div>
      {sectionHeader}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((item, i) => {
          const key = `${gameId}-s-${i}`;
          const isV = item.answer === "VRAI";
          return (
            <div key={key} style={{
              padding: "8px 12px", borderRadius: 10,
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, flex: 1 }}>{item.text}</span>
                {revealed[key] && (
                  <span style={{
                    flexShrink: 0, padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 800,
                    background: isV ? "rgba(46,204,113,0.15)" : "rgba(231,76,60,0.15)",
                    color: isV ? "#2ECC71" : "#E74C3C",
                  }}>{item.answer}</span>
                )}
              </div>
              {revealed[key]
                ? item.note && <div style={{ marginTop: 4, color: "rgba(255,255,255,0.4)", fontSize: 10, fontStyle: "italic" }}>💡 {item.note}</div>
                : <button onClick={() => toggle(key)} style={{
                    marginTop: 5, background: "none", border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.4)", borderRadius: 6, padding: "2px 8px",
                    fontSize: 10, cursor: "pointer", fontFamily: "inherit",
                  }}>Révéler</button>
              }
            </div>
          );
        })}
      </div>
    </div>
  );

  if (type === "debate") return (
    <div>
      {sectionHeader}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            padding: "8px 12px", borderRadius: 10,
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8,
          }}>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, flex: 1 }}>
              {item.topic || item}
            </span>
            {item.cat && <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 9, flexShrink: 0 }}>{item.cat}</span>}
          </div>
        ))}
      </div>
    </div>
  );

  if (type === "definitions") return (
    <div>
      {sectionHeader}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((item, i) => {
          const key = `${gameId}-d-${i}`;
          return (
            <div key={key} style={{
              padding: "8px 12px", borderRadius: 10,
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{item.word}</div>
              {revealed[key]
                ? <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, lineHeight: 1.5 }}>{item.def}</div>
                : <button onClick={() => toggle(key)} style={{
                    background: "none", border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.4)", borderRadius: 6, padding: "2px 8px",
                    fontSize: 10, cursor: "pointer", fontFamily: "inherit",
                  }}>Voir définition</button>
              }
            </div>
          );
        })}
      </div>
    </div>
  );

  if (type === "clues") return (
    <div>
      {sectionHeader}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, i) => (
          <ClueItem key={`${gameId}-c-${i}`} item={item} />
        ))}
      </div>
    </div>
  );

  if (type === "series") return (
    <div>
      {sectionHeader}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, i) => {
          const key = `${gameId}-sr-${i}`;
          return (
            <div key={key} style={{
              padding: "10px 12px", borderRadius: 10,
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>{item.title}</span>
                {item.cat && <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 9 }}>{item.cat}</span>}
              </div>
              {revealed[key]
                ? <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {(item.items || []).map((x, j) => (
                      <span key={j} style={{
                        padding: "3px 8px", borderRadius: 6,
                        background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", fontSize: 11,
                      }}>
                        {j + 1}. {x}
                      </span>
                    ))}
                  </div>
                : <button onClick={() => toggle(key)} style={{
                    background: "none", border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.4)", borderRadius: 6, padding: "2px 8px",
                    fontSize: 10, cursor: "pointer", fontFamily: "inherit",
                  }}>Voir la série</button>
              }
            </div>
          );
        })}
      </div>
    </div>
  );

  if (type === "taboo") return (
    <div>
      {sectionHeader}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 6 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            padding: "10px 12px", borderRadius: 10,
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>
              {item.word}
            </div>
            {(item.forbidden || []).map((w, j) => (
              <div key={j} style={{
                display: "flex", alignItems: "center", gap: 5, marginBottom: 2,
              }}>
                <span style={{ color: "#E74C3C", fontSize: 10 }}>🚫</span>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>{w}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  if (type === "top5") return (
    <div>
      {sectionHeader}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, i) => {
          const key = `${gameId}-t5-${i}`;
          return (
            <div key={key} style={{
              padding: "10px 12px", borderRadius: 10,
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, gap: 8 }}>
                <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, flex: 1 }}>{item.q}</span>
                {item.cat && <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 9, flexShrink: 0 }}>{item.cat}</span>}
              </div>
              {revealed[key]
                ? <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {(item.answers || []).map((a, j) => (
                      <div key={j} style={{
                        display: "flex", gap: 6, alignItems: "center",
                        color: "rgba(255,255,255,0.65)", fontSize: 12,
                      }}>
                        <span style={{ color: "#F1C40F", fontWeight: 700, minWidth: 16 }}>{j+1}.</span>
                        {a}
                      </div>
                    ))}
                  </div>
                : <button onClick={() => toggle(key)} style={{
                    background: "none", border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.4)", borderRadius: 6, padding: "2px 8px",
                    fontSize: 10, cursor: "pointer", fontFamily: "inherit",
                  }}>Voir le classement</button>
              }
            </div>
          );
        })}
      </div>
    </div>
  );

  return null;
}

// ═══════════════════════════════════════════════════════
// MINI-GAME CARD
// ═══════════════════════════════════════════════════════
function MiniGameCard({ game, defaultOpen = false, teams = null, setTeams = null }) {
  const [open, setOpen] = useState(defaultOpen);
  const fmt = FORMAT[game.format] || {};

  return (
    <div style={{
      background: "rgba(255,255,255,0.025)",
      border: `1px solid ${open ? (fmt.color + "40") : "rgba(255,255,255,0.06)"}`,
      borderRadius: 12,
      marginBottom: 6,
      overflow: "hidden",
      transition: "border-color 0.15s",
    }}>
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 10,
          padding: "10px 14px", background: "none", border: "none",
          cursor: "pointer", textAlign: "left", fontFamily: "inherit",
        }}
      >
        <span style={{ fontSize: 20, flexShrink: 0 }}>{game.emoji}</span>
        <span style={{ color: "#fff", fontWeight: 600, fontSize: 14, flex: 1 }}>{game.name}</span>
        <span style={{
          padding: "2px 7px", borderRadius: 6, fontSize: 9, fontWeight: 700,
          background: `${fmt.color}20`, color: fmt.color, flexShrink: 0,
        }}>
          {fmt.emoji} {fmt.short}
        </span>
        <span style={{
          padding: "2px 7px", borderRadius: 6, fontSize: 9,
          background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)", flexShrink: 0,
        }}>
          {game.duration}
        </span>
        <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, flexShrink: 0 }}>
          {open ? "▲" : "▼"}
        </span>
      </button>

      {/* Expanded body */}
      {open && (
        <div style={{ padding: "0 14px 14px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.6, margin: "12px 0 10px" }}>
            {game.desc}
          </p>

          {/* Rules */}
          {game.rules && game.rules.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>
                RÈGLES
              </div>
              {game.rules.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 3 }}>
                  <span style={{ color: fmt.color, fontWeight: 700, fontSize: 11, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, lineHeight: 1.5 }}>{r}</span>
                </div>
              ))}
            </div>
          )}

          {/* Material */}
          {game.material && (
            <div style={{
              marginBottom: 10, padding: "6px 10px", borderRadius: 8,
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)",
            }}>
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>MATÉRIEL · </span>
              <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 11 }}>{game.material}</span>
            </div>
          )}

          {/* Reward */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "4px 10px", borderRadius: 8,
            background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.2)",
            marginBottom: 6,
          }}>
            <span style={{ fontSize: 13 }}>🪙</span>
            <span style={{ color: "#D4A017", fontWeight: 600, fontSize: 12 }}>{game.reward}</span>
          </div>

          {/* Content */}
          <ContentRenderer content={game.content} gameId={game.id} />

          {/* Ranking */}
          {teams && setTeams && (
            <MiniGameRanking teams={teams} setTeams={setTeams} />
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// PAWN SHAPE — classic board-game pion silhouette
// Uses CSS transform so position transitions animate smoothly
// ═══════════════════════════════════════════════════════
function PawnShape({ cx, cy, color, active }) {
  return (
    <g style={{
      transform: `translate(${cx}px, ${cy}px)`,
      transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
      pointerEvents: "none",
    }}>
      {active && <circle cy={-2} r={22} fill={color} opacity={0.15} />}
      {/* Drop shadow */}
      <ellipse cx={1.5} cy={17} rx={11} ry={4} fill="rgba(0,0,0,0.4)" />
      {/* Base platform */}
      <rect x={-10} y={10} width={20} height={7} rx={4}
        fill={color}
        stroke={active ? "#fff" : "rgba(0,0,0,0.3)"} strokeWidth={active ? 2 : 1} />
      {/* Stem */}
      <path d="M -4 10 L -3 0 L 3 0 L 4 10 Z"
        fill={color}
        stroke={active ? "#fff" : "rgba(0,0,0,0.3)"} strokeWidth={active ? 2 : 1} />
      {/* Head */}
      <circle cy={-9} r={9}
        fill={color}
        stroke={active ? "#fff" : "rgba(0,0,0,0.28)"} strokeWidth={active ? 2.5 : 1} />
      {/* Shine */}
      <circle cx={-3} cy={-13} r={3} fill="rgba(255,255,255,0.5)" />
    </g>
  );
}

// ═══════════════════════════════════════════════════════
// MINI-GAME RANKING — distributes rewards after a game
// Supports ties: multiple teams can share the same rank.
// ranks[teamIdx] = 0..3  (0 = 1er, 1 = 2e, …)
// ═══════════════════════════════════════════════════════
function MiniGameRanking({ teams, setTeams, onDone, initialOrder = null }) {
  const [order, setOrder] = useState(() => initialOrder ?? [0, 1, 2, 3]);
  const [done, setDone]   = useState(false);

  const swap = (pos, dir) => {
    if (done) return;
    const other = pos + dir;
    if (other < 0 || other > 3) return;
    setOrder(prev => { const n = [...prev]; [n[pos], n[other]] = [n[other], n[pos]]; return n; });
  };

  const distribute = () => {
    setTeams(prev => prev.map((t, i) => {
      const rank = order.indexOf(i);
      return { ...t, coins: t.coins + RANK_COINS[rank], mgWon: rank === 0 ? t.mgWon + 1 : t.mgWon };
    }));
    setDone(true);
    onDone?.();
  };

  const rankColors = ["#F1C40F", "#BDC3C7", "#CD7F32", "rgba(180,180,180,0.35)"];
  const rankEmoji  = ["🥇", "🥈", "🥉", "4️⃣"];
  const swapBtn = {
    background: "none", borderRadius: 4, width: 22, height: 16,
    fontSize: 8, fontFamily: "inherit", lineHeight: 1, padding: 0,
  };

  return (
    <div style={{ marginTop: 14, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 12 }}>
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>
        🏆 CLASSEMENT FINAL — utilisez ▲▼ pour ajuster
      </div>
      {order.map((teamIdx, rankPos) => {
        const tm = teams[teamIdx];
        return (
          <div key={teamIdx} style={{
            display: "flex", alignItems: "center", gap: 8, marginBottom: 6,
            padding: "8px 12px", borderRadius: 10,
            background: `${rankColors[rankPos]}18`,
            border: `1px solid ${rankColors[rankPos]}40`,
          }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{rankEmoji[rankPos]}</span>
            <span style={{ color: TC[teamIdx], fontWeight: 700, fontSize: 13, flex: 1 }}>
              {TE[teamIdx]} {tm.name}
            </span>
            <span style={{ color: "#D4A017", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
              +{RANK_COINS[rankPos]}₽
            </span>
            {!done && (
              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <button onClick={() => swap(rankPos, -1)} disabled={rankPos === 0}
                  style={{ ...swapBtn, border: "1px solid rgba(255,255,255,0.12)", color: rankPos === 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.5)", cursor: rankPos === 0 ? "default" : "pointer" }}>▲</button>
                <button onClick={() => swap(rankPos, 1)} disabled={rankPos === 3}
                  style={{ ...swapBtn, border: "1px solid rgba(255,255,255,0.12)", color: rankPos === 3 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.5)", cursor: rankPos === 3 ? "default" : "pointer" }}>▼</button>
              </div>
            )}
          </div>
        );
      })}
      {done ? (
        <div style={{ color: "#2ECC71", fontSize: 12, fontWeight: 700, textAlign: "center", marginTop: 8 }}>
          ✓ Récompenses distribuées !
        </div>
      ) : (
        <button onClick={distribute} style={{
          marginTop: 8, width: "100%", padding: "10px", borderRadius: 10, fontSize: 12, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
          background: "rgba(212,160,23,0.15)", border: "1px solid rgba(212,160,23,0.4)", color: "#D4A017",
        }}>💰 Distribuer les récompenses</button>
      )}
    </div>
  );
}

// ─── MJ popup renderer ────────────────────────────────
function renderMJWindow(w, q, level) {
  const lc = { college: { emoji: "🟢", label: "COLLÈGE" }, lycee: { emoji: "🟡", label: "LYCÉE" }, expert: { emoji: "🔴", label: "EXPERT" } };
  const lv = lc[level] || lc.college;
  const qText = q ? q.q.replace(/'/g, "&apos;") : "…";
  const rText = q ? q.r.replace(/'/g, "&apos;") : "—";
  const cat   = q ? q.cat : "";
  w.document.open();
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>MJ — Duel</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#0c1525;color:#fff;font-family:system-ui,sans-serif;padding:20px;min-height:100vh}
  h1{color:#E74C3C;font-size:18px;font-weight:800;margin-bottom:14px;letter-spacing:1px}
  .meta{color:rgba(255,255,255,0.3);font-size:11px;letter-spacing:1px;margin-bottom:8px}
  .q{font-size:17px;font-weight:600;line-height:1.55;margin-bottom:14px}
  .ans{background:rgba(212,160,23,0.12);border:1px solid rgba(212,160,23,0.35);border-radius:10px;padding:12px 16px;margin-bottom:18px}
  .ans-lbl{color:rgba(255,255,255,0.35);font-size:10px;letter-spacing:1px;margin-bottom:5px}
  .ans-val{color:#D4A017;font-size:19px;font-weight:700;line-height:1.4}
  .btns{display:flex;gap:10px}
  button{flex:1;padding:13px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;border:none}
  .ok{background:rgba(46,204,113,0.18);border:1px solid rgba(46,204,113,0.45)!important;color:#2ECC71}
  .ok:hover{background:rgba(46,204,113,0.3)}
  .err{background:rgba(231,76,60,0.12);border:1px solid rgba(231,76,60,0.4)!important;color:#E74C3C}
  .err:hover{background:rgba(231,76,60,0.25)}
</style>
</head><body>
  <h1>⚔️ DUEL — Vue MJ</h1>
  <div class="meta">${lv.emoji} ${lv.label} · ${cat}</div>
  <div class="q">${qText}</div>
  <div class="ans">
    <div class="ans-lbl">RÉPONSE</div>
    <div class="ans-val">${rText}</div>
  </div>
  <div class="btns">
    <button class="ok" onclick="window.opener._duelAction(true)">✓ Bonne réponse — passe la main</button>
    <button class="err" onclick="window.opener._duelAction(false)">✗ Erreur — continue</button>
  </div>
</body></html>`);
  w.document.close();
}

// ═══════════════════════════════════════════════════════
// DUEL MODAL — Les 12 coups de midi : chess clock duel
// Challenger starts (60s), défiant (55s).
// Bonne réponse = garde la main. Erreur = passe la main.
// Le joueur dont le chrono tombe à 0 perd.
// ═══════════════════════════════════════════════════════
function DuelModal({ teams, turn, setTeams, onClose }) {
  const [challenger, setChallenger] = useState(null);
  const [duelLevel, setDuelLevel] = useState("college");
  // phases: setup → ready (questions drawn, timer not started) → duel (timer running) → result
  const [phase, setPhase] = useState("setup");
  // clocks in centiseconds: 5500 = 55.00s, 6000 = 60.00s
  const [clocks, setClocks] = useState([5500, 6000]);
  // hand: 0 = défiant, 1 = challenger (challenger starts)
  const [hand, setHand] = useState(1);
  const [qPool, setQPool] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [activeQ, setActiveQ] = useState(null);
  const [prevQ, setPrevQ]     = useState(null);
  const mjWin = useRef(null);
  const handRef = useRef(1);
  useEffect(() => { handRef.current = hand; }, [hand]);

  // Centisecond ticker — only runs in "duel" phase
  useEffect(() => {
    if (phase !== "duel") return;
    const timer = setInterval(() => {
      setClocks(prev => {
        const nc = [...prev];
        const h = handRef.current;
        if (nc[h] > 0) nc[h] -= 1;
        return nc;
      });
    }, 10);
    return () => clearInterval(timer);
  }, [phase]);

  // End when a clock hits 0
  useEffect(() => {
    if (phase === "duel" && (clocks[0] <= 0 || clocks[1] <= 0)) setPhase("result");
  }, [phase, clocks]);

  const prepDuel = () => {
    if (challenger === null) return;
    const allPool = window._Q?.[duelLevel] ?? [];
    const usedIdxs = window._usedQ?.[duelLevel] ?? [];
    const available = allPool.map((q, i) => ({ ...q, __idx: i })).filter(q => !usedIdxs.includes(q.__idx));
    const source = available.length ? available : allPool.map((q, i) => ({ ...q, __idx: i }));
    const pool = [...source];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    pool.forEach(q => window._markUsed?.(duelLevel, q.__idx));
    setQPool(pool); setQIdx(0); setActiveQ(pool[0] || null);
    setClocks([5500, 6000]); setHand(1); handRef.current = 1;
    setPhase("ready"); // show questions but don't start timer yet
  };

  const startTimer = () => setPhase("duel");

  const nextQ = (switchHand) => {
    setPrevQ(activeQ);
    const ni = qIdx + 1;
    const nq = qPool[ni % Math.max(1, qPool.length)] || null;
    setQIdx(ni); setActiveQ(nq);
    if (switchHand) setHand(h => 1 - h);
    if (mjWin.current && !mjWin.current.closed) renderMJWindow(mjWin.current, nq, duelLevel);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { window._duelAction = (sw) => nextQ(sw); });

  const openMJWindow = () => {
    const w = window.open("", "_duelMJ", "width=560,height=360,top=80,left=80,resizable=yes,scrollbars=no");
    mjWin.current = w; renderMJWindow(w, activeQ, duelLevel);
  };
  useEffect(() => {
    if (mjWin.current && !mjWin.current.closed) renderMJWindow(mjWin.current, activeQ, duelLevel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeQ]);

  const fmtClock = (cs) => {
    const s = Math.floor(cs / 100);
    const c = cs % 100;
    return `${s < 10 ? "0" : ""}${s}.${c < 10 ? "0" : ""}${c}`;
  };

  const applyAndClose = () => {
    if (mjWin.current && !mjWin.current.closed) mjWin.current.close();
    let winnerIdx = null;
    if (clocks[0] > 0 && clocks[1] <= 0) winnerIdx = turn;
    else if (clocks[1] > 0 && clocks[0] <= 0) winnerIdx = challenger;
    else if (clocks[0] > clocks[1]) winnerIdx = turn;
    else if (clocks[1] > clocks[0]) winnerIdx = challenger;
    if (winnerIdx !== null) {
      const loserIdx = winnerIdx === turn ? challenger : turn;
      setTeams(prev => prev.map((t, i) => {
        if (i === winnerIdx) return { ...t, coins: t.coins + 5 };
        if (i === loserIdx) return { ...t, coins: Math.max(0, t.coins - 3) };
        return t;
      }));
    }
    onClose();
  };

  const handTeamIdx = hand === 0 ? turn : (challenger ?? turn);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.93)", zIndex: 999,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#0c1525", border: "2px solid rgba(231,76,60,0.45)", borderRadius: 20,
        padding: 24, maxWidth: 500, width: "100%", maxHeight: "92vh", overflowY: "auto" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ color: "#E74C3C", fontWeight: 800, fontSize: 22, letterSpacing: 1 }}>⚔️ DUEL</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {(phase === "ready" || phase === "duel") && (
              <button onClick={openMJWindow} style={{
                background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.35)",
                color: "#D4A017", padding: "5px 12px", borderRadius: 8, fontSize: 11,
                fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              }}>📋 Vue MJ</button>
            )}
            <button onClick={onClose} style={{ background: "none", border: "none",
              color: "rgba(255,255,255,0.3)", fontSize: 20, cursor: "pointer", fontFamily: "inherit" }}>✕</button>
          </div>
        </div>

        {/* ── SETUP ── */}
        {phase === "setup" && (
          <div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, marginBottom: 12 }}>
              {TE[turn]} <strong style={{ color: TC[turn] }}>{teams[turn].name}</strong> défie…
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {teams.map((t, i) => i !== turn && (
                <button key={i} onClick={() => setChallenger(i)} style={{
                  background: challenger === i ? `${TC[i]}28` : "rgba(255,255,255,0.04)",
                  border: `2px solid ${challenger === i ? TC[i] : "rgba(255,255,255,0.09)"}`,
                  color: challenger === i ? TC[i] : "rgba(255,255,255,0.55)",
                  padding: "10px 18px", borderRadius: 12, fontSize: 13, fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit",
                }}>{TE[i]} {t.name}</button>
              ))}
            </div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>
              NIVEAU DES QUESTIONS
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              {Object.entries(LC).map(([k, c]) => (
                <button key={k} onClick={() => setDuelLevel(k)} style={{
                  padding: "8px 16px", borderRadius: 10, fontSize: 12, fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit",
                  background: duelLevel === k ? `${c.color}22` : "rgba(255,255,255,0.04)",
                  border: `2px solid ${duelLevel === k ? c.color + "60" : "rgba(255,255,255,0.08)"}`,
                  color: duelLevel === k ? c.color : "rgba(255,255,255,0.45)",
                }}>{c.emoji} {c.label}</button>
              ))}
            </div>
            <div style={{ padding: "10px 14px", borderRadius: 10, marginBottom: 18,
              background: "rgba(231,76,60,0.06)", border: "1px solid rgba(231,76,60,0.15)",
              color: "rgba(255,255,255,0.45)", fontSize: 12, lineHeight: 1.6 }}>
              ⏱ Challenger : <strong style={{ color: "#E74C3C" }}>60s</strong> · Défiant : <strong style={{ color: "#E74C3C" }}>55s</strong>.
              Le challenger commence. <strong>Bonne réponse = garde la main.</strong> Erreur = passe la main.
            </div>
            <button disabled={challenger === null} onClick={prepDuel} style={{
              width: "100%", padding: "13px", borderRadius: 12, fontSize: 14, fontWeight: 700,
              cursor: challenger !== null ? "pointer" : "not-allowed", fontFamily: "inherit",
              background: challenger !== null ? "rgba(231,76,60,0.18)" : "rgba(60,60,60,0.1)",
              border: `1px solid ${challenger !== null ? "rgba(231,76,60,0.4)" : "rgba(80,80,80,0.2)"}`,
              color: challenger !== null ? "#E74C3C" : "#555",
            }}>Préparer le Duel ⚔️</button>
          </div>
        )}

        {/* ── READY — questions drawn, timer not started ── */}
        {(phase === "ready" || phase === "duel") && challenger !== null && (
          <div>
            {/* Clocks */}
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              {([[turn, 0], [challenger, 1]]).map(([tIdx, ci]) => {
                const cs = clocks[ci];
                const isActive = ci === hand;
                const color = TC[tIdx];
                const tcol = cs <= 1000 ? "#E74C3C" : cs <= 2500 ? "#F1C40F" : "#2ECC71";
                return (
                  <div key={ci} style={{ flex: 1, padding: "12px 8px", borderRadius: 14, textAlign: "center",
                    background: isActive ? `${color}15` : "rgba(255,255,255,0.025)",
                    border: `2px solid ${isActive && phase === "duel" ? color + "60" : "rgba(255,255,255,0.07)"}`,
                    boxShadow: isActive && phase === "duel" ? `0 0 20px ${color}25` : "none",
                    transition: "all 0.3s" }}>
                    <div style={{ color, fontWeight: 700, fontSize: 11, marginBottom: 4 }}>
                      {TE[tIdx]} {teams[tIdx]?.name}
                    </div>
                    <div style={{ fontSize: 36, fontWeight: 900, color: phase === "ready" ? "rgba(255,255,255,0.3)" : tcol,
                      fontFamily: "monospace", lineHeight: 1 }}>
                      {fmtClock(cs)}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 9, marginTop: 2 }}>sec</div>
                    {isActive && phase === "duel" && (
                      <div style={{ marginTop: 4, color, fontSize: 9, fontWeight: 700, letterSpacing: 1 }}>▶ MAIN</div>
                    )}
                  </div>
                );
              })}
            </div>

            {phase === "ready" && (
              <button onClick={startTimer} style={{
                width: "100%", padding: "16px", borderRadius: 12, fontSize: 16, fontWeight: 900,
                cursor: "pointer", fontFamily: "inherit", marginBottom: 14,
                background: "rgba(231,76,60,0.22)", border: "2px solid rgba(231,76,60,0.55)",
                color: "#E74C3C", letterSpacing: 1,
              }}>▶ COMMENCER</button>
            )}

            {phase === "duel" && (
              <div style={{ textAlign: "center", marginBottom: 12, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                🎤 Au tour de <strong style={{ color: TC[handTeamIdx] }}>
                  {TE[handTeamIdx]} {teams[handTeamIdx]?.name}
                </strong>
              </div>
            )}

            {prevQ && (
              <div style={{ marginBottom: 10, padding: "7px 12px", borderRadius: 9,
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                display: "flex", gap: 8, alignItems: "baseline" }}>
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, flexShrink: 0 }}>↩ Rép. :</span>
                <span style={{ color: "rgba(212,160,23,0.75)", fontSize: 12, fontWeight: 600 }}>{prevQ.r}</span>
              </div>
            )}

            {activeQ && (
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "14px 16px",
                marginBottom: 14, border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, marginBottom: 8, letterSpacing: 1 }}>
                  {LC[duelLevel]?.emoji} {LC[duelLevel]?.label.toUpperCase()} · {activeQ.cat}
                </div>
                <div style={{ color: "#fff", fontSize: 15, fontWeight: 600, lineHeight: 1.55 }}>
                  {activeQ.q}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => nextQ(true)} style={{
                flex: 2, background: "rgba(46,204,113,0.18)", border: "1px solid rgba(46,204,113,0.4)",
                color: "#2ECC71", padding: "13px", borderRadius: 12, fontSize: 13, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit",
              }}>✓ Bonne réponse → passe la main</button>
              <button onClick={() => nextQ(false)} style={{
                flex: 1, background: "rgba(231,76,60,0.1)", border: "1px solid rgba(231,76,60,0.3)",
                color: "#E74C3C", padding: "13px", borderRadius: 12, fontSize: 12, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit",
              }}>✗ Erreur</button>
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {phase === "result" && challenger !== null && (() => {
          let winnerIdx = null;
          if (clocks[0] > 0 && clocks[1] <= 0) winnerIdx = turn;
          else if (clocks[1] > 0 && clocks[0] <= 0) winnerIdx = challenger;
          else if (clocks[0] > clocks[1]) winnerIdx = turn;
          else if (clocks[1] > clocks[0]) winnerIdx = challenger;
          return (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 56, marginBottom: 8 }}>{winnerIdx !== null ? "🏆" : "🤝"}</div>
              {winnerIdx !== null ? (
                <div style={{ marginBottom: 18 }}>
                  <div style={{ color: TC[winnerIdx], fontWeight: 800, fontSize: 20, marginBottom: 6 }}>
                    {TE[winnerIdx]} {teams[winnerIdx].name} GAGNE !
                  </div>
                  <div style={{ color: "#2ECC71", fontSize: 16, fontWeight: 700 }}>+5₽</div>
                  <div style={{ color: "#E74C3C", fontSize: 13, marginTop: 4, opacity: 0.7 }}>
                    {TE[winnerIdx === turn ? challenger : turn]} −3₽
                  </div>
                </div>
              ) : (
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, marginBottom: 18 }}>Égalité parfaite !</div>
              )}
              <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                {([[turn, 0], [challenger, 1]]).map(([tIdx, ci]) => (
                  <div key={ci} style={{ flex: 1, padding: "12px", borderRadius: 12,
                    background: tIdx === winnerIdx ? `${TC[tIdx]}18` : "rgba(255,255,255,0.03)",
                    border: `2px solid ${tIdx === winnerIdx ? TC[tIdx]+"50" : "rgba(255,255,255,0.06)"}` }}>
                    <div style={{ color: TC[tIdx], fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
                      {TE[tIdx]} {teams[tIdx].name}
                    </div>
                    <div style={{ fontWeight: 900, fontSize: 26,
                      color: clocks[ci] > 0 ? "#2ECC71" : "#E74C3C", fontFamily: "monospace" }}>
                      {fmtClock(clocks[ci])}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>restantes</div>
                  </div>
                ))}
              </div>
              <button onClick={applyAndClose} style={{
                width: "100%", background: "rgba(231,76,60,0.18)", border: "1px solid rgba(231,76,60,0.4)",
                color: "#E74C3C", padding: "13px", borderRadius: 12, fontSize: 14, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit",
              }}>Appliquer et fermer</button>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// FINALE SCREEN — Award ceremony + final ranking
// ═══════════════════════════════════════════════════════
function FinaleScreen({ teams, awardLeaders, onApplyAward, onClose }) {
  const [phase, setPhase] = useState(0);
  const showFinal = phase >= awardLeaders.length;
  const finalRanked = [...teams].map((t, i) => ({ ...t, idx: i }))
    .sort((a, b) => b.stars - a.stars || b.coins - a.coins);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,6,0.97)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16, overflowY: "auto" }}>
      <div style={{ maxWidth: 540, width: "100%", textAlign: "center", paddingBottom: 40 }}>

        {!showFinal ? (
          <div>
            <div style={{ fontSize: 60, marginBottom: 8 }}>🏅</div>
            <div style={{ color: "#F1C40F", fontWeight: 800, fontSize: 20, letterSpacing: 3, marginBottom: 22 }}>
              AWARDS DE FIN DE PARTIE
            </div>
            {(() => {
              const { award, leader, value } = awardLeaders[phase];
              return (
                <div style={{ background: "rgba(241,196,15,0.07)", border: "2px solid rgba(241,196,15,0.28)",
                  borderRadius: 18, padding: "24px", marginBottom: 20 }}>
                  <div style={{ fontSize: 52, marginBottom: 10 }}>{award.e}</div>
                  <div style={{ color: "#F1C40F", fontWeight: 800, fontSize: 20, marginBottom: 6 }}>{award.n}</div>
                  <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, marginBottom: 16 }}>{award.d}</div>
                  {leader ? (
                    <div>
                      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 8 }}>
                        {leader.map(l => (
                          <div key={l.idx} style={{ padding: "8px 18px", borderRadius: 10,
                            background: `${TC[l.idx]}20`, border: `2px solid ${TC[l.idx]}50` }}>
                            <span style={{ color: TC[l.idx], fontWeight: 700, fontSize: 15 }}>{TE[l.idx]} {l.name}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>
                        {value} {award.label}
                      </div>
                      <div style={{ color: "#2ECC71", fontWeight: 700, fontSize: 15, marginTop: 10 }}>+1 ⭐</div>
                    </div>
                  ) : (
                    <div style={{ color: "rgba(255,255,255,0.25)" }}>Aucune donnée</div>
                  )}
                </div>
              );
            })()}
            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 20 }}>
              {awardLeaders.map((_, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: "50%",
                  background: i < phase ? "#F1C40F" : i === phase ? "#fff" : "rgba(255,255,255,0.15)" }} />
              ))}
            </div>
            <button onClick={() => { onApplyAward(phase); setPhase(p => p + 1); }} style={{
              background: "rgba(241,196,15,0.14)", border: "2px solid rgba(241,196,15,0.35)",
              color: "#F1C40F", padding: "13px 36px", borderRadius: 14, fontSize: 15, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
            }}>
              {phase < awardLeaders.length - 1 ? "Award suivant →" : "Classement final →"}
            </button>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 64, marginBottom: 10 }}>🏆</div>
            <div style={{ color: "#F1C40F", fontWeight: 800, fontSize: 22, letterSpacing: 3, marginBottom: 24 }}>
              CLASSEMENT FINAL
            </div>
            {finalRanked.map((t, rank) => {
              const medals = ["🥇", "🥈", "🥉", "4️⃣"];
              return (
                <div key={t.idx} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 20px", borderRadius: 14, marginBottom: 8, textAlign: "left",
                  background: rank === 0 ? "rgba(241,196,15,0.1)" : `${TC[t.idx]}07`,
                  border: `2px solid ${rank === 0 ? "rgba(241,196,15,0.35)" : TC[t.idx]+"22"}`,
                }}>
                  <span style={{ fontSize: rank === 0 ? 34 : 24 }}>{medals[rank]}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: TC[t.idx], fontWeight: 800, fontSize: 16 }}>{TE[t.idx]} {t.name}</div>
                    <div style={{ display: "flex", gap: 12, marginTop: 3 }}>
                      <span style={{ color: "#F1C40F", fontWeight: 700, fontSize: 14 }}>⭐ {t.stars}</span>
                      <span style={{ color: "#D4A017", fontSize: 13 }}>🪙 {t.coins}</span>
                    </div>
                  </div>
                  {rank === 0 && <span style={{ fontSize: 30 }}>👑</span>}
                </div>
              );
            })}
            <button onClick={onClose} style={{
              marginTop: 16, background: "rgba(46,204,113,0.15)", border: "2px solid rgba(46,204,113,0.35)",
              color: "#2ECC71", padding: "13px 36px", borderRadius: 14, fontSize: 15, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
            }}>Fermer</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// AIMANT PICKER (2-team selection for chaos card)
// ═══════════════════════════════════════════════════════
function AimantPicker({ teams, onApply }) {
  const [sel, setSel] = useState([]);
  const toggle = (i) => setSel(p => p.includes(i) ? p.filter(x => x !== i) : p.length < 2 ? [...p, i] : p);
  return (
    <div>
      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginBottom: 8 }}>Choisir 2 équipes à échanger :</div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
        {teams.map((t, i) => (
          <button key={i} onClick={() => toggle(i)} style={{
            background: sel.includes(i) ? `${TC[i]}30` : `${TC[i]}10`,
            border: `2px solid ${sel.includes(i) ? TC[i] : TC[i]+"30"}`,
            color: TC[i], padding: "6px 12px", borderRadius: 8, fontSize: 12,
            fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}>{TE[i]} {t.name}</button>
        ))}
      </div>
      {sel.length === 2 && (
        <button onClick={() => onApply(sel[0], sel[1])} style={{
          width: "100%", padding: "9px", borderRadius: 10, fontSize: 13, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
          background: "rgba(142,68,173,0.25)", border: "1px solid rgba(142,68,173,0.5)", color: "#D4A0F5",
        }}>⚡ Appliquer l&apos;échange</button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// CHAOS BONUS Q — inline Expert question for "Question bonus" card
// ═══════════════════════════════════════════════════════
function ChaosBonusQ({ pool, teams, turn, upT }) {
  const [q, setQ] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  const draw = () => {
    if (!pool.length) return;
    const idx = Math.floor(Math.random() * pool.length);
    setQ(pool[idx]);
    setRevealed(false);
    setDone(false);
  };

  return (
    <div style={{ marginTop: 14, borderTop: "1px solid rgba(142,68,173,0.3)", paddingTop: 14 }}>
      {!q ? (
        <button onClick={draw} style={{
          width: "100%", padding: "10px", borderRadius: 10, fontSize: 13, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
          background: "rgba(231,76,60,0.15)", border: "1px solid rgba(231,76,60,0.4)", color: "#E74C3C",
        }}>📚 Tirer la question Expert</button>
      ) : (
        <div>
          <div style={{ background: "rgba(231,76,60,0.08)", border: "1px solid rgba(231,76,60,0.25)",
            borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
            <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 10, marginBottom: 6, letterSpacing: 1 }}>
              🔴 EXPERT · {q.cat}
            </div>
            <div style={{ color: "#fff", fontSize: 14, fontWeight: 600, lineHeight: 1.55 }}>{q.q}</div>
          </div>
          {revealed ? (
            <div>
              <div style={{ color: "#2ECC71", fontWeight: 700, fontSize: 14, marginBottom: 12,
                background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.3)",
                borderRadius: 10, padding: "10px 14px" }}>
                → {q.r}
              </div>
              {!done && (
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => { upT(turn, "coins", 8); setDone(true); }} style={{
                    flex: 2, padding: "10px", borderRadius: 10, fontSize: 13, fontWeight: 700,
                    cursor: "pointer", fontFamily: "inherit",
                    background: "rgba(46,204,113,0.18)", border: "1px solid rgba(46,204,113,0.4)", color: "#2ECC71",
                  }}>✓ Bonne réponse +8₽</button>
                  <button onClick={() => { upT(turn, "coins", -2); setDone(true); }} style={{
                    flex: 1, padding: "10px", borderRadius: 10, fontSize: 12, fontWeight: 700,
                    cursor: "pointer", fontFamily: "inherit",
                    background: "rgba(231,76,60,0.12)", border: "1px solid rgba(231,76,60,0.35)", color: "#E74C3C",
                  }}>✗ Faux −2₽</button>
                </div>
              )}
              {done && <div style={{ color: "#2ECC71", fontSize: 12, fontWeight: 700, textAlign: "center" }}>✓ Appliqué !</div>}
            </div>
          ) : (
            <button onClick={() => setRevealed(true)} style={{
              width: "100%", padding: "10px", borderRadius: 10, fontSize: 13, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
              background: "rgba(241,196,15,0.14)", border: "1px solid rgba(241,196,15,0.35)", color: "#F1C40F",
            }}>Révéler la réponse</button>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// COIN ROULETTE — spinning drum for unified ?₽ cases
// ═══════════════════════════════════════════════════════
// Unified coin weights — gaussian-like, centered ~+2, rare negatives
const COIN_WEIGHTS = [2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5, 1, 1, -1, -2, -3, -5];

function CoinSpinModal({ finalValue, isPlus, onDone }) {
  const signedVal = isPlus ? finalValue : -finalValue;
  const isPos = signedVal >= 0;
  const accentColor = isPos ? "#D4A017" : "#E74C3C";
  const bgColor     = isPos ? "#0d0900" : "#0d0000";

  const TILE_H   = 78;
  const VISIBLE  = 5;
  const TAPE_LEN = 72;
  // 3 checkpoints across the tape for the 3 speed phases
  const MID1   = 18;  // after phase-1 (fast ramp-up)
  const MID2   = 50;  // after phase-2 (sustained fast spin)
  const TARGET = 67;  // final landing position

  // Build tape: random draws from COIN_WEIGHTS, inject result at TARGET
  const [tape] = useState(() => {
    const t = Array.from({ length: TAPE_LEN }, () =>
      COIN_WEIGHTS[Math.floor(Math.random() * COIN_WEIGHTS.length)]
    );
    t[TARGET] = signedVal;
    return t;
  });

  const toY = (idx) => -(idx - Math.floor(VISIBLE / 2)) * TILE_H;
  const y1   = toY(MID1);
  const y2   = toY(MID2);
  const endY = toY(TARGET);

  // Separate y and css-transition so we can change each independently
  const [y,          setY]          = useState(0);
  const [cssTransit, setCssTransit] = useState("none");
  const [phase,      setPhase]      = useState("idle");
  const timers = useRef([]);

  useEffect(() => {
    const push = (fn, ms) => { const id = setTimeout(fn, ms); timers.current.push(id); };
    // Phase 1 — quick ease-in ramp (400 ms)
    push(() => { setCssTransit("transform 0.42s cubic-bezier(0.4,0,1,1)"); setY(y1); }, 60);
    // Phase 2 — sustained fast linear spin (900 ms)
    push(() => { setCssTransit("transform 0.9s linear"); setY(y2); }, 520);
    // Phase 3 — smooth deceleration to target (1100 ms ease-out)
    push(() => { setCssTransit("transform 1.1s cubic-bezier(0.12, 0.72, 0.25, 1)"); setY(endY); }, 1470);
    // Show result
    push(() => setPhase("land"),  2620);
    // Auto-dismiss
    push(() => { setPhase("done"); onDone(); }, 4100);
    return () => timers.current.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skip = () => {
    if (phase !== "land") return;
    timers.current.forEach(clearTimeout);
    onDone();
  };

  return (
    <div onClick={skip} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 9998,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      cursor: phase === "land" ? "pointer" : "default",
    }}>
      {/* Header label */}
      <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 700,
        letterSpacing: 3, marginBottom: 18, textTransform: "uppercase" }}>
        {isPos ? "🪙 CASE PIÈCES" : "💀 CASE PIÈCES"}
      </div>

      {/* Drum window */}
      <div style={{
        position: "relative", width: 220, height: TILE_H * VISIBLE,
        overflow: "hidden", borderRadius: 20,
        border: `2px solid ${accentColor}50`,
        background: bgColor,
        boxShadow: `0 0 70px ${accentColor}28, inset 0 0 30px ${accentColor}08`,
      }}>
        {/* Top fade */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, pointerEvents: "none",
          height: TILE_H * 1.8, background: `linear-gradient(to bottom, ${bgColor}, transparent)`, zIndex: 2 }} />
        {/* Bottom fade */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, pointerEvents: "none",
          height: TILE_H * 1.8, background: `linear-gradient(to top, ${bgColor}, transparent)`, zIndex: 2 }} />
        {/* Center selector frame */}
        <div style={{
          position: "absolute", pointerEvents: "none",
          top: TILE_H * Math.floor(VISIBLE / 2), left: 8, right: 8, height: TILE_H,
          border: `2px solid ${accentColor}70`,
          borderRadius: 10, zIndex: 3,
          boxShadow: `0 0 18px ${accentColor}30, inset 0 0 12px ${accentColor}12`,
        }} />

        {/* Scrolling tape */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "stretch",
          transform: `translateY(${y}px)`,
          transition: cssTransit,
          willChange: "transform",
        }}>
          {tape.map((v, i) => {
            const pos = v > 0;
            const neg = v < 0;
            const isCenter = phase === "land" && i === TARGET;
            return (
              <div key={i} style={{
                height: TILE_H, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: isCenter ? 56 : 38,
                fontWeight: 900, fontFamily: "monospace",
                color: pos ? "#D4A017" : neg ? "#E74C3C" : "rgba(255,255,255,0.3)",
                transform: isCenter ? "scale(1.12)" : "scale(1)",
                transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), font-size 0.3s ease",
                textShadow: isCenter
                  ? `0 0 32px ${pos ? "#D4A017" : "#E74C3C"}cc`
                  : "none",
              }}>
                {v > 0 ? "+" : ""}{v}₽
              </div>
            );
          })}
        </div>
      </div>

      {/* Result overlay once landed */}
      {phase === "land" && (
        <div style={{ marginTop: 22, textAlign: "center" }}>
          <div style={{
            fontSize: 32, fontWeight: 900,
            color: isPos ? "#D4A017" : "#E74C3C",
            textShadow: `0 0 24px ${accentColor}88`,
          }}>
            {signedVal > 0 ? "+" : ""}{signedVal}₽
          </div>
          <div style={{ marginTop: 8, color: "rgba(255,255,255,0.28)", fontSize: 11 }}>
            Toucher pour continuer
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// SHOP MODAL — opened when landing on a shop case
// ═══════════════════════════════════════════════════════
function ShopModal({ team, onBuy, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 900,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#0c1525", border: "2px solid rgba(39,174,96,0.45)", borderRadius: 20,
        padding: 24, maxWidth: 430, width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ color: "#27AE60", fontWeight: 800, fontSize: 20, letterSpacing: 1 }}>🛒 BOUTIQUE</div>
          <button onClick={onClose} style={{ background: "none", border: "none",
            color: "rgba(255,255,255,0.3)", fontSize: 20, cursor: "pointer", fontFamily: "inherit" }}>✕</button>
        </div>
        <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, marginBottom: 16 }}>
          Budget : <strong style={{ color: "#D4A017" }}>{team.coins}₽</strong>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {SI.map((item, i) => {
            const canAfford = team.coins >= item.c;
            const owned = (team.items ?? []).filter(x => x === i).length;
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 14px", borderRadius: 12,
                background: canAfford ? "rgba(39,174,96,0.06)" : "rgba(231,76,60,0.04)",
                border: `2px solid ${canAfford ? "rgba(39,174,96,0.4)" : "rgba(231,76,60,0.25)"}`,
              }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{item.e}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>{item.n}</span>
                    <span style={{ padding: "1px 7px", borderRadius: 6,
                      background: canAfford ? "rgba(39,174,96,0.2)" : "rgba(231,76,60,0.15)",
                      color: canAfford ? "#27AE60" : "#E74C3C", fontSize: 10, fontWeight: 700 }}>
                      {item.c}₽
                    </span>
                    {owned > 0 && (
                      <span style={{ padding: "1px 6px", borderRadius: 6,
                        background: "rgba(241,196,15,0.15)", color: "#F1C40F", fontSize: 10 }}>
                        ×{owned}
                      </span>
                    )}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.42)", fontSize: 11, marginTop: 3, lineHeight: 1.4 }}>{item.d}</div>
                </div>
                <button
                  disabled={!canAfford}
                  onClick={() => onBuy(i)}
                  style={{
                    padding: "7px 13px", borderRadius: 8, fontSize: 11, fontWeight: 700, flexShrink: 0,
                    cursor: canAfford ? "pointer" : "not-allowed", fontFamily: "inherit",
                    background: canAfford ? "rgba(39,174,96,0.22)" : "rgba(80,80,80,0.1)",
                    border: `1px solid ${canAfford ? "rgba(39,174,96,0.5)" : "rgba(80,80,80,0.2)"}`,
                    color: canAfford ? "#27AE60" : "#555",
                  }}>
                  Acheter
                </button>
              </div>
            );
          })}
        </div>
        <button onClick={onClose} style={{
          marginTop: 14, width: "100%", padding: "10px", borderRadius: 10,
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600,
          cursor: "pointer", fontFamily: "inherit",
        }}>Fermer la boutique</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// STAR BUY MODAL — confirms star purchase on landing
// ═══════════════════════════════════════════════════════
function StarBuyModal({ team, onBuy, onSkip }) {
  const canAfford = team.coins >= STAR_COST;
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 10); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 901,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#0c1525", border: "2px solid rgba(241,196,15,0.5)", borderRadius: 20,
        padding: 28, maxWidth: 360, width: "100%", textAlign: "center",
        transform: visible ? "scale(1) translateY(0)" : "scale(0.82) translateY(24px)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.22s ease",
      }}>
        <div style={{ fontSize: 56, marginBottom: 8 }}>⭐</div>
        <div style={{ color: "#F1C40F", fontWeight: 800, fontSize: 20, marginBottom: 8 }}>
          Acheter l&apos;Étoile ?
        </div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 20, lineHeight: 1.7 }}>
          Coût : <strong style={{ color: "#F1C40F" }}>{STAR_COST}₽</strong>
          <br />
          Budget : <strong style={{ color: canAfford ? "#27AE60" : "#E74C3C" }}>{team.coins}₽</strong>
        </div>
        {!canAfford && (
          <div style={{ marginBottom: 14, color: "#E74C3C", fontSize: 12, fontStyle: "italic" }}>
            Pas assez de pièces pour acheter l&apos;étoile.
          </div>
        )}
        <div style={{ display: "flex", gap: 10 }}>
          <button disabled={!canAfford} onClick={onBuy} style={{
            flex: 2, padding: "12px", borderRadius: 12, fontSize: 14, fontWeight: 700,
            cursor: canAfford ? "pointer" : "not-allowed", fontFamily: "inherit",
            background: canAfford ? "rgba(241,196,15,0.18)" : "rgba(80,80,80,0.1)",
            border: `2px solid ${canAfford ? "rgba(241,196,15,0.5)" : "rgba(80,80,80,0.2)"}`,
            color: canAfford ? "#F1C40F" : "#555",
          }}>⭐ Acheter ({STAR_COST}₽)</button>
          <button onClick={onSkip} style={{
            flex: 1, padding: "12px", borderRadius: 12, fontSize: 13, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.45)",
          }}>Passer</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// TELEPORT MODAL — ask if team wants to teleport (5₽)
// ═══════════════════════════════════════════════════════
function TeleportModal({ team, onUse, onSkip }) {
  const canAfford = team.coins >= TELEPORT_COST;
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.88)", zIndex:902,
      display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:"#0c1525", border:"2px solid rgba(0,188,212,0.5)", borderRadius:20,
        padding:28, maxWidth:360, width:"100%", textAlign:"center" }}>
        <div style={{ fontSize:52, marginBottom:8 }}>⚡</div>
        <div style={{ color:"#00BCD4", fontWeight:800, fontSize:20, marginBottom:10 }}>
          Téléporteur !
        </div>
        <div style={{ color:"rgba(255,255,255,0.55)", fontSize:13, marginBottom:20, lineHeight:1.8 }}>
          Utiliser le téléporteur ?<br/>
          Coût : <strong style={{ color:"#00BCD4" }}>{TELEPORT_COST}₽</strong>
          &nbsp;·&nbsp;
          Budget : <strong style={{ color: canAfford ? "#27AE60" : "#E74C3C" }}>{team.coins}₽</strong>
        </div>
        {!canAfford && (
          <div style={{ marginBottom:14, color:"#E74C3C", fontSize:12, fontStyle:"italic" }}>
            Pas assez de pièces pour téléporter.
          </div>
        )}
        <div style={{ display:"flex", gap:10 }}>
          <button disabled={!canAfford} onClick={onUse} style={{
            flex:2, padding:"12px", borderRadius:12, fontSize:14, fontWeight:700,
            cursor: canAfford ? "pointer" : "not-allowed", fontFamily:"inherit",
            background: canAfford ? "rgba(0,188,212,0.18)" : "rgba(80,80,80,0.1)",
            border:`2px solid ${canAfford ? "rgba(0,188,212,0.5)" : "rgba(80,80,80,0.2)"}`,
            color: canAfford ? "#00BCD4" : "#555",
          }}>⚡ Utiliser ({TELEPORT_COST}₽)</button>
          <button onClick={onSkip} style={{
            flex:1, padding:"12px", borderRadius:12, fontSize:13, fontWeight:700,
            cursor:"pointer", fontFamily:"inherit",
            background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)",
            color:"rgba(255,255,255,0.45)",
          }}>Passer</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// QUESTION MODAL — pops when pion lands on a question case
// Shows question for the active team; no team picker needed
// ═══════════════════════════════════════════════════════
function QuestionModal({ teams, turn, setTeams, onClose }) {
  const [level, setLevel] = useState(null);
  const [q, setQ] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);
  const [amnesiaConsumed, setAmnesiaConsumed] = useState(false);

  // Snapshot amnesia state at the time the modal opens
  const amnesiaRef = useRef(false);
  useEffect(() => {
    amnesiaRef.current = !!window._amnesia;
    setAmnesiaConsumed(amnesiaRef.current);
  }, []);

  const draw = (lv) => {
    const allPool = window._Q?.[lv] ?? [];
    if (!allPool.length) return;
    const usedIdxs = window._usedQ?.[lv] ?? [];
    const available = allPool
      .map((q, i) => ({ q, i }))
      .filter(({ i }) => !usedIdxs.includes(i));
    // If all questions exhausted for this level, reset that level
    const source = available.length ? available : allPool.map((q, i) => ({ q, i }));
    const picked = source[Math.floor(Math.random() * source.length)];
    window._markUsed?.(lv, picked.i);
    setQ({ ...picked.q, level: lv });
    setLevel(lv);
    setRevealed(false);
    setDone(false);
  };

  const giveCoins = () => {
    const coins = amnesiaRef.current ? 0 : (LC[level]?.val ?? 1);
    setTeams(prev => prev.map((t, i) => i === turn
      ? { ...t, coins: t.coins + coins, qOk: t.qOk + 1 }
      : t));
    if (amnesiaRef.current) window._clearAmnesia?.(); // consume amnesia
    setDone(true);
  };

  const applyPenalty = () => {
    setTeams(prev => prev.map((t, i) => i === turn
      ? { ...t, coins: Math.max(0, t.coins - 2) }
      : t));
    setDone(true);
  };

  const activeTeam = teams[turn];

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:906,
      display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:"#0c1525", border:"2px solid rgba(52,152,219,0.45)", borderRadius:20,
        padding:24, maxWidth:520, width:"100%", maxHeight:"92vh", overflowY:"auto" }}>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ color:"#3498DB", fontWeight:800, fontSize:20, letterSpacing:1 }}>❓ QUESTION</div>
            <span style={{ padding:"3px 10px", borderRadius:8,
              background:`${TC[turn]}22`, border:`1px solid ${TC[turn]}40`,
              color:TC[turn], fontSize:12, fontWeight:700 }}>
              {TE[turn]} {activeTeam.name}
            </span>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none",
            color:"rgba(255,255,255,0.3)", fontSize:20, cursor:"pointer", fontFamily:"inherit" }}>✕</button>
        </div>

        {/* Level selector */}
        {!q && (
          <div>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:13, marginBottom:14, textAlign:"center" }}>
              Choisir le niveau
            </div>
            <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
              {Object.entries(LC).map(([k, c]) => (
                <button key={k} onClick={() => draw(k)} style={{
                  padding:"12px 24px", borderRadius:14, fontSize:14, fontWeight:700,
                  cursor:"pointer", fontFamily:"inherit",
                  background:`${c.color}18`, border:`2px solid ${c.color}42`, color:c.color,
                }}>
                  {c.emoji} {c.label}
                  <br /><span style={{ fontSize:10, opacity:0.7 }}>{c.coins}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Question card */}
        {q && (
          <div>
            {amnesiaConsumed && (
              <div style={{
                padding:"8px 14px", borderRadius:10, marginBottom:12,
                background:"rgba(142,68,173,0.22)", border:"1px solid rgba(142,68,173,0.45)",
                color:"#D4A0F5", fontSize:12, fontWeight:700, textAlign:"center",
              }}>🧠 Amnésie active — cette question ne rapporte aucune pièce</div>
            )}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
              marginBottom:16, flexWrap:"wrap", gap:8 }}>
              <span style={{
                padding:"4px 14px", borderRadius:8,
                background:`${LC[q.level].color}22`, color:LC[q.level].color,
                fontSize:12, fontWeight:700, letterSpacing:1,
              }}>
                {LC[q.level].emoji} {LC[q.level].label.toUpperCase()} · {LC[q.level].coins}
              </span>
              <span style={{
                padding:"4px 12px", borderRadius:8,
                background:"rgba(255,255,255,0.07)", color:"rgba(255,255,255,0.5)",
                fontSize:11, fontWeight:600,
              }}>{q.cat}</span>
            </div>

            <div style={{
              fontSize:"clamp(16px,3vw,24px)", fontWeight:600, color:"#fff",
              marginBottom:24, lineHeight:1.5, textAlign:"center",
            }}>
              {q.q}
            </div>

            {!revealed ? (
              <div style={{ textAlign:"center" }}>
                <button onClick={() => setRevealed(true)} style={{
                  background:"rgba(241,196,15,0.14)", border:"2px solid rgba(241,196,15,0.3)",
                  color:"#F1C40F", padding:"12px 38px", borderRadius:14,
                  fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
                }}>Révéler la réponse</button>
              </div>
            ) : (
              <div>
                <div style={{
                  padding:"14px 20px", borderRadius:12, marginBottom:18,
                  background:"rgba(46,204,113,0.12)", border:"1px solid rgba(46,204,113,0.3)",
                  textAlign:"center", fontSize:"clamp(18px,3vw,28px)", fontWeight:800, color:"#2ECC71",
                }}>
                  {q.r}
                </div>

                {!done ? (
                  <div style={{ display:"flex", gap:10, marginBottom:12 }}>
                    <button onClick={giveCoins} style={{
                      flex:2, padding:"12px", borderRadius:12, fontSize:14, fontWeight:700,
                      cursor:"pointer", fontFamily:"inherit",
                      background:"rgba(46,204,113,0.18)", border:"1px solid rgba(46,204,113,0.4)", color:"#2ECC71",
                    }}>✓ Bonne réponse {amnesiaConsumed ? "0₽ 🧠" : LC[q.level].coins}</button>
                    {q.level === "expert" ? (
                      <button onClick={applyPenalty} style={{
                        flex:1, padding:"12px", borderRadius:12, fontSize:13, fontWeight:700,
                        cursor:"pointer", fontFamily:"inherit",
                        background:"rgba(231,76,60,0.12)", border:"1px solid rgba(231,76,60,0.35)", color:"#E74C3C",
                      }}>✗ Faux −2₽</button>
                    ) : (
                      <button onClick={() => setDone(true)} style={{
                        flex:1, padding:"12px", borderRadius:12, fontSize:13, fontWeight:700,
                        cursor:"pointer", fontFamily:"inherit",
                        background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)",
                        color:"rgba(255,255,255,0.45)",
                      }}>✗ Mauvaise</button>
                    )}
                  </div>
                ) : (
                  <div style={{ color:"#2ECC71", fontSize:13, fontWeight:700,
                    textAlign:"center", marginBottom:12 }}>✓ Appliqué !</div>
                )}

                <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
                  <button onClick={() => { setQ(null); setDone(false); }} style={{
                    padding:"8px 18px", borderRadius:10, fontSize:12, fontWeight:700,
                    cursor:"pointer", fontFamily:"inherit",
                    background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)",
                    color:"rgba(255,255,255,0.5)",
                  }}>↩ Autre niveau</button>
                  <button onClick={onClose} style={{
                    padding:"8px 22px", borderRadius:10, fontSize:12, fontWeight:700,
                    cursor:"pointer", fontFamily:"inherit",
                    background:"rgba(52,152,219,0.18)", border:"1px solid rgba(52,152,219,0.4)",
                    color:"#3498DB",
                  }}>✓ Fermer</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// MINI-GAME MODAL — pops automatically at end of turn
// Phases: rules → ranking → close + advance turn
// ═══════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════
// FENÊTRE MJ MINI-JEU (nouvelle fenêtre navigateur)
// ══════════════════════════════════════════════════════════
function openMGMJWindow(game) {
  const w = window.open("", `mj_mg_${game.id}`, "width=860,height=700,resizable=yes,scrollbars=yes");
  if (!w) { alert("Autorisez les pop-ups pour cette page."); return; }
  const fmt   = { tous: "#E74C3C", teams: "#00BCD4", solo: "#2ECC71", tournoi: "#8E44AD", coop: "#D35400" };
  const color = fmt[game.format] || "#D4A0F5";
  const c     = game.content;
  const items = c?.items || [];

  const escH  = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

  let contentHTML = "";
  if (!c || !items.length) {
    contentHTML = `<p class="note">Pas de contenu — jouez selon les règles.</p>`;
  } else if (c.type === "questions") {
    contentHTML = items.map((q, i) => `
      <div class="card" id="q${i}">
        <div class="meta">${escH(q.cat||"")}</div>
        <div class="question">${escH(q.q)}</div>
        <div class="answer hidden" id="a${i}">${escH(q.r)}</div>
        <button onclick="rev('a${i}',this)">Révéler la réponse</button>
      </div>`).join("");
  } else if (c.type === "taboo") {
    contentHTML = `<div id="nav"><button onclick="go(-1)">← Préc</button><span id="counter">1 / ${items.length}</span><button onclick="go(1)">Suiv →</button></div>` +
      items.map((t, i) => `<div class="card taboo-card ${i===0?"":"hidden"}" id="t${i}"><div class="big-word">${escH(t.word)}</div>${(t.forbidden||[]).map(f=>`<div class="forbidden">🚫 ${escH(f)}</div>`).join("")}</div>`).join("");
  } else if (c.type === "themes") {
    contentHTML = `<div class="grid">${items.map((t,i)=>`<div class="chip" id="chip${i}" onclick="this.classList.toggle('used')">${t.emoji||""} ${escH(t.label||t)}</div>`).join("")}</div>`;
  } else if (c.type === "statements") {
    contentHTML = `<div id="nav"><button onclick="go(-1)">← Préc</button><span id="counter">1 / ${items.length}</span><button onclick="go(1)">Suiv →</button></div>` +
      items.map((s, i) => `<div class="card ${i===0?"":"hidden"}" id="s${i}"><div class="question">${escH(s.text)}</div><div class="answer hidden ${s.answer==="VRAI"?"vrai":"faux"}" id="a${i}">${escH(s.answer)}${s.note?`<div class="note">💡 ${escH(s.note)}</div>`:""}</div><button onclick="rev('a${i}',this)">Révéler</button></div>`).join("");
  } else if (c.type === "clues") {
    contentHTML = `<div id="nav"><button onclick="go(-1)">← Préc</button><span id="counter">1 / ${items.length}</span><button onclick="go(1)">Suiv →</button></div>` +
      items.map((s, i) => `<div class="card ${i===0?"":"hidden"}" id="s${i}"><div id="clues${i}"></div><button onclick="nextClue(${i},${JSON.stringify(s.clues).replace(/</g,"\\u003c")},this)">Indice 1</button><div class="answer hidden" id="a${i}">${escH(s.answer)}</div><button class="hidden" id="revbtn${i}" onclick="rev('a${i}',this)">Révéler la réponse</button></div>`).join("");
  } else if (c.type === "words") {
    contentHTML = `<div id="nav"><button onclick="go(-1)">← Préc</button><span id="counter">1 / ${items.length}</span><button onclick="go(1)">Suiv →</button></div>` +
      items.map((w, i) => `<div class="card ${i===0?"":"hidden"}" id="s${i}"><div class="big-word">${escH(w)}</div></div>`).join("");
  } else if (c.type === "definitions") {
    contentHTML = `<div id="nav"><button onclick="go(-1)">← Préc</button><span id="counter">1 / ${items.length}</span><button onclick="go(1)">Suiv →</button></div>` +
      items.map((d, i) => `<div class="card ${i===0?"":"hidden"}" id="s${i}"><div class="big-word">${escH(d.word)}</div><div class="answer hidden" id="a${i}"><em>${escH(d.def)}</em></div><button onclick="rev('a${i}',this)">Révéler définition</button></div>`).join("");
  } else if (c.type === "top5") {
    contentHTML = `<div id="nav"><button onclick="go(-1)">← Préc</button><span id="counter">1 / ${items.length}</span><button onclick="go(1)">Suiv →</button></div>` +
      items.map((t, i) => `<div class="card ${i===0?"":"hidden"}" id="s${i}"><div class="question">${escH(t.q)}</div><div class="answer hidden" id="a${i}">${(t.answers||[]).map((a,j)=>`<div><b>${j+1}.</b> ${escH(a)}</div>`).join("")}</div><button onclick="rev('a${i}',this)">Révéler classement</button></div>`).join("");
  } else if (c.type === "pairs") {
    contentHTML = `<div id="nav"><button onclick="go(-1)">← Préc</button><span id="counter">1 / ${items.length}</span><button onclick="go(1)">Suiv →</button></div>` +
      items.map((p, i) => `<div class="card ${i===0?"":"hidden"}" id="s${i}"><div class="big-word">${escH(p.a)}</div><div class="answer hidden" id="a${i}">${escH(p.b)}</div><button onclick="rev('a${i}',this)">Révéler mot B</button></div>`).join("");
  } else if (c.type === "series") {
    contentHTML = `<div id="nav"><button onclick="go(-1)">← Préc</button><span id="counter">1 / ${items.length}</span><button onclick="go(1)">Suiv →</button></div>` +
      items.map((s, i) => {
        const sh = [...(s.items||[])].sort((a,b)=>a.localeCompare(b));
        return `<div class="card ${i===0?"":"hidden"}" id="s${i}"><b>${escH(s.title)}</b><div class="chips">${sh.map(x=>`<span class="chip">${escH(x)}</span>`).join("")}</div><div class="answer hidden" id="a${i}">${(s.items||[]).map((x,j)=>`<div>${j+1}. ${escH(x)}</div>`).join("")}</div><button onclick="rev('a${i}',this)">Révéler l'ordre</button></div>`;
      }).join("");
  } else {
    contentHTML = `<p class="note">${escH(c.title||"")}</p>`;
  }

  // Score panel HTML
  const teamsArr = ["🔴 Équipe 1","🔵 Équipe 2","🟢 Équipe 3","🟡 Équipe 4"];
  const scorePanel = `<div class="score-panel"><div class="score-title">SCORES</div>${teamsArr.map((t,i)=>`<div class="score-row"><span class="team-name" style="color:${["#E74C3C","#3498DB","#2ECC71","#F39C12"][i]}">${t}</span><button onclick="adj(${i},-1)">−</button><span id="sc${i}" class="sc">0</span><button onclick="adj(${i},+1)">+</button></div>`).join("")}</div>`;

  const rulesHTML = game.rules?.map(r=>`<li>${escH(r)}</li>`).join("")||"";

  w.document.open();
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>MJ — ${escH(game.name)}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0c1525;color:#fff;font-family:system-ui,sans-serif;padding:18px;min-height:100vh;display:flex;flex-direction:column;gap:14px}
h1{color:${color};font-size:20px;font-weight:800;letter-spacing:1px}
.desc{color:rgba(255,255,255,0.55);font-size:13px;line-height:1.5}
.rules{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:12px 16px}
.rules li{color:rgba(255,255,255,0.6);font-size:12px;margin-bottom:3px;margin-left:16px}
.card{background:rgba(255,255,255,0.05);border:1px solid ${color}30;border-radius:14px;padding:18px 16px;display:flex;flex-direction:column;gap:10px}
.taboo-card{align-items:center;gap:14px}
.meta{color:rgba(255,255,255,0.3);font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase}
.question{font-size:16px;font-weight:600;line-height:1.5}
.big-word{font-size:28px;font-weight:900;text-align:center;letter-spacing:1px}
.answer{color:#2ECC71;font-size:15px;font-weight:700;margin-top:4px;padding:10px;background:rgba(46,204,113,0.08);border-radius:8px}
.answer.vrai{color:#2ECC71;background:rgba(46,204,113,0.1)}
.answer.faux{color:#E74C3C;background:rgba(231,76,60,0.1)}
.answer .note{color:rgba(255,255,255,0.4);font-size:11px;font-style:italic;margin-top:6px;font-weight:400}
.forbidden{display:flex;align-items:center;gap:8px;padding:6px 10px;background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.15);border-radius:8px;font-size:14px;font-weight:600;width:100%}
.hidden{display:none!important}
button{background:${color}22;border:1px solid ${color}50;color:${color};padding:8px 16px;border-radius:10px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;align-self:flex-start}
button:hover{background:${color}35}
#nav{display:flex;align-items:center;gap:10px;margin-bottom:4px}
#nav button{padding:6px 14px}
#counter{color:rgba(255,255,255,0.35);font-size:11px;flex:1;text-align:center}
.grid,.chips{display:flex;flex-wrap:wrap;gap:6px}
.chip{padding:7px 12px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.8);font-size:12px;cursor:pointer;user-select:none;transition:all 0.15s}
.chip.used{opacity:.3;text-decoration:line-through;background:rgba(255,255,255,0.02);border-color:rgba(255,255,255,0.04)}
.score-panel{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:12px 16px;margin-top:auto}
.score-title{color:rgba(255,255,255,0.3);font-size:9px;font-weight:700;letter-spacing:1px;margin-bottom:10px}
.score-row{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.team-name{font-weight:700;font-size:13px;flex:1}
.score-row button{width:28px;height:28px;padding:0;text-align:center;font-size:16px;border-radius:6px;align-self:auto}
.sc{min-width:30px;text-align:center;font-weight:800;font-size:16px;color:#fff}
.note{color:rgba(255,255,255,0.4);font-size:12px;font-style:italic}
</style></head><body>
<h1>${escH(game.emoji)} ${escH(game.name)}</h1>
<p class="desc">${escH(game.desc)}</p>
${rulesHTML ? `<div class="rules"><ul>${rulesHTML}</ul></div>` : ""}
<div id="content">${contentHTML}</div>
${scorePanel}
<script>
const scores=[0,0,0,0];
function adj(i,d){scores[i]=Math.max(0,scores[i]+d);document.getElementById('sc'+i).textContent=scores[i];}
function rev(id,btn){document.getElementById(id).classList.remove('hidden');btn.style.display='none';}
let cur=0,total=${items.length};
function go(d){
  const cards=document.querySelectorAll('[id^="s"],[id^="t"]');
  const prefix=${c?.type==="taboo"?'"t"':'"s"'};
  const el=document.getElementById(prefix+cur);
  if(el)el.classList.add('hidden');
  cur=Math.max(0,Math.min(total-1,cur+d));
  const el2=document.getElementById(prefix+cur);
  if(el2)el2.classList.remove('hidden');
  const ct=document.getElementById('counter');
  if(ct)ct.textContent=(cur+1)+' / '+total;
}
const clueCounters={};
function nextClue(i,clues,btn){
  clueCounters[i]=(clueCounters[i]||0)+1;
  const c=clueCounters[i];
  const el=document.getElementById('clues'+i);
  if(el)el.innerHTML=clues.slice(0,c).map((x,j)=>'<div style="margin-bottom:6px;font-size:13px;color:rgba(255,255,255,0.8)"><b>'+(j+1)+'.</b> '+x+'</div>').join('');
  if(c>=clues.length){btn.style.display='none';const rb=document.getElementById('revbtn'+i);if(rb)rb.classList.remove('hidden');}
  else btn.textContent='Indice '+(c+1);
}
<\/script></body></html>`);
  w.document.close();
}

// ══════════════════════════════════════════════════════════
// SCORE TRACKER
// ══════════════════════════════════════════════════════════
function ScoreTracker({ teams, scores, setScores }) {
  return (
    <div style={{
      marginTop: 14, padding: "10px 12px", borderRadius: 12,
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
    }}>
      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>
        SCORES EN COURS
      </div>
      {teams.map((tm, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: i < 3 ? 6 : 0 }}>
          <span style={{ color: TC[i], fontWeight: 700, fontSize: 12, flex: 1 }}>{TE[i]} {tm.name}</span>
          <button onClick={() => setScores(s => { const n = [...s]; n[i] = Math.max(0, n[i] - 1); return n; })}
            style={{ width: 26, height: 26, borderRadius: 6, background: "rgba(231,76,60,0.12)", border: "1px solid rgba(231,76,60,0.25)", color: "#E74C3C", fontSize: 16, cursor: "pointer", fontFamily: "inherit", lineHeight: 1 }}>−</button>
          <span style={{ minWidth: 28, textAlign: "center", color: "#fff", fontWeight: 800, fontSize: 16 }}>{scores[i]}</span>
          <button onClick={() => setScores(s => { const n = [...s]; n[i] += 1; return n; })}
            style={{ width: 26, height: 26, borderRadius: 6, background: "rgba(46,204,113,0.12)", border: "1px solid rgba(46,204,113,0.25)", color: "#2ECC71", fontSize: 16, cursor: "pointer", fontFamily: "inherit", lineHeight: 1 }}>+</button>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// PLAY PHASE — carte interactive + score
// ══════════════════════════════════════════════════════════
function PlayPhase({ game, teams, scores, setScores, liveContent, setLiveContent, onDone }) {
  const [idx, setIdx]           = useState(0);
  const [revealMap, setRevealMap] = useState({});
  const [usedSet, setUsedSet]   = useState(new Set());
  const fmt = FORMAT[game.format] || {};
  const reveal = (key, val = true) => setRevealMap(p => ({ ...p, [key]: val }));

  const content = liveContent;

  if (!content || !content.items || content.items.length === 0) {
    return (
      <div>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: 44, marginBottom: 8 }}>{game.emoji}</div>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>Jouez selon les règles. Notez les scores ci-dessous.</p>
        </div>
        <ScoreTracker teams={teams} scores={scores} setScores={setScores} />
        <button onClick={onDone} style={{ marginTop: 14, width: "100%", padding: "12px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", background: `${fmt.color || "#D4A0F5"}22`, border: `2px solid ${fmt.color || "#D4A0F5"}50`, color: fmt.color || "#D4A0F5" }}>
          → Voir le classement
        </button>
      </div>
    );
  }

  const { type, items } = content;
  const total = items.length;

  // ── THEMES : grille cochable ──────────────────────────
  if (type === "themes") {
    return (
      <div>
        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>
          {content.title} — appuyez pour cocher
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {items.map((item, i) => {
            const used = usedSet.has(i);
            return (
              <div key={i} onClick={() => setUsedSet(s => { const n = new Set(s); used ? n.delete(i) : n.add(i); return n; })}
                style={{
                  padding: "7px 12px", borderRadius: 10, cursor: "pointer", userSelect: "none",
                  background: used ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.06)",
                  border: `1px solid ${used ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.12)"}`,
                  display: "flex", alignItems: "center", gap: 6,
                  opacity: used ? 0.3 : 1, textDecoration: used ? "line-through" : "none",
                  transition: "all 0.15s",
                }}>
                {item.emoji && <span style={{ fontSize: 13 }}>{item.emoji}</span>}
                <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>{item.label || item}</span>
              </div>
            );
          })}
        </div>
        <ScoreTracker teams={teams} scores={scores} setScores={setScores} />
        <button onClick={onDone} style={{ marginTop: 12, width: "100%", padding: "12px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", background: `${fmt.color || "#D4A0F5"}22`, border: `2px solid ${fmt.color || "#D4A0F5"}50`, color: fmt.color || "#D4A0F5" }}>
          → Voir le classement
        </button>
      </div>
    );
  }

  // ── CARTE PAR CARTE ───────────────────────────────────
  const item    = items[idx];
  const cardKey = `play-${game.id}-${idx}`;

  const bigCard = {
    padding: "18px 16px", borderRadius: 14, minHeight: 130,
    background: "rgba(255,255,255,0.04)", border: `1px solid ${fmt.color || "#D4A0F5"}30`,
    display: "flex", flexDirection: "column", gap: 10, marginBottom: 12,
  };
  const bigTxt  = { color: "#fff", fontSize: 15, fontWeight: 600, lineHeight: 1.55 };
  const catBadge = { display: "inline-block", padding: "2px 8px", borderRadius: 6, fontSize: 9, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)", alignSelf: "flex-start", letterSpacing: 1, fontWeight: 700 };
  const revBtn  = (label, fn) => (
    <button onClick={fn} style={{ padding: "8px 16px", borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", alignSelf: "flex-start", background: `${fmt.color || "#D4A0F5"}22`, border: `1px solid ${fmt.color || "#D4A0F5"}50`, color: fmt.color || "#D4A0F5" }}>{label}</button>
  );
  const ansBox  = (text, note) => (
    <div>
      <div style={{ color: "#2ECC71", fontWeight: 700, fontSize: 15 }}>→ {text}</div>
      {note && <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 4, fontStyle: "italic" }}>💡 {note}</div>}
    </div>
  );

  const renderCard = () => {
    if (type === "questions") {
      const canDelete = !!setLiveContent;
      const doDelete  = () => {
        const ni = items.filter((_, j) => j !== idx);
        setLiveContent(p => ({ ...p, items: ni }));
        setIdx(i => Math.min(i, ni.length - 1));
      };
      return (
        <div style={bigCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            {item.cat ? <span style={catBadge}>{item.cat}</span> : <span />}
            {canDelete && <button onClick={doDelete} style={{ background: "none", border: "none", color: "rgba(231,76,60,0.5)", cursor: "pointer", fontSize: 17, padding: "0 2px" }}>×</button>}
          </div>
          <p style={bigTxt}>{item.q}</p>
          {revealMap[cardKey] ? ansBox(item.r) : revBtn("Révéler la réponse", () => reveal(cardKey))}
        </div>
      );
    }

    if (type === "taboo") return (
      <div style={{ ...bigCard, alignItems: "center", gap: 14 }}>
        <div style={{ color: "#fff", fontWeight: 900, fontSize: 28, textAlign: "center", letterSpacing: 1 }}>{item.word}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
          {(item.forbidden || []).map((w, j) => (
            <div key={j} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 8, background: "rgba(231,76,60,0.08)", border: "1px solid rgba(231,76,60,0.15)" }}>
              <span style={{ color: "#E74C3C", fontSize: 12 }}>🚫</span>
              <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, fontWeight: 600 }}>{w}</span>
            </div>
          ))}
        </div>
      </div>
    );

    if (type === "statements") {
      const isV = item.answer === "VRAI";
      return (
        <div style={bigCard}>
          {item.cat && <span style={catBadge}>{item.cat}</span>}
          <p style={bigTxt}>{item.text}</p>
          {revealMap[cardKey]
            ? <div>
                <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 8, fontSize: 14, fontWeight: 800, background: isV ? "rgba(46,204,113,0.15)" : "rgba(231,76,60,0.15)", border: `1px solid ${isV ? "rgba(46,204,113,0.35)" : "rgba(231,76,60,0.35)"}`, color: isV ? "#2ECC71" : "#E74C3C" }}>{item.answer}</span>
                {item.note && <div style={{ marginTop: 8, color: "rgba(255,255,255,0.4)", fontSize: 11, fontStyle: "italic" }}>💡 {item.note}</div>}
              </div>
            : revBtn("Révéler", () => reveal(cardKey))
          }
        </div>
      );
    }

    if (type === "words") return (
      <div style={{ ...bigCard, alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 26, textAlign: "center", lineHeight: 1.3 }}>{item}</div>
      </div>
    );

    if (type === "debate") return (
      <div style={bigCard}>
        {item.cat && <span style={catBadge}>{item.cat}</span>}
        <p style={bigTxt}>{item.topic || item}</p>
      </div>
    );

    if (type === "definitions") return (
      <div style={bigCard}>
        <div style={{ color: "#fff", fontWeight: 900, fontSize: 24 }}>{item.word}</div>
        {revealMap[cardKey]
          ? <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, lineHeight: 1.6, fontStyle: "italic" }}>"{item.def}"</p>
          : revBtn("Révéler la définition", () => reveal(cardKey))
        }
      </div>
    );

    if (type === "clues") {
      const clueCount = revealMap[cardKey] || 0;
      const ansKey    = cardKey + "-ans";
      return (
        <div style={bigCard}>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>INDICES {clueCount}/{item.clues.length}</span>
          {item.clues.slice(0, clueCount).map((c, j) => (
            <div key={j} style={{ display: "flex", gap: 8 }}>
              <span style={{ color: fmt.color || "#D4A0F5", fontWeight: 700, fontSize: 11, flexShrink: 0 }}>{j + 1}.</span>
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, lineHeight: 1.5 }}>{c}</span>
            </div>
          ))}
          {revealMap[ansKey]
            ? ansBox(item.answer)
            : clueCount < item.clues.length
              ? revBtn(`Indice ${clueCount + 1}`, () => reveal(cardKey, clueCount + 1))
              : revBtn("Révéler la réponse", () => reveal(ansKey))
          }
        </div>
      );
    }

    if (type === "series") {
      const shuffled = [...(item.items || [])].sort((a, b) => a.localeCompare(b));
      return (
        <div style={bigCard}>
          {item.cat && <span style={catBadge}>{item.cat}</span>}
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>{item.title}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {shuffled.map((x, j) => (
              <span key={j} style={{ padding: "4px 10px", borderRadius: 8, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.8)", fontSize: 12 }}>{x}</span>
            ))}
          </div>
          {revealMap[cardKey]
            ? <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
                {(item.items || []).map((x, j) => (
                  <span key={j} style={{ padding: "4px 10px", borderRadius: 8, background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.2)", color: "#2ECC71", fontSize: 12 }}>{j + 1}. {x}</span>
                ))}
              </div>
            : revBtn("Révéler l'ordre chronologique", () => reveal(cardKey))
          }
        </div>
      );
    }

    if (type === "pairs") return (
      <div style={{ ...bigCard, alignItems: "center", gap: 16 }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 22 }}>{item.a}</div>
        <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 11 }}>paire avec</div>
        {revealMap[cardKey]
          ? <div style={{ color: fmt.color || "#D4A0F5", fontWeight: 800, fontSize: 22 }}>{item.b}</div>
          : revBtn("Révéler le mot B", () => reveal(cardKey))
        }
      </div>
    );

    if (type === "top5") return (
      <div style={bigCard}>
        {item.cat && <span style={catBadge}>{item.cat}</span>}
        <p style={bigTxt}>{item.q}</p>
        {revealMap[cardKey]
          ? <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {(item.answers || []).map((a, j) => (
                <div key={j} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ color: "#F1C40F", fontWeight: 700, minWidth: 18, fontSize: 12 }}>{j + 1}.</span>
                  <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}>{a}</span>
                </div>
              ))}
            </div>
          : revBtn("Révéler le classement", () => reveal(cardKey))
        }
      </div>
    );

    return <div style={bigCard}><p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{item?.word || item?.label || String(item)}</p></div>;
  };

  return (
    <div>
      {/* Compteur + bouton classement */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>{idx + 1} / {total}</span>
        <button onClick={onDone} style={{ padding: "5px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", background: "rgba(46,204,113,0.12)", border: "1px solid rgba(46,204,113,0.3)", color: "#2ECC71" }}>
          → Classement
        </button>
      </div>

      {renderCard()}

      {/* Navigation */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0}
          style={{ flex: 1, padding: "9px", borderRadius: 10, fontSize: 13, fontWeight: 700, fontFamily: "inherit", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", color: idx === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.6)", cursor: idx === 0 ? "not-allowed" : "pointer" }}>← Préc</button>
        <button onClick={() => setIdx(i => Math.min(total - 1, i + 1))} disabled={idx === total - 1}
          style={{ flex: 1, padding: "9px", borderRadius: 10, fontSize: 13, fontWeight: 700, fontFamily: "inherit", background: `${fmt.color || "#D4A0F5"}18`, border: `1px solid ${fmt.color || "#D4A0F5"}35`, color: idx === total - 1 ? "rgba(255,255,255,0.2)" : fmt.color || "#D4A0F5", cursor: idx === total - 1 ? "not-allowed" : "pointer" }}>Suiv →</button>
      </div>

      {/* Ajout question (type questions uniquement) */}
      {type === "questions" && setLiveContent && (
        <AddQuestionForm onAdd={newItem => setLiveContent(p => ({ ...p, items: [...(p.items || []), newItem] }))} />
      )}

      <ScoreTracker teams={teams} scores={scores} setScores={setScores} />
    </div>
  );
}

function MiniGameModal({ teams, setTeams, onDone }) {
  const [game] = useState(() => {
    const used = window._usedMG ?? [];
    const avail = MG.filter(g => !used.includes(g.id));
    const pool = avail.length ? avail : MG;
    const picked = pool[Math.floor(Math.random() * pool.length)];
    window._markUsedMG?.(picked.id);
    return picked;
  });
  const [phase, setPhase]           = useState("rules");
  const [scores, setScores]         = useState([0, 0, 0, 0]);
  const [liveContent, setLiveContent] = useState(() => game.content);
  const [distributed, setDistributed] = useState(false);
  const fmt = FORMAT[game.format] || {};

  // Ordre de classement dérivé des scores (meilleur en premier)
  const rankOrder = [0, 1, 2, 3].sort((a, b) => scores[b] - scores[a]);

  const phaseLabel = { rules: "PRÉSENTATION", play: "JEU EN COURS", ranking: "CLASSEMENT" };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:907,
      display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:"#0c1525", border:`2px solid ${fmt.color || "#D4A0F5"}55`,
        borderRadius:20, padding:24, maxWidth:580, width:"100%", maxHeight:"94vh", overflowY:"auto" }}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div style={{ color:fmt.color || "#D4A0F5", fontWeight:800, fontSize:20, letterSpacing:1 }}>
            {game.emoji} MINI-JEU
          </div>
          <div style={{ display:"flex", gap:6, alignItems:"center" }}>
            <span style={{ padding:"2px 9px", borderRadius:7, fontSize:10, fontWeight:700,
              background:`${fmt.color || "#D4A0F5"}20`, color:fmt.color || "#D4A0F5" }}>
              {fmt.emoji} {fmt.short}
            </span>
            <span style={{ fontSize:9, color:"rgba(255,255,255,0.25)", letterSpacing:1 }}>
              {phaseLabel[phase]}
            </span>
          </div>
        </div>

        {/* ── PHASE PRÉSENTATION ── */}
        {phase === "rules" && (
          <div>
            <div style={{ fontSize:42, textAlign:"center", marginBottom:8 }}>{game.emoji}</div>
            <div style={{ color:"#fff", fontWeight:800, fontSize:18, textAlign:"center", marginBottom:6 }}>{game.name}</div>
            <p style={{ color:"rgba(255,255,255,0.6)", fontSize:13, lineHeight:1.6, textAlign:"center", marginBottom:14 }}>{game.desc}</p>
            {game.rules && game.rules.length > 0 && (
              <div style={{ marginBottom:14, padding:"12px 16px", borderRadius:12, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ color:"rgba(255,255,255,0.35)", fontSize:10, fontWeight:700, letterSpacing:1, marginBottom:8 }}>RÈGLES</div>
                {game.rules.map((r, i) => (
                  <div key={i} style={{ display:"flex", gap:8, marginBottom:4 }}>
                    <span style={{ color:fmt.color || "#D4A0F5", fontWeight:700, fontSize:11, flexShrink:0 }}>{i+1}.</span>
                    <span style={{ color:"rgba(255,255,255,0.65)", fontSize:12, lineHeight:1.5 }}>{r}</span>
                  </div>
                ))}
              </div>
            )}
            {game.material && (
              <div style={{ marginBottom:14, padding:"6px 12px", borderRadius:8, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color:"rgba(255,255,255,0.35)", fontSize:10, fontWeight:700, letterSpacing:1 }}>MATÉRIEL · </span>
                <span style={{ color:"rgba(255,255,255,0.55)", fontSize:11 }}>{game.material}</span>
              </div>
            )}
            <div style={{ marginBottom:14, display:"inline-flex", alignItems:"center", gap:6, padding:"4px 12px", borderRadius:8, background:"rgba(212,160,23,0.1)", border:"1px solid rgba(212,160,23,0.2)" }}>
              <span style={{ fontSize:13 }}>🪙</span>
              <span style={{ color:"#D4A017", fontWeight:600, fontSize:12 }}>{game.reward}</span>
            </div>
            <div style={{ marginTop:18, display:"flex", gap:10 }}>
              <button onClick={() => openMGMJWindow(game)} style={{
                flex:"0 0 auto", padding:"13px 18px", borderRadius:12,
                fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
                background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.75)",
              }}>📋 Vue MJ</button>
              <button onClick={() => setPhase("play")} style={{
                flex:1, padding:"13px", borderRadius:12,
                fontSize:15, fontWeight:800, cursor:"pointer", fontFamily:"inherit",
                background:`${fmt.color || "#D4A0F5"}22`, border:`2px solid ${fmt.color || "#D4A0F5"}50`, color:fmt.color || "#D4A0F5",
              }}>▶ Commencer le jeu</button>
            </div>
          </div>
        )}

        {/* ── PHASE JEU ── */}
        {phase === "play" && (
          <PlayPhase
            game={game} teams={teams}
            scores={scores} setScores={setScores}
            liveContent={liveContent} setLiveContent={setLiveContent}
            onDone={() => setPhase("ranking")}
          />
        )}

        {/* ── PHASE CLASSEMENT ── */}
        {phase === "ranking" && (
          <div>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:13, textAlign:"center", marginBottom:12 }}>
              🏆 Classement final — ajustez avec ▲▼ si besoin
            </div>
            {scores.some(s => s > 0) && (
              <div style={{ display:"flex", gap:4, justifyContent:"center", flexWrap:"wrap", marginBottom:12 }}>
                {[0,1,2,3].map(i => (
                  <span key={i} style={{ padding:"3px 10px", borderRadius:8, fontSize:11, background:"rgba(255,255,255,0.04)", color:TC[i], fontWeight:700 }}>
                    {TE[i]} {scores[i]} pt{scores[i] !== 1 ? "s" : ""}
                  </span>
                ))}
              </div>
            )}
            <MiniGameRanking teams={teams} setTeams={setTeams} initialOrder={rankOrder} onDone={() => setDistributed(true)} />
            <button onClick={onDone} disabled={!distributed} style={{
              marginTop:14, width:"100%", padding:"12px", borderRadius:12,
              fontSize:14, fontWeight:700, cursor: distributed ? "pointer" : "not-allowed", fontFamily:"inherit",
              background: distributed ? "rgba(46,204,113,0.18)" : "rgba(80,80,80,0.1)",
              border: `1px solid ${distributed ? "rgba(46,204,113,0.4)" : "rgba(80,80,80,0.2)"}`,
              color: distributed ? "#2ECC71" : "#555",
            }}>
              {distributed ? "✓ Valider et passer au tour suivant →" : "⬆ Distribuez d'abord les récompenses"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// PION OFFSETS
// ═══════════════════════════════════════════════════════
const PION_OFFSETS = [
  [[0, 0]],
  [[-9, 0], [9, 0]],
  [[0, -10], [9, 6], [-9, 6]],
  [[-8, -8], [8, -8], [-8, 8], [8, 8]],
];

// ═══════════════════════════════════════════════════════
// BOARD SVG (shared pure visual component)
// ═══════════════════════════════════════════════════════
function BoardSVG({ side, starIdx, buying = false, withHover = false, mario = false,
  onHoverChange, onCaseClick, onStarClick, pawns = [], activePawnTeamIdx = -1,
  tpHighlights = [], highlightCases = [], bridgeCostOverride = null,
  hoveredPath = [], onCaseHover }) {
  const [hov, setHov] = useState(null);
  const [tpH, setTpH] = useState(false);

  const handleEnter = (id, type) => {
    if (!withHover) return;
    setHov(id);
    setTpH(type === "teleport");
    onHoverChange?.(id, type);
  };
  const handleLeave = () => {
    if (!withHover) return;
    setHov(null);
    setTpH(false);
    onHoverChange?.(null, null);
  };
  const handleSVGLeave = () => {
    if (!withHover) return;
    setHov(null);
    setTpH(false);
    onHoverChange?.(null, null);
  };

  const gdir = (islandIdx, scId) => islands[islandIdx].cfg[side][scId];
  const starSeg = AS[starIdx];
  const isRecto = side === 0;
  const sideColor = isRecto ? "#2ecc71" : "#e74c3c";

  const pionsByCase = {};
  pawns.forEach(p => {
    if (!pionsByCase[p.caseId]) pionsByCase[p.caseId] = [];
    pionsByCase[p.caseId].push(p.teamIdx);
  });

  // Mario island colors
  const mIslandColors = ["#1A6B2A", "#8B3A10", "#1A4A6B"];
  const islandColors = mario ? mIslandColors : islands.map(il => il.color);

  return (
    <svg viewBox="0 0 760 580" style={{ width: "100%", maxHeight: "82vh", display: "block", borderRadius: mario ? 16 : 0 }}
      onMouseLeave={handleSVGLeave}>
      <defs>
        <radialGradient id="wm" cx="50%" cy="45%">
          {mario ? (
            <>
              <stop offset="0%"   stopColor="#1a3a6e" />
              <stop offset="100%" stopColor="#0b1f3a" />
            </>
          ) : (
            <>
              <stop offset="0%"   stopColor="#122940" />
              <stop offset="100%" stopColor="#080F1A" />
            </>
          )}
        </radialGradient>
        {mario && (
          <radialGradient id="stars-bg" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(255,255,150,0.04)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        )}
      </defs>
      <rect width={760} height={580} rx={14} fill="url(#wm)" />
      {mario && <rect width={760} height={580} rx={14} fill="url(#stars-bg)" />}

      {/* Mario decorative stars scattered */}
      {mario && [[60,40],[700,50],[380,30],[120,540],[640,530],[30,300],[730,290]].map(([x,y],i) => (
        <text key={i} x={x} y={y} fontSize={10} fill="rgba(255,220,0,0.18)" textAnchor="middle">★</text>
      ))}

      {/* Teleporter links */}
      {tpLinks.map((tl, i) => {
        const mx = (tl.f.x + tl.t.x) / 2, my = (tl.f.y + tl.t.y) / 2 - 28;
        return (
          <path key={`tp${i}`}
            d={`M ${tl.f.x} ${tl.f.y} Q ${mx} ${my} ${tl.t.x} ${tl.t.y}`}
            fill="none" stroke="#00BCD4" strokeWidth={tpH ? 1.8 : 0.8}
            strokeDasharray="8,6" opacity={tpH ? 0.4 : 0.06}
          />
        );
      })}

      {/* Island backgrounds */}
      {islands.map((il, i) => (
        <g key={`ib${i}`}>
          {/* Deeper shadow for mario depth */}
          <ellipse cx={il.cx+6} cy={il.cy+9} rx={il.rx} ry={il.ry} fill="rgba(0,0,0,0.35)"
            transform={`rotate(${il.rot},${il.cx+6},${il.cy+9})`} />
          <ellipse cx={il.cx+3} cy={il.cy+4} rx={il.rx} ry={il.ry} fill="rgba(0,0,0,0.18)"
            transform={`rotate(${il.rot},${il.cx+3},${il.cy+4})`} />
          <ellipse cx={il.cx} cy={il.cy} rx={il.rx} ry={il.ry} fill={islandColors[i]}
            stroke={mario ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"} strokeWidth={mario ? 2 : 1.5}
            transform={`rotate(${il.rot},${il.cx},${il.cy})`} />
          {/* Mario: bright rim highlight */}
          {mario && (
            <ellipse cx={il.cx} cy={il.cy - il.ry * 0.3} rx={il.rx * 0.7} ry={il.ry * 0.25}
              fill="rgba(255,255,255,0.06)"
              transform={`rotate(${il.rot},${il.cx},${il.cy - il.ry * 0.3})`} />
          )}
          {/* island name rendered in separate pass above cases — removed from here */}
        </g>
      ))}

      {/* Bridges — bidirectional arrows, no case circle */}
      {bridges.map((b, i) => {
        const dx = b.t.x - b.f.x, dy = b.t.y - b.f.y;
        const ln = Math.sqrt(dx*dx + dy*dy) || 1;
        const nx = dx/ln, ny = dy/ln;
        const px = -ny, py = nx; // perpendicular
        // Arrow at 35% (f→t direction)
        const a1x = b.f.x + dx*0.35, a1y = b.f.y + dy*0.35;
        // Arrow at 65% (t→f direction, reversed)
        const a2x = b.f.x + dx*0.65, a2y = b.f.y + dy*0.65;
        // cost label at midpoint
        const mx = b.m.x, my = b.m.y;
        return (
          <g key={`br${i}`}>
            <line x1={b.f.x} y1={b.f.y} x2={b.t.x} y2={b.t.y}
              stroke="#5C4A1A" strokeWidth={9} strokeLinecap="round" opacity={0.28} />
            <line x1={b.f.x} y1={b.f.y} x2={b.t.x} y2={b.t.y}
              stroke="#A07C28" strokeWidth={3.5} strokeLinecap="round"
              strokeDasharray="10,7" opacity={0.55} />
            {/* f→t arrow (upper lane) */}
            <polygon
              points={`${a1x+7*nx+3*px},${a1y+7*ny+3*py} ${a1x-5*nx+3*px},${a1y-5*ny+3*py+4} ${a1x-5*nx+3*px},${a1y-5*ny+3*py-4}`}
              fill="rgba(255,200,80,0.75)" />
            {/* t→f arrow (lower lane) */}
            <polygon
              points={`${a2x-7*nx-3*px},${a2y-7*ny-3*py} ${a2x+5*nx-3*px},${a2y+5*ny-3*py+4} ${a2x+5*nx-3*px},${a2y+5*ny-3*py-4}`}
              fill="rgba(255,200,80,0.75)" />
            {/* Cost badge */}
            <rect x={mx-12} y={my-8} width={24} height={16} rx={6}
              fill="rgba(0,0,0,0.65)" stroke="rgba(160,124,40,0.5)" strokeWidth={1} />
            <text x={mx} y={my+1} textAnchor="middle" dominantBaseline="central"
              fill={bridgeCostOverride && bridgeCostOverride > BRIDGE_COST ? "#FF6B35" : "#D4A017"}
              fontWeight="800" fontSize={9}>{bridgeCostOverride ?? BRIDGE_COST}₽</text>
          </g>
        );
      })}

      {/* Main path segments + direction arrows */}
      {islands.map(il => il.mp.map((cid, idx) => {
        const nid = il.mp[(idx + 1) % il.mp.length];
        const f = gc(cid), t = gc(nid);
        if (!f || !t) return null;
        const sid = `m-${cid}-${nid}`;
        const hasStar = starSeg?.sid === sid;
        const mx = (f.x + t.x) / 2, my = (f.y + t.y) / 2;
        const dx = t.x - f.x, dy = t.y - f.y;
        const ln = Math.sqrt(dx*dx + dy*dy) || 1;
        const nx = dx/ln, ny = dy/ln;
        return (
          <g key={sid}>
            <line x1={f.x} y1={f.y} x2={t.x} y2={t.y}
              stroke={hasStar ? "rgba(241,196,15,0.22)" : "rgba(255,255,255,0.12)"}
              strokeWidth={hasStar ? 3 : 2.5} strokeDasharray="5,4" />
            {/* Direction arrow at midpoint */}
            <polygon
              points={`${mx+7*nx},${my+7*ny} ${mx-4*ny-3*nx},${my+4*nx-3*ny} ${mx+4*ny-3*nx},${my-4*nx-3*ny}`}
              fill={hasStar ? "rgba(241,196,15,0.5)" : "rgba(255,255,255,0.22)"}
            />
          </g>
        );
      }))}

      {/* Shortcuts with arrows */}
      {islands.map((il, ii) => il.sc.map(sc => {
        const f = gc(sc.f), t = gc(sc.t);
        if (!f || !t) return null;
        const dir = gdir(ii, sc.id);
        const rf = dir === 1 ? f : t, rt = dir === 1 ? t : f;
        const dx = rt.x - rf.x, dy = rt.y - rf.y;
        const ln = Math.sqrt(dx*dx + dy*dy);
        const nx = dx/ln, ny = dy/ln;
        const ax = (rf.x + rt.x) / 2, ay = (rf.y + rt.y) / 2;
        const hasStar = starSeg?.sid === `sc-${sc.id}`;
        const isHov = hov && (hov === sc.f || hov === sc.t);
        const co = hasStar
          ? (isHov ? "rgba(241,196,15,0.85)" : "rgba(241,196,15,0.38)")
          : (isHov ? "rgba(0,220,250,0.8)"   : "rgba(0,188,212,0.28)");
        return (
          <g key={sc.id}>
            <line x1={rf.x} y1={rf.y} x2={rt.x} y2={rt.y}
              stroke={co} strokeWidth={isHov ? 3 : 2} strokeDasharray="6,5" />
            <polygon
              points={`${ax+8*nx},${ay+8*ny} ${ax-5*ny-4*nx},${ay+5*nx-4*ny} ${ax+5*ny-4*nx},${ay-5*nx-4*ny}`}
              fill={co}
            />
          </g>
        );
      }))}

      {/* Star token — pulsing */}
      {!buying && starSeg && (() => {
        const mx = (starSeg.f.x + starSeg.t.x) / 2;
        const my = (starSeg.f.y + starSeg.t.y) / 2;
        return (
          <g onClick={onStarClick}
             onMouseEnter={withHover ? () => handleEnter("star", "star") : undefined}
             onMouseLeave={withHover ? handleLeave : undefined}
             style={{ cursor: onStarClick ? "pointer" : "default" }}>
            {/* Outer pulsing ring */}
            <circle cx={mx} cy={my} r={26} fill="none" stroke="#F1C40F" strokeWidth={2} opacity={0.4}>
              <animate attributeName="r" values="24;32;24" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" />
            </circle>
            {hov === "star" && <circle cx={mx} cy={my} r={30} fill="rgba(241,196,15,0.12)" />}
            <circle cx={mx+1.5} cy={my+2} r={19} fill="rgba(0,0,0,0.32)" />
            <circle cx={mx} cy={my} r={19} fill="#F1C40F"
              stroke={hov === "star" ? "#fff" : "rgba(0,0,0,0.15)"}
              strokeWidth={hov === "star" ? 2.5 : 1.5}>
              <animate attributeName="r" values="19;21;19" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx={mx-4} cy={my-5} r={4.5} fill="rgba(255,255,255,0.3)" />
            <text x={mx} y={my+2} textAnchor="middle" dominantBaseline="central"
              fill="#fff" fontWeight="800" fontSize={18}>★</text>
          </g>
        );
      })()}

      {/* Reachable case highlights (die roller) */}
      {highlightCases.length > 0 && islands.map(il => il.cases.map(c => {
        if (!highlightCases.includes(c.id)) return null;
        const isPathDest = hoveredPath.length > 0 && hoveredPath[hoveredPath.length - 1] === c.id;
        return (
          <circle key={`hl-${c.id}`} cx={c.x} cy={c.y} r={isPathDest ? 26 : 23}
            fill={isPathDest ? "rgba(241,196,15,0.35)" : "rgba(241,196,15,0.22)"}
            stroke="#F1C40F" strokeWidth={isPathDest ? 3 : 2.5}
            style={{ pointerEvents: onCaseHover ? "all" : "none", cursor: "pointer" }}
            onMouseEnter={onCaseHover ? () => onCaseHover(c.id) : undefined}
            onMouseLeave={onCaseHover ? () => onCaseHover(null) : undefined} />
        );
      }))}

      {/* Hovered path lines */}
      {hoveredPath.length > 1 && (() => {
        const nodes = hoveredPath.map(id => gc(id)).filter(Boolean);
        return nodes.slice(0, -1).map((f, k) => {
          const t = nodes[k + 1];
          const dx = t.x - f.x, dy = t.y - f.y;
          const ln = Math.sqrt(dx * dx + dy * dy) || 1;
          const nx = dx / ln, ny = dy / ln;
          const px = -ny, py = nx;
          const pad = 20;
          const x1 = f.x + nx * pad, y1 = f.y + ny * pad;
          const x2 = t.x - nx * pad, y2 = t.y - ny * pad;
          const ax = 9, ab = 5;
          return (
            <g key={`hp-${k}`} style={{ pointerEvents: "none" }}>
              {/* Glow */}
              <line x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#F1C40F" strokeWidth={8} strokeLinecap="round" opacity={0.15} />
              {/* Main line */}
              <line x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#F1C40F" strokeWidth={3} strokeLinecap="round" opacity={0.9} />
              {/* Arrow head */}
              <polygon
                points={`${x2 + nx * ax},${y2 + ny * ax} ${x2 - nx * 3 + px * ab},${y2 - ny * 3 + py * ab} ${x2 - nx * 3 - px * ab},${y2 - ny * 3 - py * ab}`}
                fill="#F1C40F" opacity={0.9} />
              {/* Step dot on intermediate nodes */}
              {k > 0 && (
                <circle cx={f.x} cy={f.y} r={5}
                  fill="#F1C40F" opacity={0.75} />
              )}
            </g>
          );
        });
      })()}

      {/* Case circles */}
      {islands.map(il => il.cases.map(c => {
        const side0 = side === 0;
        const tp = c.r === c.v ? c.r : (side0 ? c.r : c.v);
        const cf = CT[tp];
        if (!cf) return null;
        const r = 17;
        return (
          <g key={c.id}
             onMouseEnter={withHover ? () => handleEnter(c.id, tp) : undefined}
             onMouseLeave={withHover ? handleLeave : undefined}
             onClick={onCaseClick ? () => onCaseClick(c.id) : undefined}
             style={{ cursor: onCaseClick ? "pointer" : (withHover ? "pointer" : "default") }}>
            {hov === c.id && <circle cx={c.x} cy={c.y} r={r+10} fill={cf.c} opacity={0.18} />}
            {tp === "teleport" && (
              <circle cx={c.x} cy={c.y} r={r+6} fill="none"
                stroke="#00BCD4" strokeWidth={1.5} opacity={0.22} />
            )}
            <circle cx={c.x+1.5} cy={c.y+2} r={r} fill="rgba(0,0,0,0.28)" />
            <circle cx={c.x} cy={c.y} r={r} fill={cf.c}
              stroke={hov === c.id ? "#fff" : "rgba(0,0,0,0.2)"}
              strokeWidth={hov === c.id ? 2.5 : 1.5} />
            <circle cx={c.x-3} cy={c.y-4} r={r*0.22} fill="rgba(255,255,255,0.28)" />
            <text x={c.x} y={c.y+1} textAnchor="middle" dominantBaseline="central"
              fill="#fff" fontWeight="700" fontSize={11}>{cf.l}</text>
          </g>
        );
      }))}

      {/* Teleport-select highlights (red pulsing ring) — click forwards to onCaseClick */}
      {tpHighlights.map(cid => {
        const c = gc(cid);
        if (!c) return null;
        return (
          <circle key={`tph-${cid}`} cx={c.x} cy={c.y} r={26}
            fill="rgba(231,76,60,0.22)" stroke="#E74C3C" strokeWidth={3}
            strokeDasharray="6,4" opacity={0.9}
            style={{ cursor: "pointer" }}
            onClick={() => onCaseClick?.(cid)} />
        );
      })}

      {/* Island name labels — rendered above all cases */}
      {islands.map((il, i) => {
        const lx = il.cx;
        const ly = il.cy - il.ry - 6;
        const label = `${il.icon} ${il.name}`;
        return (
          <g key={`iname${i}`} style={{ pointerEvents: "none" }}>
            <rect x={lx - 56} y={ly - 12} width={112} height={19} rx={7}
              fill="rgba(0,0,0,0.65)" stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
            <text x={lx} y={ly + 1}
              textAnchor="middle" dominantBaseline="central"
              fill="rgba(255,255,255,0.82)" fontSize={9.5}
              fontWeight="700" letterSpacing="1.5">
              {label}
            </text>
          </g>
        );
      })}

      {/* FACE A / FACE B badge — top right */}
      <g>
        <rect x={660} y={8} width={90} height={26} rx={9}
          fill={sideColor + "22"} stroke={sideColor + "60"} strokeWidth={1.5} />
        <text x={705} y={25} textAnchor="middle"
          fill={sideColor} fontWeight="800" fontSize={12} letterSpacing="1.5">
          {isRecto ? "FACE  A" : "FACE  B"}
        </text>
      </g>

      {/* Pions — rendered on top, pointer-events off so clicks pass through */}
      {Object.entries(pionsByCase).map(([caseId, tIdxs]) => {
        const c = gc(caseId);
        if (!c) return null;
        const count = Math.min(tIdxs.length, 4);
        const offsets = PION_OFFSETS[count - 1];
        return tIdxs.map((tIdx, i) => {
          const [ox, oy] = offsets[i] || [0, 0];
          const isActive = tIdx === activePawnTeamIdx;
          return (
            <PawnShape key={`pion-${tIdx}`}
              cx={c.x + ox} cy={c.y + oy - 4}
              color={TC[tIdx]} active={isActive}
            />
          );
        });
      })}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
// BOARD MAP COMPONENT  (Carte tab — no pawns)
// ═══════════════════════════════════════════════════════
function BoardMap({ side, setSide, mgCount, setMgCount, starIdx, setStarIdx }) {
  const [hov, setHov]       = useState(null);
  const [hovT, setHovT]     = useState(null);
  const [buying, setBuying] = useState(false);
  const [dice, setDice]     = useState(null);
  const [rolling, setRolling] = useState(false);
  const [toast, setToast]   = useState(null);

  const show = (msg, dur = 3000) => {
    setToast(msg);
    setTimeout(() => setToast(null), dur);
  };

  const rollDie = useCallback(() => {
    if (rolling) return;
    const next = mgCount + 1;
    setMgCount(next);
    if (next % MG_PER_FLIP === 0) {
      setRolling(true);
      let ticks = 0;
      const iv = setInterval(() => {
        setDice(Math.floor(Math.random() * 6) + 1);
        ticks++;
        if (ticks > 10) {
          clearInterval(iv);
          const result = Math.floor(Math.random() * 6) + 1;
          setDice(result);
          const newSide = result <= 3 ? 0 : 1;
          const changed = newSide !== side;
          setSide(newSide);
          show(
            changed
              ? `🎲 ${result} → RETOURNEZ TOUT ! → ${newSide === 0 ? "RECTO" : "VERSO"}`
              : `🎲 ${result} → On reste en ${newSide === 0 ? "RECTO" : "VERSO"}`,
            4000,
          );
          setTimeout(() => setRolling(false), 500);
        }
      }, 90);
    } else {
      show(`Mini-jeu #${next} ✓ — Dé dans ${MG_PER_FLIP - (next % MG_PER_FLIP)}`);
    }
  }, [mgCount, rolling, side, setSide, setMgCount]);

  const buyStar = useCallback(() => {
    if (buying) return;
    setBuying(true);
    show("⭐ Étoile achetée ! Déplacement...", 2200);
    setTimeout(() => {
      let n;
      do { n = Math.floor(Math.random() * AS.length); } while (n === starIdx);
      setStarIdx(n);
      setBuying(false);
    }, 1800);
  }, [starIdx, buying, setStarIdx]);

  const isRecto = side === 0;
  const sideColor = isRecto ? "#2ecc71" : "#e74c3c";
  const diceIcons = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

  return (
    <div>
      {/* Status bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        marginBottom: 8, padding: "6px 16px", borderRadius: 12,
        background: `${sideColor}12`, border: `1px solid ${sideColor}30`,
        flexWrap: "wrap", justifyContent: "center",
      }}>
        <div style={{ padding: "3px 14px", borderRadius: 8, fontWeight: 700, fontSize: 13, letterSpacing: 2, background: `${sideColor}30`, color: sideColor }}>
          {isRecto ? "RECTO" : "VERSO"}
        </div>
        <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>
          Mini-jeux : {mgCount}
        </span>
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>
          Dé dans : {MG_PER_FLIP - (mgCount % MG_PER_FLIP)}
        </span>
        {dice && <span style={{ fontSize: 22 }}>{diceIcons[dice - 1]}</span>}
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap", justifyContent: "center" }}>
        <Btn label="🎲 Fin mini-jeu" onClick={rollDie} color="#D4A0F5" disabled={rolling} />
        <Btn label={`⭐ Acheter étoile (${STAR_COST}₽)`} onClick={buyStar} color="#F1C40F" disabled={buying} />
        <Btn label="🔄 Retourner" onClick={() => { setSide(s => s === 0 ? 1 : 0); show("Plateau retourné manuellement"); }} color="#aaa" />
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          textAlign: "center", background: "rgba(10,12,24,0.96)",
          border: "1px solid rgba(255,255,255,0.14)", padding: "7px 18px",
          borderRadius: 10, color: "#fff", fontSize: 13, fontWeight: 600,
          marginBottom: 8,
        }}>
          {toast}
        </div>
      )}

      <BoardSVG
        side={side} starIdx={starIdx} buying={buying}
        withHover={true}
        onHoverChange={(id, type) => { setHov(id); setHovT(type); }}
        onStarClick={buyStar}
        pawns={[]}
      />

      {/* Hover tooltip */}
      {hov && hovT && CT[hovT] && (
        <div style={{
          marginTop: 6, padding: "5px 14px",
          background: "rgba(255,255,255,0.06)", borderRadius: 8,
          color: "#fff", fontSize: 13, textAlign: "center",
        }}>
          <span style={{ fontSize: 16, marginRight: 6 }}>{CT[hovT].e}</span>
          <strong>{CT[hovT].d}</strong>
        </div>
      )}

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 8px", marginTop: 10, justifyContent: "center" }}>
        {Object.entries(CT).map(([k, v]) => (
          <div key={k} style={{
            display: "flex", alignItems: "center", gap: 4,
            padding: "2px 7px", borderRadius: 8, background: "rgba(255,255,255,0.025)",
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: v.c, display: "inline-block", flexShrink: 0 }} />
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 9 }}>{v.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// DIE PANEL — die roller sidebar for the plateau
// ═══════════════════════════════════════════════════════
function DiePanel({ values, onChange, onRoll, onAddDie, onRemoveDie, reachableCount }) {
  const faces = ["⚀","⚁","⚂","⚃","⚄","⚅"];
  const total = values.reduce((s, v) => s + (v || 0), 0);

  return (
    <div style={{
      padding: "14px 12px", borderRadius: 14,
      background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)",
      marginBottom: 10,
    }}>
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>
        🎲 DÉ
      </div>

      {values.map((v, di) => (
        <div key={di} style={{ marginBottom: di < values.length - 1 ? 12 : 0 }}>
          <div style={{ fontSize: 44, textAlign: "center", lineHeight: 1, marginBottom: 6 }}>
            {v ? faces[v - 1] : <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 32 }}>?</span>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 4 }}>
            {[1,2,3,4,5,6].map(n => (
              <button key={n} onClick={() => onChange(di, n)} style={{
                padding: "6px 0", borderRadius: 8, fontSize: 14, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit",
                background: v === n ? "rgba(241,196,15,0.28)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${v === n ? "rgba(241,196,15,0.6)" : "rgba(255,255,255,0.09)"}`,
                color: v === n ? "#F1C40F" : "rgba(255,255,255,0.45)",
              }}>{n}</button>
            ))}
          </div>
        </div>
      ))}

      <div style={{ display: "flex", gap: 4, marginTop: 10, marginBottom: 6 }}>
        <button onClick={onRoll} style={{
          flex: 1, padding: "9px 0", borderRadius: 10, fontSize: 13, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
          background: "rgba(241,196,15,0.16)", border: "1px solid rgba(241,196,15,0.38)", color: "#F1C40F",
        }}>🎲 Lancer</button>
        {values.length < 2 && (
          <button onClick={onAddDie} title="Ajouter un dé (Double dé)" style={{
            padding: "9px 10px", borderRadius: 10, fontSize: 11, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.35)",
          }}>+🎲</button>
        )}
        {values.length > 1 && (
          <button onClick={onRemoveDie} title="Retirer un dé" style={{
            padding: "9px 10px", borderRadius: 10, fontSize: 11, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
            background: "rgba(231,76,60,0.08)", border: "1px solid rgba(231,76,60,0.22)", color: "#E74C3C",
          }}>−🎲</button>
        )}
      </div>

      {total > 0 && (
        <div style={{ textAlign: "center", padding: "6px 0" }}>
          <span style={{ color: "#F1C40F", fontWeight: 900, fontSize: 22 }}>{total}</span>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}> case{total > 1 ? "s" : ""}</span>
          {reachableCount > 0 && (
            <div style={{ color: "#2ECC71", fontSize: 11, marginTop: 2, fontWeight: 700 }}>
              {reachableCount} destination{reachableCount > 1 ? "s" : ""} possibles
            </div>
          )}
          {total > 0 && reachableCount === 0 && (
            <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, marginTop: 2 }}>
              calcul en cours…
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// ── Chaos inline question sub-component ────────────────
function ChaosQuestionEmbed({ apply, teamCoins, onApplyCoins, onDone }) {
  const [step,    setStep]    = useState("idle"); // idle→bet→drawn→revealed→done
  const [q,       setQ]       = useState(null);
  const [bet,     setBet]     = useState(3);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timedOut, setTimedOut] = useState(false);
  const timerRef = useRef(null);

  // Pick a random question from window._Q (injects level so display is correct)
  const drawQ = (level) => {
    const allPool = window._Q?.[level] ?? [];
    if (!allPool.length) return null;
    const usedIdxs = window._usedQ?.[level] ?? [];
    const available = allPool.map((q, i) => ({ q, i })).filter(({ i }) => !usedIdxs.includes(i));
    const source = available.length ? available : allPool.map((q, i) => ({ q, i }));
    const picked = source[Math.floor(Math.random() * source.length)];
    window._markUsed?.(level, picked.i);
    return { ...picked.q, level };
  };

  const startTimer = () => {
    setTimeLeft(15);
    setTimedOut(false);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setTimedOut(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  // ── Double ou rien ──
  if (apply === "double_ou_rien") {
    const maxBet = Math.min(6, teamCoins);
    if (step === "idle") return (
      <div style={{ marginTop: 14, borderTop: "1px solid rgba(142,68,173,0.3)", paddingTop: 14 }}>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginBottom: 8, letterSpacing: 1 }}>
          MISE (max {maxBet}₽ / 6₽)
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 12 }}>
          <button onClick={() => setBet(b => Math.max(0, b - 1))} style={{
            width: 32, height: 32, borderRadius: 8, fontSize: 16, fontWeight: 700,
            background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff", cursor: "pointer", fontFamily: "inherit",
          }}>−</button>
          <div style={{ minWidth: 52, textAlign: "center", fontSize: 26, fontWeight: 900,
            color: "#F1C40F", fontFamily: "monospace" }}>{bet}₽</div>
          <button onClick={() => setBet(b => Math.min(maxBet, b + 1))} style={{
            width: 32, height: 32, borderRadius: 8, fontSize: 16, fontWeight: 700,
            background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff", cursor: "pointer", fontFamily: "inherit",
          }}>+</button>
        </div>
        <button onClick={() => {
          const drawn = drawQ("college") || drawQ("lycee") || drawQ("expert");
          if (!drawn) return;
          setQ(drawn); setStep("drawn");
        }} style={{
          width: "100%", padding: "10px", borderRadius: 10, fontSize: 13, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
          background: "rgba(241,196,15,0.15)", border: "1px solid rgba(241,196,15,0.4)", color: "#F1C40F",
        }}>🎲 Tirer la question (mise : {bet}₽)</button>
      </div>
    );
    if (step === "drawn") return (
      <div style={{ marginTop: 14, borderTop: "1px solid rgba(142,68,173,0.3)", paddingTop: 14 }}>
        <div style={{ background: "rgba(241,196,15,0.07)", border: "1px solid rgba(241,196,15,0.25)",
          borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
          <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 10, marginBottom: 6, letterSpacing: 1 }}>
            {q.level?.toUpperCase() ?? "?"} · {q.cat}
          </div>
          <div style={{ color: "#fff", fontSize: 14, fontWeight: 600, lineHeight: 1.55 }}>{q.q}</div>
        </div>
        <button onClick={() => setStep("revealed")} style={{
          width: "100%", padding: "10px", borderRadius: 10, fontSize: 13, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
          background: "rgba(46,204,113,0.12)", border: "1px solid rgba(46,204,113,0.35)", color: "#2ECC71",
        }}>Révéler la réponse</button>
      </div>
    );
    if (step === "revealed") return (
      <div style={{ marginTop: 14, borderTop: "1px solid rgba(142,68,173,0.3)", paddingTop: 14 }}>
        <div style={{ color: "#2ECC71", fontWeight: 700, fontSize: 13, marginBottom: 12,
          background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.3)",
          borderRadius: 10, padding: "10px 14px" }}>→ {q.r}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => { onApplyCoins(+bet); setStep("done"); onDone(); }} style={{
            flex: 2, padding: "10px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
            background: "rgba(46,204,113,0.18)", border: "1px solid rgba(46,204,113,0.4)", color: "#2ECC71",
          }}>✓ Bonne réponse +{bet}₽</button>
          <button onClick={() => { onApplyCoins(-bet); setStep("done"); onDone(); }} style={{
            flex: 1, padding: "10px", borderRadius: 10, fontSize: 12, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
            background: "rgba(231,76,60,0.12)", border: "1px solid rgba(231,76,60,0.35)", color: "#E74C3C",
          }}>✗ Faux −{bet}₽</button>
        </div>
      </div>
    );
    return null;
  }

  // ── Question bonus ──
  if (apply === "bonus_question") {
    if (step === "idle") return (
      <div style={{ marginTop: 14, borderTop: "1px solid rgba(142,68,173,0.3)", paddingTop: 14 }}>
        <button onClick={() => {
          const drawn = drawQ("expert");
          if (!drawn) return;
          setQ(drawn); setStep("drawn");
        }} style={{
          width: "100%", padding: "10px", borderRadius: 10, fontSize: 13, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
          background: "rgba(231,76,60,0.15)", border: "1px solid rgba(231,76,60,0.4)", color: "#E74C3C",
        }}>📚 Tirer la question Expert</button>
      </div>
    );
    if (step === "drawn") return (
      <div style={{ marginTop: 14, borderTop: "1px solid rgba(142,68,173,0.3)", paddingTop: 14 }}>
        <div style={{ background: "rgba(231,76,60,0.08)", border: "1px solid rgba(231,76,60,0.25)",
          borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
          <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 10, marginBottom: 6, letterSpacing: 1 }}>
            🔴 EXPERT · {q.cat}
          </div>
          <div style={{ color: "#fff", fontSize: 14, fontWeight: 600, lineHeight: 1.55 }}>{q.q}</div>
        </div>
        <button onClick={() => setStep("revealed")} style={{
          width: "100%", padding: "10px", borderRadius: 10, fontSize: 13, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
          background: "rgba(241,196,15,0.14)", border: "1px solid rgba(241,196,15,0.35)", color: "#F1C40F",
        }}>Révéler la réponse</button>
      </div>
    );
    if (step === "revealed") return (
      <div style={{ marginTop: 14, borderTop: "1px solid rgba(142,68,173,0.3)", paddingTop: 14 }}>
        <div style={{ color: "#2ECC71", fontWeight: 700, fontSize: 13, marginBottom: 12,
          background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.3)",
          borderRadius: 10, padding: "10px 14px" }}>→ {q.r}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => { onApplyCoins(8); setStep("done"); onDone(); }} style={{
            flex: 2, padding: "10px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
            background: "rgba(46,204,113,0.18)", border: "1px solid rgba(46,204,113,0.4)", color: "#2ECC71",
          }}>✓ Bonne réponse +8₽</button>
          <button onClick={() => { onApplyCoins(-2); setStep("done"); onDone(); }} style={{
            flex: 1, padding: "10px", borderRadius: 10, fontSize: 12, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
            background: "rgba(231,76,60,0.12)", border: "1px solid rgba(231,76,60,0.35)", color: "#E74C3C",
          }}>✗ Faux −2₽</button>
        </div>
      </div>
    );
    return null;
  }

  // ── Sablier ──
  if (apply === "sablier") {
    if (step === "idle") return (
      <div style={{ marginTop: 14, borderTop: "1px solid rgba(142,68,173,0.3)", paddingTop: 14 }}>
        <button onClick={() => {
          const lvls = ["college", "lycee", "expert"];
          let drawn = null;
          for (const lv of lvls.sort(() => Math.random() - 0.5)) { drawn = drawQ(lv); if (drawn) break; }
          if (!drawn) return;
          setQ(drawn); setStep("drawn"); startTimer();
        }} style={{
          width: "100%", padding: "10px", borderRadius: 10, fontSize: 13, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
          background: "rgba(0,188,212,0.15)", border: "1px solid rgba(0,188,212,0.4)", color: "#00BCD4",
        }}>⏳ Tirer la question (chrono 15s)</button>
      </div>
    );
    if (step === "drawn") return (
      <div style={{ marginTop: 14, borderTop: "1px solid rgba(142,68,173,0.3)", paddingTop: 14 }}>
        {/* Countdown ring */}
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 52, height: 52, borderRadius: "50%",
            border: `3px solid ${timedOut ? "#E74C3C" : timeLeft <= 5 ? "#E74C3C" : timeLeft <= 10 ? "#F1C40F" : "#00BCD4"}`,
            fontSize: 20, fontWeight: 900, fontFamily: "monospace",
            color: timedOut ? "#E74C3C" : timeLeft <= 5 ? "#E74C3C" : timeLeft <= 10 ? "#F1C40F" : "#00BCD4",
            transition: "border-color 0.3s, color 0.3s",
          }}>{timedOut ? "✕" : timeLeft}</div>
        </div>
        <div style={{ background: "rgba(0,188,212,0.07)", border: "1px solid rgba(0,188,212,0.2)",
          borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
          <div style={{ color: "rgba(255,255,255,0.28)", fontSize: 10, marginBottom: 6, letterSpacing: 1 }}>
            {q.level?.toUpperCase() ?? "?"} · {q.cat}
          </div>
          <div style={{ color: "#fff", fontSize: 14, fontWeight: 600, lineHeight: 1.55 }}>{q.q}</div>
        </div>
        {timedOut ? (
          <div>
            <div style={{ color: "#E74C3C", fontWeight: 700, textAlign: "center", marginBottom: 10, fontSize: 13 }}>
              ⏱ Temps écoulé — 0 pièce pour tout le monde
            </div>
            <button onClick={() => setStep("revealed")} style={{
              width: "100%", padding: "9px", borderRadius: 10, fontSize: 12, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.5)",
            }}>Voir la réponse →</button>
          </div>
        ) : (
          <button disabled={timedOut} onClick={() => { clearInterval(timerRef.current); setStep("revealed"); }} style={{
            width: "100%", padding: "10px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            cursor: timedOut ? "not-allowed" : "pointer", fontFamily: "inherit",
            opacity: timedOut ? 0.4 : 1,
            background: "rgba(46,204,113,0.12)", border: "1px solid rgba(46,204,113,0.35)", color: "#2ECC71",
          }}>Révéler la réponse</button>
        )}
      </div>
    );
    if (step === "revealed") return (
      <div style={{ marginTop: 14, borderTop: "1px solid rgba(142,68,173,0.3)", paddingTop: 14 }}>
        <div style={{ color: "#2ECC71", fontWeight: 700, fontSize: 13, marginBottom: 12,
          background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.3)",
          borderRadius: 10, padding: "10px 14px" }}>→ {q.r}</div>
        {timedOut ? (
          <button onClick={() => { onDone(); }} style={{
            width: "100%", padding: "10px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
            background: "rgba(142,68,173,0.2)", border: "1px solid rgba(142,68,173,0.4)", color: "#D4A0F5",
          }}>Continuer →</button>
        ) : (
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => {
              const bonus = q.level === "expert" ? 5 : q.level === "lycee" ? 3 : 3;
              onApplyCoins(bonus); onDone();
            }} style={{
              flex: 2, padding: "10px", borderRadius: 10, fontSize: 13, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
              background: "rgba(46,204,113,0.18)", border: "1px solid rgba(46,204,113,0.4)", color: "#2ECC71",
            }}>✓ Bonne réponse (dans les temps)</button>
            <button onClick={() => { onDone(); }} style={{
              flex: 1, padding: "10px", borderRadius: 10, fontSize: 12, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
              background: "rgba(231,76,60,0.12)", border: "1px solid rgba(231,76,60,0.35)", color: "#E74C3C",
            }}>✗ Faux</button>
          </div>
        )}
      </div>
    );
    return null;
  }

  return null;
}

// ═══════════════════════════════════════════════════════
// CHAOS CARD MODAL — shown when a player lands on a chaos case
// ═══════════════════════════════════════════════════════
function ChaosCardModal({ card, teams, turn, onApply, onApplyCoins, onClose }) {
  const [targetIdx, setTargetIdx] = useState(null);
  const [targetIdx2, setTargetIdx2] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 10); return () => clearTimeout(t); }, []);

  const needsTarget  = ["steal3", "give4", "curse", "steal_star", "swap_pos"].includes(card.apply);
  const needsDouble  = ["magnet"].includes(card.apply);
  const isManual     = card.apply === "manual";
  const isQCard      = ["bonus_question", "sablier", "double_ou_rien"].includes(card.apply);
  const isAuto       = !needsTarget && !needsDouble && !isManual && !isQCard;

  const doApply = () => {
    if (needsTarget && targetIdx === null) return;
    if (needsDouble && (targetIdx === null || targetIdx2 === null)) return;
    onApply(card.n, targetIdx, targetIdx2);
    setConfirmed(true);
    setTimeout(onClose, 1600);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.86)", zIndex: 902,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      overflowY: "auto" }}>
      <div style={{
        background: "#0c1525", border: "2px solid rgba(142,68,173,0.5)", borderRadius: 20,
        padding: "28px 28px", maxWidth: 420, width: "100%", textAlign: "center",
        transform: visible ? "scale(1) translateY(0)" : "scale(0.85) translateY(20px)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.22s ease",
        maxHeight: "90vh", overflowY: "auto",
      }}>
        <div style={{ fontSize: 50, marginBottom: 6 }}>{card.e}</div>
        <div style={{ color: "#8E44AD", fontWeight: 700, fontSize: 11, letterSpacing: 2, marginBottom: 4 }}>
          🌀 CASE CHAOS
        </div>
        <div style={{ color: "#D4A0F5", fontWeight: 800, fontSize: 19, marginBottom: 10 }}>
          {card.n}
        </div>
        <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
          {card.d}
        </p>
        {card.tip && (
          <div style={{ padding: "6px 12px", borderRadius: 8, marginBottom: 14,
            background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.35)",
            fontSize: 11, fontStyle: "italic" }}>💡 {card.tip}</div>
        )}

        {/* Question-based chaos cards — embedded question flow */}
        {isQCard && !confirmed && (
          <ChaosQuestionEmbed
            apply={card.apply}
            teamCoins={teams[turn]?.coins ?? 0}
            onApplyCoins={onApplyCoins}
            onDone={() => { setConfirmed(true); setTimeout(onClose, 800); }}
          />
        )}

        {!confirmed && !isQCard ? (
          <>
            {/* Target pickers */}
            {(needsTarget || needsDouble) && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 700,
                  letterSpacing: 1, marginBottom: 8 }}>
                  {needsDouble ? "CHOISIR ÉQUIPE 1" : "DÉSIGNER UNE CIBLE"}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                  {teams.map((t, i) => i !== turn && (
                    <button key={i} onClick={() => setTargetIdx(i)} style={{
                      padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700,
                      cursor: "pointer", fontFamily: "inherit",
                      background: targetIdx === i ? `${TC[i]}28` : "rgba(255,255,255,0.04)",
                      border: `2px solid ${targetIdx === i ? TC[i] : "rgba(255,255,255,0.1)"}`,
                      color: targetIdx === i ? TC[i] : "rgba(255,255,255,0.55)",
                    }}>{TE[i]} {t.name}</button>
                  ))}
                </div>
                {needsDouble && targetIdx !== null && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 700,
                      letterSpacing: 1, marginBottom: 8 }}>CHOISIR ÉQUIPE 2</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                      {teams.map((t, i) => i !== turn && i !== targetIdx && (
                        <button key={i} onClick={() => setTargetIdx2(i)} style={{
                          padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700,
                          cursor: "pointer", fontFamily: "inherit",
                          background: targetIdx2 === i ? `${TC[i]}28` : "rgba(255,255,255,0.04)",
                          border: `2px solid ${targetIdx2 === i ? TC[i] : "rgba(255,255,255,0.1)"}`,
                          color: targetIdx2 === i ? TC[i] : "rgba(255,255,255,0.55)",
                        }}>{TE[i]} {t.name}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={doApply}
              disabled={(needsTarget && targetIdx === null) ||
                        (needsDouble && (targetIdx === null || targetIdx2 === null))}
              style={{
                width: "100%", padding: "13px", borderRadius: 12, fontSize: 14, fontWeight: 800,
                cursor: "pointer", fontFamily: "inherit",
                background: "rgba(142,68,173,0.2)", border: "2px solid rgba(142,68,173,0.5)",
                color: "#D4A0F5",
                opacity: (needsTarget && targetIdx === null) || (needsDouble && (targetIdx === null || targetIdx2 === null)) ? 0.4 : 1,
              }}>✓ Appliquer l&apos;effet</button>
            {isManual && (
              <button onClick={() => { setConfirmed(true); setTimeout(onClose, 600); }}
                style={{ marginTop: 8, width: "100%", padding: "9px", borderRadius: 10,
                  background: "none", border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.35)", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                Gérer manuellement →
              </button>
            )}
          </>
        ) : confirmed ? (
          <div style={{ padding: "16px", borderRadius: 12,
            background: "rgba(46,204,113,0.12)", border: "1px solid rgba(46,204,113,0.3)",
            color: "#2ECC71", fontWeight: 700, fontSize: 15 }}>
            ✓ Effet appliqué !
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// LAST TOUR MODAL — announces the last round
// ═══════════════════════════════════════════════════════
function LastTourModal({ onDone }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 60);
    const t2 = setTimeout(() => { setVisible(false); setTimeout(onDone, 500); }, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9000, pointerEvents: "none",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.6)" }}>
      <div style={{
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1) translateY(0)" : "scale(0.4) translateY(-50px)",
        transition: "opacity 0.4s ease, transform 0.55s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        <div style={{ fontSize: 72 }}>🏁</div>
        <div style={{
          color: "#F1C40F", fontWeight: 900, fontSize: "clamp(32px,8vw,54px)",
          letterSpacing: 4, textShadow: "0 0 60px rgba(241,196,15,0.7)",
        }}>DERNIER TOUR !</div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 18, marginTop: 8 }}>
          Tout se joue maintenant !
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// PAWN MAP (Plateau tab)
// ═══════════════════════════════════════════════════════
function PawnMap({ teams, setTeams, turn, setTurn, side, starIdx, setStarIdx,
  tourNum, setTourNum, maxTours, onDuel, onFinale,
  bridgeTaxTurns = 0, setBridgeTaxTurns,
  pendingPoisons = [], setPendingPoisons,
  getChaosCard, onApplyChaos }) {

  // Die roller
  const [dieValues, setDieValues] = useState([null]);
  const [reachable, setReachable]  = useState([]); // [{id, path:[]}]

  // Hop animation
  const [displayPos, setDisplayPos] = useState(null);
  const animTimers = useRef([]);

  // Modals
  const [toast, setToast]           = useState(null);
  const [showShop, setShowShop]     = useState(false);
  const [showStarBuy, setShowStarBuy] = useState(false);
  const [pendingCaseAction, setPendingCaseAction] = useState(null); // { type, caseId }
  const [tpState, setTpState]       = useState(null);   // null | "pending" | "selecting"
  const [tpOrigin, setTpOrigin]     = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [coinSpin, setCoinSpin]     = useState(null); // { id, finalValue, isPlus }
  const [caseChaosCard, setCaseChaosCard] = useState(null); // chaos card drawn from case
  const [showLastTour, setShowLastTour] = useState(false);
  const [itemPickModal, setItemPickModal] = useState(null); // { teamIdx, instanceIdx, itemIdx }
  const [hoveredCaseId, setHoveredCaseId] = useState(null);

  // Effective bridge cost (raised by Péage chaos card)
  const effectiveBridgeCost = bridgeTaxTurns > 0 ? 4 : BRIDGE_COST;

  // Stable ref — keeps all values fresh in callbacks/timeouts
  const stateRef = useRef({ teams, turn, side, starIdx, bridgeTaxTurns, tourNum, maxTours, pendingPoisons });
  useEffect(() => { stateRef.current = { teams, turn, side, starIdx, bridgeTaxTurns, tourNum, maxTours, pendingPoisons }; });

  // nextTurn ref — always points to latest version
  // Tour rotation: tour N starts at team (N-1)%4, so each tour a different team goes first.
  const nextTurnRef = useRef(null);
  nextTurnRef.current = () => {
    const { turn: tr, bridgeTaxTurns: btt, tourNum: tn, maxTours: mt, pendingPoisons: pp } = stateRef.current;
    const newTurn = (tr + 1) % 4;
    // First team of the CURRENT tour — when newTurn cycles back to it, the tour is complete.
    const ftt = (tn - 1) % 4;
    const tourEnds = newTurn === ftt;
    // If tour ends, next active team is first of the NEXT tour: (ftt+1)%4
    const actualNewTurn = tourEnds ? (ftt + 1) % 4 : newTurn;

    if (pp.includes(actualNewTurn)) {
      setTeams(prev => prev.map((tm, i) => i === actualNewTurn ? { ...tm, coins: Math.max(0, tm.coins - 4) } : tm));
      setPendingPoisons(prev => prev.filter(x => x !== actualNewTurn));
      show(`🍄 Poison ! ${TE[actualNewTurn]} perd 4₽`);
    }
    setBridgeTaxTurns(p => Math.max(0, p - 1));
    setTurn(actualNewTurn);
    if (tourEnds) {
      const newTour = tn + 1;
      setTourNum(newTour);
      if (newTour === mt) {
        // Show "last tour" banner first, then mini-game after it's dismissed
        setTimeout(() => setShowLastTour(true), 200);
      } else {
        setShowMiniGame(true);
      }
    }
  };

  const show = (msg, dur = 3200) => { setToast(msg); setTimeout(() => setToast(null), dur); };

  // ── Item use ──────────────────────────────────────────
  const useItem = (teamIdx, instanceIdx, itemIdx) => {
    if (teamIdx !== turn) return; // only active team
    if (itemIdx === 1) {
      // Activate shield: move from bag to shields counter
      setTeams(prev => prev.map((tm, i) => {
        if (i !== teamIdx) return tm;
        const items = [...tm.items]; items.splice(instanceIdx, 1);
        return { ...tm, items, shields: tm.shields + 1 };
      }));
      show(`${TE[teamIdx]} 🛡️ Bouclier activé !`);
      return;
    }
    if (itemIdx === 0) {
      // Double dé: roll an extra die and add to current dieValues
      const extra = Math.ceil(Math.random() * 6);
      setDieValues(prev => {
        const cleaned = prev.filter(v => v !== null);
        return [...cleaned, extra];
      });
      setTeams(prev => prev.map((tm, i) => {
        if (i !== teamIdx) return tm;
        const items = [...tm.items]; items.splice(instanceIdx, 1);
        return { ...tm, items };
      }));
      show(`🎲 Double dé ! +${extra}`);
    } else {
      // Poison, Voleur, Échangeur need a target
      setItemPickModal({ teamIdx, instanceIdx, itemIdx });
    }
  };

  const applyItem = (targetIdx) => {
    if (!itemPickModal) return;
    const { teamIdx, instanceIdx, itemIdx } = itemPickModal;
    setTeams(prev => {
      const t = prev.map(x => ({ ...x }));
      const items = [...t[teamIdx].items]; items.splice(instanceIdx, 1);
      t[teamIdx].items = items;
      if (itemIdx === 3) { // Voleur — steal 5₽, blocked by shield
        if (t[targetIdx].shields > 0) {
          t[targetIdx].shields -= 1;
          show(`🫳 Voleur bloqué par le bouclier de ${TE[targetIdx]} !`);
        } else {
          const stolen = Math.min(5, t[targetIdx].coins);
          t[teamIdx].coins += stolen; t[targetIdx].coins -= stolen;
          show(`🫳 ${TE[teamIdx]} vole ${stolen}₽ à ${TE[targetIdx]}`);
        }
      } else if (itemIdx === 4) { // Échangeur — swap positions
        const [pa, pb] = [t[teamIdx].pos, t[targetIdx].pos];
        t[teamIdx].pos = pb; t[targetIdx].pos = pa;
        show(`🔄 ${TE[teamIdx]} et ${TE[targetIdx]} échangent leur position !`);
      }
      return t;
    });
    if (itemIdx === 2) { // Poison — deferred (item already removed in setTeams above)
      setPendingPoisons(prev => [...prev, targetIdx]);
      show(`🍄 Poison posé sur ${TE[targetIdx]} — effet au prochain tour !`);
    }
    setItemPickModal(null);
  };

  // Recompute reachable when die total or active team changes
  useEffect(() => {
    const total = dieValues.reduce((s, v) => s + (v || 0), 0);
    if (total > 0) {
      const { teams: t, turn: tr, side: s } = stateRef.current;
      const pos = t[tr]?.pos ?? "1a";
      const coins = t[tr]?.coins ?? 0;
      const all = getReachableCases(pos, total, s);
      // Hide destinations that require a bridge the team can't afford
      setReachable(all.filter(({ usesBridge }) => !usesBridge || coins >= effectiveBridgeCost));
    } else {
      setReachable([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dieValues, turn]);

  // Clear animation timers on unmount
  useEffect(() => () => animTimers.current.forEach(clearTimeout), []);

  const clearAnim = () => { animTimers.current.forEach(clearTimeout); animTimers.current = []; };

  const hopTo = (path, onFinish) => {
    clearAnim();
    path.forEach((caseId, i) => {
      const t = setTimeout(() => {
        setDisplayPos(caseId);
        if (i === path.length - 1) {
          const t2 = setTimeout(() => { setDisplayPos(null); onFinish(); }, 260);
          animTimers.current.push(t2);
        }
      }, i * 230);
      animTimers.current.push(t);
    });
  };

  // Core arrival handler (after pawn animation finishes)
  const applyArrival = useCallback((caseId, traversedPath) => {
    const { teams: t, turn: tr, side: s, starIdx: si } = stateRef.current;
    const c  = gc(caseId);
    const tp = c ? (c.r === c.v ? c.r : (s === 0 ? c.r : c.v)) : null;
    const currentPos = t[tr]?.pos ?? "1a";

    // Bridge cost — check traversed path for any bridge crossing (bidirectional)
    const effBridgeCost = stateRef.current.bridgeTaxTurns > 0 ? 4 : BRIDGE_COST;
    let bridgeCost = 0;
    if (traversedPath && traversedPath.length > 1) {
      for (let k = 0; k < traversedPath.length - 1; k++) {
        const pa = traversedPath[k], pb = traversedPath[k + 1];
        const usesBridge = BRIDGE_CONNECTIONS.some(([bf, bt]) =>
          (bf === pa && bt === pb) || (bt === pa && bf === pb));
        if (usesBridge) {
          if ((t[tr]?.coins ?? 0) < effBridgeCost) {
            show(`${TE[tr]} ❌ Pas assez pour le pont (${effBridgeCost}₽) !`);
            return;
          }
          bridgeCost = effBridgeCost;
          show(`${TE[tr]} 🌉 Pont −${effBridgeCost}₽`);
          break;
        }
      }
    }

    // Star traversal detection
    const st    = AS[si];
    const sfId  = st?.f?.id || st?.fId;
    const stId  = st?.t?.id || st?.tId;
    let starHit = false;
    if (sfId && stId && traversedPath && traversedPath.length > 1) {
      for (let k = 0; k < traversedPath.length - 1; k++) {
        if ((traversedPath[k] === sfId && traversedPath[k+1] === stId) ||
            (traversedPath[k] === stId  && traversedPath[k+1] === sfId)) {
          starHit = true; break;
        }
      }
    }

    // Unified random coin value (gaussian-like, slight positive bias)
    const isCoinCase = ["coins", "coins_plus", "coins_minus"].includes(tp);
    let coinVal = 0;
    if (isCoinCase) coinVal = COIN_WEIGHTS[Math.floor(Math.random() * COIN_WEIGHTS.length)];

    // Batch all state updates
    setTeams(prev => prev.map((tm, i) => {
      if (i !== tr) return tm;
      let coins   = Math.max(0, tm.coins - bridgeCost);
      let shields = tm.shields;
      if (isCoinCase) coins = Math.max(0, coins + coinVal);
      if (tp === "bonus")  coins += 5;
      if (tp === "shield") shields += 1;
      const visited = tm.visitedCases ?? [];
      return {
        ...tm, coins, shields, pos: caseId,
        visitedCases: visited.includes(caseId) ? visited : [...visited, caseId],
      };
    }));

    // ── Star before special-case handlers (so passing star on way to question still triggers) ──
    if (starHit) {
      if (["shop", "duel", "teleport", "question", "chaos"].includes(tp)) {
        setPendingCaseAction({ type: tp, caseId });
      } else if (isCoinCase) {
        setPendingCaseAction({ type: "coins", caseId, coinVal });
      }
      setShowStarBuy(true);
      return;
    }

    // Auto-applied effects: coin spin / shield / then advance turn
    if (isCoinCase) {
      setCoinSpin({ id: Date.now(), finalValue: Math.abs(coinVal), isPlus: coinVal >= 0 });
      // nextTurn called via CoinSpinModal onDone
    } else if (tp === "bonus") {
      setCoinSpin({ id: Date.now(), finalValue: 5, isPlus: true });
    } else if (tp === "shield") {
      show(`${TE[tr]} 🛡️ +1 bouclier !`);
      setTimeout(() => nextTurnRef.current?.(), 3200);
    } else if (tp === "shop")     { setShowShop(true); return; }
    else if (tp === "duel")       { onDuel?.(() => nextTurnRef.current?.()); return; }
    else if (tp === "teleport")   { setTpOrigin(caseId); setTpState("pending"); return; }
    else if (tp === "question")   { setShowQuestion(true); return; }
    else if (tp === "chaos") {
      const card = getChaosCard?.();
      if (card) setCaseChaosCard(card);
      return;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTeams, onDuel, setCoinSpin, getChaosCard]);

  const handleCaseClick = useCallback((caseId) => {
    // Teleport selection
    if (tpState === "selecting") {
      if (!TELEPORT_IDS.includes(caseId) || caseId === tpOrigin) return;
      const { turn: tr } = stateRef.current;
      setTeams(prev => prev.map((tm, i) => i !== tr ? tm : {
        ...tm, pos: caseId, coins: Math.max(0, tm.coins - TELEPORT_COST),
        visitedCases: (tm.visitedCases ?? []).includes(caseId)
          ? (tm.visitedCases ?? []) : [...(tm.visitedCases ?? []), caseId],
      }));
      setTpState(null); setTpOrigin(null);
      show(`⚡ Téléporté vers ${caseId} ! −${TELEPORT_COST}₽`);
      setTimeout(() => nextTurnRef.current?.(), 3200);
      return;
    }

    const reachEntry = reachable.find(r => r.id === caseId);
    if (reachEntry && reachEntry.path.length > 0) {
      // Hop animation
      const { turn: tr } = stateRef.current;
      const fullPath = [stateRef.current.teams[tr]?.pos ?? "1a", ...reachEntry.path];
      setDieValues([null]);
      setReachable([]);
      setHoveredCaseId(null);
      hopTo(reachEntry.path, () => applyArrival(caseId, fullPath));
    } else {
      // Direct click (no die set) — hop case-by-case along shortest path
      const { turn: tr, teams: t, side: s } = stateRef.current;
      const currentPos = t[tr]?.pos ?? "1a";
      if (currentPos === caseId) return;
      const path = findShortestPath(currentPos, caseId, s);
      if (!path) { show("❌ Aucun chemin disponible vers cette case dans ce sens."); return; }
      const coins = t[tr]?.coins ?? 0;
      const effCost = stateRef.current.bridgeTaxTurns > 0 ? 4 : BRIDGE_COST;
      const needsBridge = path.some((p, k) => k < path.length - 1 &&
        BRIDGE_CONNECTIONS.some(([bf, bt]) =>
          (bf === path[k] && bt === path[k + 1]) || (bt === path[k] && bf === path[k + 1])));
      if (needsBridge && coins < effCost) {
        show(`❌ Pas assez de pièces pour traverser le pont (${effCost}₽ nécessaires)`);
        return;
      }
      hopTo(path.slice(1), () => applyArrival(caseId, path));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tpState, tpOrigin, reachable, applyArrival]);

  const buyItem = (itemIdx) => {
    const item = SI[itemIdx];
    setTeams(prev => prev.map((tm, i) => {
      if (i !== turn) return tm;
      return {
        ...tm, coins: tm.coins - item.c,
        items: [...(tm.items ?? []), itemIdx],
      };
    }));
    show(`${TE[turn]} 🛒 ${item.e} ${item.n} acheté !`);
  };

  const resolvePendingCase = (action) => {
    if (!action) return;
    const { type, caseId: pCaseId, coinVal: pCoinVal } = action;
    if (type === "shop")         setShowShop(true);
    else if (type === "duel")     onDuel?.(() => nextTurnRef.current?.());
    else if (type === "teleport") { setTpOrigin(pCaseId); setTpState("pending"); }
    else if (type === "question") setShowQuestion(true);
    else if (type === "chaos")    {
      const card = getChaosCard?.();
      if (card) setCaseChaosCard(card);
    } else if (type === "coins") {
      setCoinSpin({ id: Date.now(), finalValue: Math.abs(pCoinVal), isPlus: pCoinVal >= 0 });
    }
  };

  const buyStar = () => {
    setTeams(prev => prev.map((tm, i) => i !== turn ? tm : {
      ...tm, coins: tm.coins - STAR_COST, stars: tm.stars + 1,
    }));
    // Balanced star placement: pick from top 25% most-balanced candidates
    const { teams: t, side: s } = stateRef.current;
    const teamPositions = t.map(tm => tm.pos);
    const candidates = AS.map((_, i) => i).filter(i => i !== starIdx);
    const scored = candidates.map(idx => {
      const seg = AS[idx];
      const sfId = seg.f?.id || seg.fId;
      if (!sfId) return { idx, score: 999 };
      const dists = teamPositions.map(pos => {
        const path = findShortestPath(pos, sfId, s);
        return path ? path.length - 1 : 20;
      });
      const spread = Math.max(...dists) - Math.min(...dists);
      return { idx, score: spread + Math.random() * 3 };
    });
    scored.sort((a, b) => a.score - b.score);
    const topN = Math.max(1, Math.floor(scored.length * 0.25));
    const pick = scored[Math.floor(Math.random() * topN)];
    setStarIdx(pick.idx);
    setShowStarBuy(false);
    show(`${TE[turn]} ⭐ +1⭐ — l'étoile se déplace !`);
    const pending = pendingCaseAction;
    setPendingCaseAction(null);
    if (pending) {
      resolvePendingCase(pending);
      // nextTurn will be called by whatever pending modal closes
    } else {
      nextTurnRef.current?.();
    }
  };

  const tourPct      = Math.round((tourNum / maxTours) * 100);
  const estMin       = maxTours * 8;
  const tpHighlights = tpState === "selecting" ? TELEPORT_IDS.filter(id => id !== tpOrigin) : [];
  const highlightCases = reachable.map(r => r.id);
  // Full path (currentPos + steps) for the hovered reachable destination
  const hoveredPathFull = (() => {
    if (!hoveredCaseId) return [];
    const entry = reachable.find(r => r.id === hoveredCaseId);
    if (!entry) return [];
    return [teams[turn]?.pos ?? "1a", ...entry.path];
  })();
  const dieTotal     = dieValues.reduce((s, v) => s + (v || 0), 0);

  // Pawn positions: use displayPos for active team during animation
  const pawns = teams.map((tm, i) => ({
    teamIdx: i,
    caseId: (i === turn && displayPos) ? displayPos : (tm.pos ?? "1a"),
  }));

  return (
    <div style={{ paddingBottom: 8 }}>
      {/* ── Tour counter ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12, marginBottom: 12,
        padding: "10px 18px", borderRadius: 14,
        background: "linear-gradient(90deg,rgba(241,196,15,0.09),rgba(52,152,219,0.05))",
        border: "1px solid rgba(241,196,15,0.2)",
      }}>
        <span style={{ fontSize: 18 }}>🗺️</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ color: "#F1C40F", fontWeight: 800, fontSize: 15 }}>Tour {tourNum}</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
              / {maxTours} · <span style={{ color: "rgba(255,255,255,0.25)" }}>~{estMin} min</span>
            </span>
          </div>
          <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${tourPct}%`, borderRadius: 3,
              background: tourPct >= 80 ? "#E74C3C" : tourPct >= 50 ? "#F1C40F" : "#2ECC71",
              transition: "width 0.4s, background 0.4s" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <button onClick={() => setTourNum(p => Math.max(1, p - 1))} style={{
            background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)",
            borderRadius: 6, padding: "2px 8px", fontSize: 11, cursor: "pointer", fontFamily: "inherit",
          }}>−</button>
          <button onClick={() => setTourNum(p => Math.min(maxTours, p + 1))} style={{
            background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)",
            borderRadius: 6, padding: "2px 8px", fontSize: 11, cursor: "pointer", fontFamily: "inherit",
          }}>+</button>
        </div>
      </div>

      {toast && (
        <div style={{
          textAlign: "center", background: "rgba(10,12,24,0.97)",
          border: "1px solid rgba(255,255,255,0.13)", padding: "8px 20px",
          borderRadius: 10, color: "#fff", fontSize: 13, fontWeight: 600, marginBottom: 10,
        }}>
          {toast}
        </div>
      )}

      {/* ── Main layout: left side-panel + right board ── */}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>

        {/* ── LEFT PANEL ──────────────────────────────── */}
        <div style={{ flex: "0 0 196px", minWidth: 180, display: "flex", flexDirection: "column", gap: 10 }}>

          {/* Die roller */}
          <DiePanel
            values={dieValues}
            onChange={(di, v) => setDieValues(prev => { const nxt = [...prev]; nxt[di] = v; return nxt; })}
            onRoll={() => setDieValues(prev => prev.map(() => Math.floor(Math.random() * 6) + 1))}
            onAddDie={() => setDieValues(prev => [...prev, null])}
            onRemoveDie={() => setDieValues(prev => prev.slice(0, -1))}
            reachableCount={dieTotal > 0 ? highlightCases.length : 0}
          />

          {/* Team stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {teams.map((tm, i) => (
              <div key={i} style={{
                padding: "8px 10px", borderRadius: 12,
                background: i === turn ? `${TC[i]}18` : "rgba(255,255,255,0.025)",
                border: `2px solid ${i === turn ? TC[i]+"70" : "rgba(255,255,255,0.06)"}`,
                boxShadow: i === turn ? `0 0 10px ${TC[i]}20` : "none",
                transition: "all 0.2s",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                  <span style={{ fontSize: 13 }}>{TE[i]}</span>
                  <span style={{
                    color: i === turn ? TC[i] : "rgba(255,255,255,0.7)",
                    fontWeight: 700, fontSize: 12, flex: 1,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>{tm.name}</span>
                  {i === turn && <span style={{ color: TC[i], fontSize: 8, fontWeight: 800 }}>▶ JOUE</span>}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ color: "#D4A017", fontWeight: 700, fontSize: 13 }}>🪙{tm.coins}</span>
                  <span style={{ color: "#F1C40F", fontWeight: 700, fontSize: 13 }}>⭐{tm.stars}</span>
                  {tm.shields > 0 && <span style={{ color: "#607D8B", fontSize: 12 }}>🛡{tm.shields}</span>}
                </div>
                {(tm.items ?? []).length > 0 && (
                  <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginTop: 4 }}>
                    {(tm.items ?? []).map((idx, j) => {
                      const isActive = i === turn;
                      const hasPending = idx === 2 && pendingPoisons.includes(i);
                      return (
                        <span key={j} title={SI[idx]?.n + (isActive ? " (clic pour utiliser)" : "")}
                          onClick={isActive ? () => useItem(i, j, idx) : undefined}
                          style={{
                            fontSize: 13, cursor: isActive ? "pointer" : "default",
                            padding: "1px 3px", borderRadius: 4,
                            background: hasPending ? "rgba(231,76,60,0.3)" : (isActive ? "rgba(39,174,96,0.15)" : "transparent"),
                            border: isActive ? "1px solid rgba(39,174,96,0.35)" : "1px solid transparent",
                            opacity: hasPending ? 0.5 : 1,
                          }}>{SI[idx]?.e}</span>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bridge tax indicator */}
          {bridgeTaxTurns > 0 && (
            <div style={{
              padding: "6px 10px", borderRadius: 9, marginBottom: 6,
              background: "rgba(255,140,0,0.12)", border: "1px solid rgba(255,140,0,0.35)",
              color: "#FFA040", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 6,
            }}>
              🚧 Péage actif — ponts 4₽
              <span style={{ marginLeft: "auto", opacity: 0.7 }}>{bridgeTaxTurns} tour{bridgeTaxTurns > 1 ? "s" : ""}</span>
            </div>
          )}

          {/* Active team controls */}
          <div style={{
            padding: "10px 10px", borderRadius: 12,
            background: `${TC[turn]}10`, border: `1px solid ${TC[turn]}30`,
          }}>
            <div style={{ color: TC[turn], fontWeight: 800, fontSize: 13, marginBottom: 8 }}>
              {TE[turn]} {teams[turn].name}
            </div>
            {tpState === "selecting" ? (
              <div style={{ color: "#00BCD4", fontSize: 11, fontWeight: 700, marginBottom: 8 }}>
                ⚡ Clique une case téléport rouge sur le plateau
              </div>
            ) : dieTotal > 0 ? (
              <div style={{ color: "#F1C40F", fontSize: 11, marginBottom: 8 }}>
                {highlightCases.length > 0
                  ? `Clique une case jaune (${dieTotal} pas)`
                  : "Calcul des cases…"}
              </div>
            ) : (
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginBottom: 8 }}>
                Lance le dé, puis clique une case
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {tpState === "selecting" && (
                <button onClick={() => { setTpState(null); setTpOrigin(null); }} style={{
                  width: "100%", padding: "7px", borderRadius: 9, fontSize: 12, fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit",
                  background: "rgba(231,76,60,0.15)", border: "1px solid rgba(231,76,60,0.35)", color: "#E74C3C",
                }}>✕ Annuler téléport</button>
              )}
              <button onClick={() => nextTurnRef.current?.()} style={{
                width: "100%", padding: "8px", borderRadius: 9, fontSize: 12, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit",
                background: `${TC[turn]}22`, border: `1px solid ${TC[turn]}45`, color: TC[turn],
              }}>Équipe suivante →</button>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Board ─────────────────────────────── */}
        <div style={{ flex: 1, minWidth: 0, maxWidth: "calc(100% - 200px)" }}>
          <BoardSVG
            side={side} starIdx={starIdx} buying={false}
            withHover={false} mario={true}
            onCaseClick={handleCaseClick}
            pawns={pawns}
            activePawnTeamIdx={turn}
            tpHighlights={tpHighlights}
            highlightCases={highlightCases}
            bridgeCostOverride={effectiveBridgeCost}
            hoveredPath={hoveredPathFull}
            onCaseHover={highlightCases.length > 0 ? setHoveredCaseId : undefined}
          />
        </div>
      </div>

      {/* ── Fin de Partie — absolutely below the board ── */}
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <button onClick={() => onFinale?.()} style={{
          padding: "12px 40px",
          background: "linear-gradient(135deg,rgba(241,196,15,0.16),rgba(230,126,34,0.1))",
          border: "2px solid rgba(241,196,15,0.35)", color: "#F1C40F",
          borderRadius: 14, fontSize: 14, fontWeight: 800,
          cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5,
        }}>
          🏁 FIN DE PARTIE
        </button>
      </div>

      {/* Modals */}
      {showShop && (
        <ShopModal
          team={teams[turn]}
          onBuy={buyItem}
          onClose={() => { setShowShop(false); nextTurnRef.current?.(); }}
        />
      )}
      {showStarBuy && (
        <StarBuyModal
          team={teams[turn]}
          onBuy={buyStar}
          onSkip={() => {
            setShowStarBuy(false);
            const pending = pendingCaseAction;
            setPendingCaseAction(null);
            if (pending) resolvePendingCase(pending);
            else nextTurnRef.current?.();
          }}
        />
      )}
      {tpState === "pending" && (
        <TeleportModal
          team={teams[turn]}
          onUse={() => setTpState("selecting")}
          onSkip={() => { setTpState(null); setTpOrigin(null); nextTurnRef.current?.(); }}
        />
      )}
      {showQuestion && (
        <QuestionModal
          teams={teams}
          turn={turn}
          setTeams={setTeams}
          onClose={() => { setShowQuestion(false); nextTurnRef.current?.(); }}
        />
      )}
      {showMiniGame && (
        <MiniGameModal
          teams={teams}
          setTeams={setTeams}
          onDone={() => setShowMiniGame(false)}
        />
      )}
      {coinSpin && (
        <CoinSpinModal
          key={coinSpin.id}
          finalValue={coinSpin.finalValue}
          isPlus={coinSpin.isPlus}
          onDone={() => { setCoinSpin(null); nextTurnRef.current?.(); }}
        />
      )}
      {caseChaosCard && (
        <ChaosCardModal
          card={caseChaosCard}
          teams={teams}
          turn={turn}
          onApply={(name, t1, t2) => { onApplyChaos?.(name, t1, t2); }}
          onApplyCoins={(delta) => setTeams(prev => prev.map((tm, i) =>
            i !== turn ? tm : { ...tm, coins: Math.max(0, tm.coins + delta) }
          ))}
          onClose={() => { setCaseChaosCard(null); nextTurnRef.current?.(); }}
        />
      )}
      {showLastTour && (
        <LastTourModal onDone={() => { setShowLastTour(false); setShowMiniGame(true); }} />
      )}

      {/* Item use target picker */}
      {itemPickModal && (() => {
        const item = SI[itemPickModal.itemIdx];
        const labels = { 2: "Empoisonner", 3: "Voler 5₽ à", 4: "Échanger position avec" };
        return (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999,
          }}>
            <div style={{
              background: "#1a1a2e", border: "2px solid rgba(39,174,96,0.4)",
              borderRadius: 18, padding: "24px 28px", maxWidth: 340, width: "90%",
            }}>
              <div style={{ textAlign: "center", fontSize: 36, marginBottom: 6 }}>{item?.e}</div>
              <div style={{ textAlign: "center", fontWeight: 800, fontSize: 16, color: "#2ECC71", marginBottom: 4 }}>{item?.n}</div>
              <div style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 16 }}>
                {labels[itemPickModal.itemIdx]} :
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {teams.map((tm, i) => i !== turn && (
                  <button key={i} onClick={() => applyItem(i)} style={{
                    background: `${TC[i]}20`, border: `1px solid ${TC[i]}50`,
                    color: TC[i], padding: "10px 16px", borderRadius: 10,
                    fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <span>{TE[i]}</span>
                    <span style={{ flex: 1 }}>{tm.name}</span>
                    <span style={{ opacity: 0.6, fontSize: 11 }}>🪙{tm.coins} ⭐{tm.stars}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setItemPickModal(null)} style={{
                width: "100%", marginTop: 14, padding: "8px", borderRadius: 9,
                background: "rgba(231,76,60,0.15)", border: "1px solid rgba(231,76,60,0.35)",
                color: "#E74C3C", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              }}>Annuler</button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════
const getStatVal = (team, stat) =>
  stat === "visitedCases" ? (team.visitedCases?.length ?? 0) : (team[stat] ?? 0);

// ═══════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════
export default function App() {
  // ── Persistent state ──────────────────────────────────
  const [tab,      setTab]      = useLS("archi_tab",    "dashboard");
  const [teams,    setTeams]    = useLS("archi_teams",  INIT_TEAMS);
  const [used,     setUsed]     = useLS("archi_used",   INIT_USED);
  const [extraQ,   setExtraQ]   = useLS("archi_extraQ",  { college: [], lycee: [], expert: [] });
  const [hiddenQ,  setHiddenQ]  = useLS("archi_hiddenQ", { college: [], lycee: [], expert: [] });
  const [turn,     setTurn]     = useLS("archi_turn",   0);
  const [tourNum,  setTourNum]  = useLS("archi_tour",   1);
  const [maxTours, setMaxTours] = useLS("archi_maxtour", 10);
  const [mapSide,  setMapSide]  = useLS("archi_side",   0);
  const [mgCount,  setMgCount]  = useLS("archi_mg",     0);
  const [starIdx,  setStarIdx]  = useLS("archi_star",   4);
  const [usedCC,       setUsedCC]       = useLS("archi_cc",        []);
  const [mgFilter,     setMgFilter]     = useLS("archi_mgf",       "all");
  const [bridgeTaxTurns, setBridgeTaxTurns] = useLS("archi_bridgetax", 0);
  const [pendingPoisons, setPendingPoisons] = useLS("archi_poisons",   []);

  // ── Transient state ───────────────────────────────────
  const [curQ,       setCurQ]       = useState(null);
  const [showA,      setShowA]      = useState(false);
  const [editT,      setEditT]      = useState(null);
  const [curCC,      setCurCC]      = useState(null);
  const [randMG,     setRandMG]     = useState(null);
  const [resetConf,  setResetConf]  = useState(false);
  const [showFinale, setShowFinale] = useState(false);
  const [showDuel,   setShowDuel]   = useState(false);
  const [usedMG,     setUsedMG]     = useState([]);
  const [qMJView,    setQMJView]    = useState(false);
  const [qMJFilter,  setQMJFilter]  = useState({ level: "all", cat: "all", used: "all" });
  const [amnesiaActive, setAmnesiaActive] = useState(false); // Carte Amnésie — prochaine question sans gain
  const duelNextTurnRef = useRef(null);

  // Expose Q + used-question registry globally (accessible from DuelModal, QuestionModal, PawnMap)
  useEffect(() => {
    // Effective pool = base + custom extras (hiddenQ handled via _usedQ injection below)
    window._Q = {
      college: [...Q.college, ...(extraQ.college || [])],
      lycee:   [...Q.lycee,   ...(extraQ.lycee   || [])],
      expert:  [...Q.expert,  ...(extraQ.expert  || [])],
    };
    return () => { delete window._Q; };
  }, [extraQ]);
  useEffect(() => {
    // Hidden questions are injected as "already used" so drawing code skips them
    window._usedQ = {
      college: [...new Set([...(used.college || []), ...(hiddenQ.college || [])])],
      lycee:   [...new Set([...(used.lycee   || []), ...(hiddenQ.lycee   || [])])],
      expert:  [...new Set([...(used.expert  || []), ...(hiddenQ.expert  || [])])],
    };
    window._markUsed = (lv, idx) => setUsed(prev => {
      const already = prev[lv] ?? [];
      if (already.includes(idx)) return prev;
      return { ...prev, [lv]: [...already, idx] };
    });
    return () => { delete window._usedQ; delete window._markUsed; };
  }, [used, hiddenQ]);
  useEffect(() => {
    window._usedMG = usedMG;
    window._markUsedMG = (id) => setUsedMG(prev => prev.includes(id) ? prev : [...prev, id]);
    return () => { delete window._usedMG; delete window._markUsedMG; };
  }, [usedMG]);
  // Expose amnesia flag so QuestionModal can clear it after consuming
  useEffect(() => {
    window._amnesia = amnesiaActive;
    window._clearAmnesia = () => setAmnesiaActive(false);
  }, [amnesiaActive]);

  // ── Team helpers ──────────────────────────────────────
  const upT  = (i, field, delta)  => setTeams(p => p.map((t, j) => j === i ? { ...t, [field]: Math.max(0, t[field] + delta) } : t));
  const setTF = (i, field, value) => setTeams(p => p.map((t, j) => j === i ? { ...t, [field]: value } : t));

  // ── Question helpers ──────────────────────────────────
  const drawQ = useCallback((lv) => {
    const basePool  = Q[lv];
    const extraPool = extraQ[lv] || [];
    const baseLen   = basePool.length;
    setUsed(prev => {
      const u      = prev[lv] ?? [];
      const hidden = new Set(hiddenQ[lv] || []);
      const usedS  = new Set(u);
      const avail  = [];
      basePool.forEach((_, i)  => { if (!usedS.has(i)            && !hidden.has(i)) avail.push(i); });
      extraPool.forEach((_, j) => { if (!usedS.has(baseLen + j))                    avail.push(baseLen + j); });
      if (avail.length === 0) {
        // Repartir à zéro en gardant les questions cachées exclues
        const fresh = [];
        basePool.forEach((_, i)  => { if (!hidden.has(i)) fresh.push(i); });
        extraPool.forEach((_, j) => { fresh.push(baseLen + j); });
        const oi = fresh[Math.floor(Math.random() * fresh.length)];
        const q  = oi < baseLen ? basePool[oi] : extraPool[oi - baseLen];
        setCurQ({ ...q, level: lv });
        return { ...prev, [lv]: [...hidden, oi] };
      }
      const oi = avail[Math.floor(Math.random() * avail.length)];
      const q  = oi < baseLen ? basePool[oi] : extraPool[oi - baseLen];
      setCurQ({ ...q, level: lv });
      return { ...prev, [lv]: [...u, oi] };
    });
    setShowA(false);
    setTab("questions");
  }, [setUsed, setTab, extraQ, hiddenQ]);

  const rem = (lv) => {
    const baseLen  = Q[lv].length;
    const extraLen = extraQ[lv]?.length || 0;
    const skip     = new Set([...(used[lv] || []), ...(hiddenQ[lv] || [])]);
    let n = 0;
    for (let i = 0; i < baseLen;  i++) if (!skip.has(i))            n++;
    for (let j = 0; j < extraLen; j++) if (!skip.has(baseLen + j))  n++;
    return n;
  };

  // ── Chaos card helper ─────────────────────────────────
  const drawCC = useCallback(() => {
    setUsedCC(prev => {
      const avail = CC_DECK.reduce((acc, _, pos) => { if (!prev.includes(pos)) acc.push(pos); return acc; }, []);
      if (avail.length === 0) {
        const pos = Math.floor(Math.random() * CC_DECK.length);
        const cardIdx = CC_DECK[pos];
        setCurCC({ ...CC[cardIdx], idx: cardIdx, deckPos: pos });
        return [pos];
      }
      const ri = Math.floor(Math.random() * avail.length);
      const deckPos = avail[ri];
      const cardIdx = CC_DECK[deckPos];
      setCurCC({ ...CC[cardIdx], idx: cardIdx, deckPos });
      return [...prev, deckPos];
    });
  }, [setUsedCC]);

  // ── Synchronous chaos card draw (for PawnMap inline chaos cases) ──
  const usedCCRef = useRef(usedCC);
  useEffect(() => { usedCCRef.current = usedCC; }, [usedCC]);
  const getChaosCard = useCallback(() => {
    const prev = usedCCRef.current;
    const avail = CC_DECK.reduce((acc, _, pos) => { if (!prev.includes(pos)) acc.push(pos); return acc; }, []);
    const deckPos = avail.length
      ? avail[Math.floor(Math.random() * avail.length)]
      : Math.floor(Math.random() * CC_DECK.length);
    const cardIdx = CC_DECK[deckPos];
    const card = { ...CC[cardIdx], idx: cardIdx, deckPos };
    setUsedCC(prev2 => {
      if (prev2.length >= CC_DECK.length) return [deckPos];
      if (prev2.includes(deckPos)) return prev2;
      return [...prev2, deckPos];
    });
    return card;
  }, [setUsedCC]);

  // ── Chaos auto-apply ──────────────────────────────────
  const applyChaos = useCallback((cardName, targetIdx = null, targetIdx2 = null) => {
    // Pre-compute randomness outside setTeams updater (called twice in strict mode)
    const jackpotWinner = cardName === "Jackpot" ? Math.floor(Math.random() * 4) : -1;
    setTeams(prev => {
      const t = prev.map(x => ({ ...x }));
      switch (cardName) {
        case "Tempête":        return t.map(x => ({ ...x, coins: Math.max(0, x.coins - 2) }));
        case "Aubaine":        return t.map((x, i) => i === turn ? { ...x, coins: x.coins + 5 } : x);
        case "Bénédiction": {
          const min = Math.min(...t.map(x => x.coins));
          return t.map(x => x.coins === min ? { ...x, coins: x.coins + 5 } : x);
        }
        case "Peur du vide": {
          const max = Math.max(...t.map(x => x.coins));
          return t.map(x => x.coins === max ? { ...x, coins: Math.max(0, x.coins - 4) } : x);
        }
        case "Arc-en-ciel":    return t.map(x => ({ ...x, coins: x.coins + x.stars }));
        case "Vol de pièces":
          if (targetIdx === null) return t;
          { const stolen = Math.min(3, t[targetIdx].coins);
            t[turn].coins += stolen; t[targetIdx].coins -= stolen; return t; }
        case "Don empoisonné":
          if (targetIdx === null) return t;
          { const given = Math.min(4, t[turn].coins);
            t[turn].coins -= given; t[targetIdx].coins += given; return t; }
        case "Malédiction":
          if (targetIdx === null) return t;
          if (t[targetIdx].shields > 0) { t[targetIdx].shields = Math.max(0, t[targetIdx].shields - 1); }
          else { t[targetIdx].coins = Math.max(0, t[targetIdx].coins - 3); }
          return t;
        case "Aimant":
          if (targetIdx === null || targetIdx2 === null) return t;
          { const [ca, cb] = [t[targetIdx].coins, t[targetIdx2].coins];
            t[targetIdx].coins = cb; t[targetIdx2].coins = ca; return t; }
        case "Vol d'étoile":
          if (targetIdx === null) return t;
          if (t[targetIdx].stars > 0) {
            t[targetIdx].stars -= 1;
            t[turn].stars += 1;
          }
          return t;
        // ── Nouvelles cartes ──────────────────────────────
        case "Taxe": {
          const collected = t.reduce((sum, x, i) => i !== turn ? sum + Math.min(2, x.coins) : sum, 0);
          return t.map((x, i) => {
            if (i === turn) return { ...x, coins: x.coins + collected };
            return { ...x, coins: Math.max(0, x.coins - 2) };
          });
        }
        case "Balance": {
          const total = t.reduce((s, x) => s + x.coins, 0);
          const share = Math.floor(total / 4);
          return t.map(x => ({ ...x, coins: share }));
        }
        case "Coup d'état": {
          const maxS = Math.max(...t.map(x => x.stars));
          const minS = Math.min(...t.map(x => x.stars));
          if (maxS === minS) return t;
          return t.map(x => {
            if (x.stars === maxS) return { ...x, stars: Math.max(0, x.stars - 1) };
            if (x.stars === minS) return { ...x, stars: x.stars + 1 };
            return x;
          });
        }
        case "Héritage": {
          const maxC = Math.max(...t.map(x => x.coins));
          const richIdx = t.findIndex(x => x.coins === maxC);
          const half = Math.floor(t[richIdx].coins / 2);
          const perOther = Math.floor(half / 3);
          return t.map((x, i) => {
            if (i === richIdx) return { ...x, coins: x.coins - half };
            return { ...x, coins: x.coins + perOther };
          });
        }
        case "Jackpot":
          t[jackpotWinner].coins += 8;
          return t;
        case "Échange de positions":
          if (targetIdx === null) return t;
          { const posA = t[turn].pos, posB = t[targetIdx].pos;
            t[turn].pos = posB; t[targetIdx].pos = posA; return t; }
        default: return t;
      }
    });
    if (cardName === "Retournement") setMapSide(s => s === 0 ? 1 : 0);
    if (cardName === "Péage") setBridgeTaxTurns(8);
    if (cardName === "Amnésie") setAmnesiaActive(true);
  }, [turn, setTeams, setMapSide, setBridgeTaxTurns, setAmnesiaActive]);

  // ── Award apply ───────────────────────────────────────
  const applyAward = useCallback((awardIdx) => {
    const teamsWithIdx = teams.map((t, i) => ({ ...t, idx: i }));
    const award = AW[awardIdx];
    const max = Math.max(...teamsWithIdx.map(t => getStatVal(t, award.stat)));
    if (max === 0) return;
    const winners = teamsWithIdx.filter(t => getStatVal(t, award.stat) === max);
    const winnerIdxs = winners.map(w => w.idx);
    setTeams(prev => prev.map((t, i) => winnerIdxs.includes(i) ? { ...t, stars: t.stars + 1 } : t));
  }, [teams, setTeams]);

  // ── Random mini-game picker ───────────────────────────
  const pickMG = useCallback(() => {
    setRandMG(prev => {
      const pool = mgFilter === "all" ? MG : MG.filter(g => g.format === mgFilter);
      if (pool.length === 0) return prev;
      const idx = Math.floor(Math.random() * pool.length);
      return pool[idx];
    });
  }, [mgFilter]);

  // ── Filtered games ────────────────────────────────────
  const filteredGames = mgFilter === "all" ? MG : MG.filter(g => g.format === mgFilter);

  // ── Awards computation ────────────────────────────────
  const teamsWithIdx = teams.map((t, i) => ({ ...t, idx: i }));
  const awardLeaders = AW.map(a => {
    const max = Math.max(...teamsWithIdx.map(t => getStatVal(t, a.stat)));
    const leaders = teamsWithIdx.filter(t => getStatVal(t, a.stat) === max);
    return { award: a, leader: max === 0 ? null : leaders, value: max };
  });

  // ── Ranking ───────────────────────────────────────────
  const ranked = [...teams].map((t, i) => ({ ...t, idx: i }))
    .sort((a, b) => b.stars - a.stars || b.coins - a.coins);

  // ── Reset ─────────────────────────────────────────────
  const resetGame = () => {
    setTeams(INIT_TEAMS);
    setUsed(INIT_USED);
    setTurn(0);
    setTourNum(1);
    setMapSide(0);
    setMgCount(0);
    setStarIdx(4);
    setUsedCC([]);
    setCurQ(null);
    setShowA(false);
    setCurCC(null);
    setRandMG(null);
    setResetConf(false);
    setShowFinale(false);
    setShowDuel(false);
    setUsedMG([]);
    setTab("dashboard");
  };

  // ── UI helpers ────────────────────────────────────────
  const TABS = [
    { id: "dashboard",  label: "🏠 Tableau"   },
    { id: "questions",  label: "❓ Questions"  },
    { id: "carte",      label: "🗺️ Carte"     },
    { id: "plateau",    label: "🎯 Plateau"    },
    { id: "minigames",  label: "🎮 Mini-jeux"  },
    { id: "chaos",      label: "🌀 Chaos"      },
    { id: "rules",      label: "📖 Règles"     },
  ];

  const cardStyle = (i) => ({
    background: "rgba(255,255,255,0.03)",
    border: `2px solid ${TC[i]}28`,
    borderRadius: 16,
    padding: "12px 14px",
  });

  const coinBtnRow = (i) => (
    <div style={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
      {[
        ["+1", 1, "#2ECC71"], ["+2", 2, "#27AE60"], ["+3", 3, "#F1C40F"],
        ["+5", 5, "#1ABC9C"], ["−2", -2, "#E67E22"], ["−3", -3, "#E74C3C"],
        ["−5", -5, "#C0392B"], ["−10",  -10, "#8E44AD"],
      ].map(([l, d, c]) => (
        <Btn key={l} label={l} onClick={() => upT(i, "coins", d)} color={c} small />
      ))}
    </div>
  );

  // ══════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg,#060E1A 0%,#0C1929 35%,#0A1825 70%,#050D18 100%)",
      color: "#C8D0DC",
      fontFamily: "'Fredoka', system-ui, sans-serif",
    }}>
      {/* ── Header ────────────────────────────────────────── */}
      <div style={{ textAlign: "center", padding: "14px 16px 4px" }}>
        <h1 style={{
          color: "#F1C40F", fontSize: "clamp(18px,4vw,30px)", fontWeight: 700,
          margin: 0, letterSpacing: 3, textShadow: "0 0 32px rgba(241,196,15,0.2)",
        }}>
          🏝️ L&apos;ARCHIPEL DU SAVOIR
        </h1>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, marginTop: 3, letterSpacing: 1 }}>
          Tour {tourNum}/{maxTours} · ~{maxTours * 8} min · {mapSide === 0 ? "RECTO" : "VERSO"}
        </div>
      </div>

      {/* ── Tab bar ───────────────────────────────────────── */}
      <nav style={{
        display: "flex", justifyContent: "center", gap: 3,
        padding: "6px 8px", position: "sticky", top: 0, zIndex: 50,
        background: "rgba(6,14,26,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        flexWrap: "wrap",
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: tab === t.id ? "rgba(241,196,15,0.14)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${tab === t.id ? "rgba(241,196,15,0.32)" : "rgba(255,255,255,0.06)"}`,
            color: tab === t.id ? "#F1C40F" : "rgba(255,255,255,0.5)",
            padding: "6px 12px", borderRadius: 10,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            transition: "all 0.15s",
          }}>
            {t.label}
          </button>
        ))}
      </nav>

      {/* ── Content ───────────────────────────────────────── */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "10px 10px 80px" }}>

        {/* ════════════ TABLEAU ════════════════════════════ */}
        {tab === "dashboard" && (
          <div>
            {/* Team grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 10, marginBottom: 12 }}>
              {teams.map((t, i) => (
                <div key={i} style={cardStyle(i)}>
                  {/* Name row */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: "50%",
                      background: `${TC[i]}22`, border: `2px solid ${TC[i]}`,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0,
                    }}>
                      {TE[i]}
                    </div>
                    {editT === i
                      ? <input
                          autoFocus
                          value={t.name}
                          onChange={e => setTF(i, "name", e.target.value)}
                          onBlur={() => setEditT(null)}
                          onKeyDown={e => e.key === "Enter" && setEditT(null)}
                          style={{
                            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.22)",
                            borderRadius: 8, padding: "3px 8px", color: "#fff",
                            fontSize: 13, fontFamily: "inherit", fontWeight: 600, width: "100%", outline: "none",
                          }}
                        />
                      : <span onClick={() => setEditT(i)} style={{ color: "#fff", fontWeight: 600, fontSize: 14, cursor: "text" }} title="Cliquer pour renommer">
                          {t.name}
                        </span>
                    }
                    {/* Rank badge */}
                    {(() => {
                      const r = ranked.findIndex(x => x.idx === i) + 1;
                      const colors = ["#F1C40F","#BDC3C7","#CD7F32","rgba(255,255,255,0.2)"];
                      return <span style={{ marginLeft: "auto", fontSize: 10, color: colors[r-1], fontWeight: 700 }}>#{r}</span>;
                    })()}
                  </div>

                  {/* Stars */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 6,
                    marginBottom: 7, padding: "6px 10px", borderRadius: 10,
                    background: t.stars > 0 ? "rgba(241,196,15,0.1)" : "rgba(255,255,255,0.02)",
                    border: `1px solid ${t.stars > 0 ? "rgba(241,196,15,0.2)" : "transparent"}`,
                  }}>
                    <span style={{ fontSize: 18 }}>⭐</span>
                    <span style={{ color: "#F1C40F", fontSize: 22, fontWeight: 800 }}>{t.stars}</span>
                    <span style={{ color: "rgba(255,255,255,0.28)", fontSize: 9, marginLeft: 2 }}>ÉTOILES</span>
                    <div style={{ marginLeft: "auto", display: "flex", gap: 3 }}>
                      <Btn label="−" onClick={() => upT(i, "stars", -1)} color="#E74C3C" small />
                      <Btn label="+" onClick={() => upT(i, "stars", 1)}  color="#2ECC71" small />
                    </div>
                  </div>

                  {/* Coins */}
                  <div style={{
                    padding: "6px 10px", borderRadius: 10, marginBottom: 7,
                    background: "rgba(255,255,255,0.02)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <span style={{ fontSize: 16 }}>🪙</span>
                      <span style={{ color: "#D4A017", fontSize: 22, fontWeight: 800 }}>{t.coins}</span>
                      <span style={{ color: "rgba(255,255,255,0.28)", fontSize: 9 }}>₽</span>
                    </div>
                    {coinBtnRow(i)}
                  </div>

                  {/* Aux stats */}
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    <StatCounter emoji="🛡️" value={t.shields}   label="BOU" onDec={() => upT(i,"shields",-1)}   onInc={() => upT(i,"shields",1)}   />
                    <StatCounter emoji="🧠" value={t.qOk}       label="QST" onDec={() => upT(i,"qOk",-1)}       onInc={() => upT(i,"qOk",1)}       />
                    <StatCounter emoji="🏆" value={t.mgWon}     label="MJ"  onDec={() => upT(i,"mgWon",-1)}     onInc={() => upT(i,"mgWon",1)}     />
                  </div>
                  {/* Items bag */}
                  {(t.items ?? []).length > 0 && (
                    <div style={{ marginTop: 6, padding: "4px 8px", borderRadius: 8,
                      background: "rgba(39,174,96,0.06)", border: "1px solid rgba(39,174,96,0.15)" }}>
                      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 8, fontWeight: 700, letterSpacing: 1, marginBottom: 3 }}>SAC</div>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {(t.items ?? []).map((itemIdx, j) => (
                          <span key={j} title={SI[itemIdx]?.n} style={{
                            fontSize: 14, padding: "2px 4px", borderRadius: 6,
                            background: "rgba(39,174,96,0.12)",
                          }}>{SI[itemIdx]?.e}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tour & turn bar */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 18px", borderRadius: 14,
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
              marginBottom: 10, flexWrap: "wrap", justifyContent: "center",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>TOUR</span>
                <Btn label="−" onClick={() => setTourNum(p => Math.max(1,p-1))} color="#E74C3C" small />
                <span style={{ color: "#F1C40F", fontSize: 20, fontWeight: 800, minWidth: 40, textAlign: "center" }}>
                  {tourNum}/{maxTours}
                </span>
                <Btn label="+" onClick={() => setTourNum(p => Math.min(maxTours,p+1))} color="#2ECC71" small />
              </div>
              <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.1)" }} />
              <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>C&apos;EST AU TOUR DE</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: TC[turn] }}>{teams[turn].name}</span>
              <Btn label="Suivant →" onClick={() => setTurn(p => (p + 1) % 4)} color="rgba(255,255,255,0.6)" />
            </div>

            {/* Quick question draw */}
            <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 14 }}>
              {Object.entries(LC).map(([k, c]) => (
                <button key={k} onClick={() => drawQ(k)} style={{
                  background: `${c.color}16`, border: `1px solid ${c.color}35`,
                  color: c.color, padding: "8px 18px", borderRadius: 12,
                  fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                }}>
                  {c.emoji} {c.label}
                  <span style={{ opacity: 0.6, fontWeight: 400 }}> · {rem(k)} restantes</span>
                </button>
              ))}
            </div>

            {/* Awards panel */}
            <div style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 14, padding: "12px 16px", marginBottom: 12,
            }}>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>
                AWARDS DE FIN DE PARTIE (+1⭐ chacun)
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {awardLeaders.map(({ award, leader, value }) => (
                  <div key={award.n} style={{
                    flex: "1 1 180px", padding: "8px 12px", borderRadius: 10,
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}>
                    <div style={{ fontSize: 16, marginBottom: 3 }}>{award.e}</div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 12, marginBottom: 2 }}>{award.n}</div>
                    {leader
                      ? <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11 }}>
                          {leader.map((l, i) => (
                            <span key={i}>
                              <span style={{ color: TC[l.idx] }}>{l.name}</span>
                              {i < leader.length - 1 ? " · " : ""}
                            </span>
                          ))}
                          <span style={{ color: "rgba(255,255,255,0.3)" }}> ({value} {award.label})</span>
                        </div>
                      : <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 11 }}>Aucune donnée</div>
                    }
                  </div>
                ))}
              </div>
            </div>

            {/* Ranking */}
            <div style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 14, padding: "12px 16px", marginBottom: 12,
            }}>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>
                CLASSEMENT
              </div>
              {ranked.map((t, rank) => {
                const medals = ["🥇","🥈","🥉","4️⃣"];
                return (
                  <div key={t.idx} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "6px 8px", borderRadius: 8, marginBottom: 4,
                    background: rank === 0 ? "rgba(241,196,15,0.06)" : "transparent",
                  }}>
                    <span style={{ fontSize: 16, minWidth: 24 }}>{medals[rank]}</span>
                    <span style={{ color: TC[t.idx], fontWeight: 700, fontSize: 13, flex: 1 }}>{t.name}</span>
                    <span style={{ color: "#F1C40F", fontWeight: 700, fontSize: 15 }}>⭐ {t.stars}</span>
                    <span style={{ color: "#D4A017", fontSize: 12 }}>🪙 {t.coins}</span>
                  </div>
                );
              })}
            </div>

            {/* Max tours setting */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center",
              marginBottom: 10, flexWrap: "wrap" }}>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Durée de partie :</span>
              {[6, 8, 10, 12, 15].map(n => (
                <button key={n} onClick={() => setMaxTours(n)} style={{
                  padding: "4px 10px", borderRadius: 8, fontFamily: "inherit",
                  cursor: "pointer", textAlign: "center", lineHeight: 1.3,
                  background: maxTours === n ? "rgba(241,196,15,0.18)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${maxTours === n ? "rgba(241,196,15,0.4)" : "rgba(255,255,255,0.08)"}`,
                  color: maxTours === n ? "#F1C40F" : "rgba(255,255,255,0.4)",
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{n} tours</div>
                  <div style={{ fontSize: 9, opacity: 0.7 }}>~{n * 8} min</div>
                </button>
              ))}
            </div>

            {/* Fin de partie */}
            <div style={{ textAlign: "center", marginBottom: 10 }}>
              <button onClick={() => setShowFinale(true)} style={{
                background: "linear-gradient(135deg,rgba(241,196,15,0.2),rgba(230,126,34,0.15))",
                border: "2px solid rgba(241,196,15,0.4)", color: "#F1C40F",
                padding: "12px 32px", borderRadius: 14, fontSize: 15, fontWeight: 800,
                cursor: "pointer", fontFamily: "inherit", letterSpacing: 1,
              }}>
                🏁 FIN DE PARTIE
              </button>
            </div>

            {/* Reset */}
            <div style={{ textAlign: "center" }}>
              {resetConf
                ? <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 18px", borderRadius: 12, background: "rgba(231,76,60,0.1)", border: "1px solid rgba(231,76,60,0.3)" }}>
                    <span style={{ color: "#E74C3C", fontSize: 13 }}>Remettre la partie à zéro ?</span>
                    <Btn label="✓ Oui, tout réinitialiser" onClick={resetGame} color="#E74C3C" />
                    <Btn label="✗ Annuler" onClick={() => setResetConf(false)} color="rgba(255,255,255,0.4)" />
                  </div>
                : <Btn label="🔁 Réinitialiser la partie" onClick={() => setResetConf(true)} color="rgba(255,255,255,0.25)" />
              }
            </div>
          </div>
        )}

        {/* ════════════ QUESTIONS ══════════════════════════ */}
        {tab === "questions" && (
          <div>
            {/* Mode toggle */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
              <button onClick={() => setQMJView(v => !v)} style={{
                padding: "5px 14px", borderRadius: 9, fontSize: 11, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit",
                background: qMJView ? "rgba(212,160,23,0.18)" : "rgba(255,255,255,0.06)",
                border: `1px solid ${qMJView ? "rgba(212,160,23,0.45)" : "rgba(255,255,255,0.1)"}`,
                color: qMJView ? "#D4A017" : "rgba(255,255,255,0.5)",
              }}>
                📋 Vue MJ {qMJView ? "ON" : "OFF"}
              </button>
            </div>

            {/* ── MJ VIEW ── */}
            {qMJView ? (() => {
              const allCats = [...new Set(Object.values(Q).flat().map(q => q.cat))].sort();
              const levelEntries = [
                ["college", LC.college], ["lycee", LC.lycee], ["expert", LC.expert],
              ];
              const allQ = [
                ...Object.entries(Q).flatMap(([lv, qs]) => qs.map((q, i) => ({ ...q, lv, i, custom: false }))),
                ...Object.entries(extraQ).flatMap(([lv, qs]) => qs.map((q, j) => ({ ...q, lv, i: Q[lv].length + j, j, custom: true }))),
              ];
              const filtered = allQ.filter(q => {
                if (qMJFilter.level !== "all" && q.lv !== qMJFilter.level) return false;
                if (qMJFilter.cat !== "all" && q.cat !== qMJFilter.cat) return false;
                const isHidden = !q.custom && hiddenQ[q.lv]?.includes(q.i);
                if (qMJFilter.used === "used" && !used[q.lv]?.includes(q.i) && !isHidden) return false;
                if (qMJFilter.used === "unused" && (used[q.lv]?.includes(q.i) || isHidden)) return false;
                return true;
              });

              return (
                <div>
                  {/* Filters */}
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12,
                    padding: "10px 12px", borderRadius: 12,
                    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    {/* Level */}
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      {[["all","Tous","rgba(255,255,255,0.5)"], ...levelEntries.map(([k,c]) => [k, c.label, c.color])].map(([k, label, color]) => (
                        <button key={k} onClick={() => setQMJFilter(f => ({ ...f, level: k }))} style={{
                          padding: "3px 10px", borderRadius: 7, fontSize: 10, fontWeight: 700,
                          cursor: "pointer", fontFamily: "inherit",
                          background: qMJFilter.level === k ? `${color}25` : "none",
                          border: `1px solid ${qMJFilter.level === k ? color + "50" : "rgba(255,255,255,0.08)"}`,
                          color: qMJFilter.level === k ? color : "rgba(255,255,255,0.4)",
                        }}>{label}</button>
                      ))}
                    </div>
                    {/* Usage */}
                    <div style={{ display: "flex", gap: 4, alignItems: "center", marginLeft: 8 }}>
                      {[["all","Toutes"],["unused","Non posées"],["used","Posées"]].map(([k, label]) => (
                        <button key={k} onClick={() => setQMJFilter(f => ({ ...f, used: k }))} style={{
                          padding: "3px 10px", borderRadius: 7, fontSize: 10, fontWeight: 700,
                          cursor: "pointer", fontFamily: "inherit",
                          background: qMJFilter.used === k ? "rgba(0,188,212,0.2)" : "none",
                          border: `1px solid ${qMJFilter.used === k ? "rgba(0,188,212,0.5)" : "rgba(255,255,255,0.08)"}`,
                          color: qMJFilter.used === k ? "#00BCD4" : "rgba(255,255,255,0.4)",
                        }}>{label}</button>
                      ))}
                    </div>
                    {/* Category */}
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center", marginLeft: 8 }}>
                      {["all", ...allCats].map(k => (
                        <button key={k} onClick={() => setQMJFilter(f => ({ ...f, cat: k }))} style={{
                          padding: "2px 8px", borderRadius: 6, fontSize: 9, fontWeight: 700,
                          cursor: "pointer", fontFamily: "inherit",
                          background: qMJFilter.cat === k ? "rgba(255,255,255,0.12)" : "none",
                          border: `1px solid ${qMJFilter.cat === k ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.07)"}`,
                          color: qMJFilter.cat === k ? "#fff" : "rgba(255,255,255,0.35)",
                        }}>{k === "all" ? "Tout" : k}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>
                      {filtered.length} question{filtered.length !== 1 ? "s" : ""}
                      {Object.values(hiddenQ).flat().length > 0 && <span style={{ color: "#E74C3C", marginLeft: 6 }}>· {Object.values(hiddenQ).flat().length} cachée{Object.values(hiddenQ).flat().length > 1 ? "s" : ""}</span>}
                    </span>
                    <button onClick={() => setHiddenQ({ college: [], lycee: [], expert: [] })} style={{ fontSize: 9, padding: "2px 8px", borderRadius: 6, background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontFamily: "inherit" }}>
                      Tout afficher
                    </button>
                  </div>
                  {/* Question list */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {filtered.map((q, ri) => {
                      const lc      = LC[q.lv];
                      const isUsed  = used[q.lv]?.includes(q.i);
                      const isHidden = !q.custom && hiddenQ[q.lv]?.includes(q.i);
                      return (
                        <div key={ri} style={{
                          padding: "9px 12px", borderRadius: 10,
                          background: isHidden ? "rgba(231,76,60,0.05)" : isUsed ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.035)",
                          border: `1px solid ${isHidden ? "rgba(231,76,60,0.2)" : isUsed ? "rgba(255,255,255,0.04)" : lc.color + "20"}`,
                          opacity: isUsed || isHidden ? 0.55 : 1,
                        }}>
                          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                            <span style={{ padding: "1px 7px", borderRadius: 5, fontSize: 9, fontWeight: 700, background: `${lc.color}20`, color: lc.color, flexShrink: 0, marginTop: 1 }}>{lc.emoji} {lc.label.toUpperCase()}</span>
                            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 9, flexShrink: 0, marginTop: 2 }}>{q.cat}</span>
                            {isUsed  && <span style={{ color: "rgba(255,255,255,0.2)",  fontSize: 8, flexShrink: 0, marginTop: 2 }}>✓ posée</span>}
                            {isHidden && <span style={{ color: "#E74C3C",               fontSize: 8, flexShrink: 0, marginTop: 2 }}>🚫 cachée</span>}
                            {q.custom && <span style={{ color: "#F1C40F",              fontSize: 8, flexShrink: 0, marginTop: 2 }}>✏️ custom</span>}
                            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, flex: 1, lineHeight: 1.4 }}>{q.q}</span>
                            <span style={{ color: "#2ECC71", fontWeight: 700, fontSize: 12, flexShrink: 0, marginTop: 1 }}>{q.r}</span>
                            {/* Supprimer / cacher */}
                            {q.custom
                              ? <button onClick={() => setExtraQ(prev => ({ ...prev, [q.lv]: prev[q.lv].filter((_, jj) => jj !== q.j) }))}
                                  style={{ background: "none", border: "none", color: "#E74C3C", cursor: "pointer", fontSize: 15, padding: "0 2px", flexShrink: 0 }}>×</button>
                              : isHidden
                                ? <button onClick={() => setHiddenQ(prev => ({ ...prev, [q.lv]: prev[q.lv].filter(i => i !== q.i) }))}
                                    style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 9, padding: "1px 6px", borderRadius: 5, flexShrink: 0, fontFamily: "inherit" }}>Afficher</button>
                                : <button onClick={() => setHiddenQ(prev => ({ ...prev, [q.lv]: [...(prev[q.lv] || []), q.i] }))}
                                    style={{ background: "none", border: "none", color: "rgba(231,76,60,0.5)", cursor: "pointer", fontSize: 15, padding: "0 2px", flexShrink: 0 }}>×</button>
                            }
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Formulaire ajout */}
                  {(() => {
                    const lvAdd = qMJFilter.level !== "all" ? qMJFilter.level : "college";
                    return <AddQuestionForm onAdd={item => setExtraQ(prev => ({ ...prev, [lvAdd]: [...(prev[lvAdd] || []), item] }))} />;
                  })()}
                </div>
              );
            })() : (
              <div>
                {/* Level buttons */}
                <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 18 }}>
                  {Object.entries(LC).map(([k, c]) => (
                    <button key={k} onClick={() => drawQ(k)} style={{
                      background: `${c.color}18`, border: `2px solid ${c.color}42`,
                      color: c.color, padding: "12px 24px", borderRadius: 14,
                      fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                    }}>
                      {c.emoji} {c.label} · {c.coins}
                      <br />
                      <span style={{ fontSize: 10, opacity: 0.65, fontWeight: 400 }}>
                        {rem(k)}/{Q[k].length} restantes
                      </span>
                    </button>
                  ))}
                </div>

                {/* Question card */}
                {curQ ? (
                  <div style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `2px solid ${LC[curQ.level].color}32`,
                    borderRadius: 20, padding: "24px 28px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 8 }}>
                      <span style={{
                        padding: "4px 14px", borderRadius: 8,
                        background: `${LC[curQ.level].color}22`, color: LC[curQ.level].color,
                        fontSize: 12, fontWeight: 700, letterSpacing: 1,
                      }}>
                        {LC[curQ.level].emoji} {LC[curQ.level].label.toUpperCase()} · {LC[curQ.level].coins}
                      </span>
                      <span style={{
                        padding: "4px 12px", borderRadius: 8,
                        background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)",
                        fontSize: 11, fontWeight: 600,
                      }}>
                        {curQ.cat}
                      </span>
                    </div>

                    <div style={{
                      fontSize: "clamp(18px,3.5vw,28px)", fontWeight: 600,
                      color: "#fff", marginBottom: 26, lineHeight: 1.45, textAlign: "center",
                    }}>
                      {curQ.q}
                    </div>

                    {showA ? (
                      <div>
                        {/* Answer */}
                        <div style={{
                          padding: "16px 24px", borderRadius: 14, marginBottom: 16,
                          background: "rgba(46,204,113,0.12)", border: "1px solid rgba(46,204,113,0.3)",
                          textAlign: "center",
                        }}>
                          <span style={{ fontSize: "clamp(20px,4vw,32px)", fontWeight: 800, color: "#2ECC71" }}>
                            {curQ.r}
                          </span>
                        </div>

                        {/* Attribution */}
                        <div style={{ marginBottom: 10 }}>
                          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginBottom: 8, textAlign: "center" }}>
                            ATTRIBUER LES PIÈCES
                          </div>
                          <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
                            {teams.map((t, i) => (
                              <button key={i} onClick={() => { upT(i,"coins",LC[curQ.level].val); upT(i,"qOk",1); }} style={{
                                background: `${TC[i]}22`, border: `1px solid ${TC[i]}45`,
                                color: TC[i], padding: "8px 16px", borderRadius: 10,
                                fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                              }}>
                                {TE[i]} {t.name}<br/>
                                <span style={{ fontSize: 10, opacity: 0.8 }}>{LC[curQ.level].coins}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Expert penalty */}
                        {curQ.level === "expert" && (
                          <div>
                            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginBottom: 8, textAlign: "center" }}>
                              PÉNALITÉ MAUVAISE RÉPONSE
                            </div>
                            <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
                              {teams.map((t, i) => (
                                <button key={i} onClick={() => upT(i,"coins",-2)} style={{
                                  background: "rgba(231,76,60,0.14)", border: "1px solid rgba(231,76,60,0.3)",
                                  color: "#E74C3C", padding: "6px 12px", borderRadius: 10,
                                  fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                                }}>
                                  −2₽ {t.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        <button onClick={() => setShowA(true)} style={{
                          background: "rgba(241,196,15,0.14)", border: "2px solid rgba(241,196,15,0.3)",
                          color: "#F1C40F", padding: "14px 42px", borderRadius: 14,
                          fontSize: 18, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                        }}>
                          Révéler la réponse
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: 48, color: "rgba(255,255,255,0.28)", fontSize: 14 }}>
                    Choisis un niveau ci-dessus pour tirer une question
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ════════════ CARTE ══════════════════════════════ */}
        {tab === "carte" && (
          <BoardMap
            side={mapSide} setSide={setMapSide}
            mgCount={mgCount} setMgCount={setMgCount}
            starIdx={starIdx} setStarIdx={setStarIdx}
          />
        )}

        {/* ════════════ PLATEAU ════════════════════════════ */}
        {tab === "plateau" && (
          <PawnMap
            teams={teams} setTeams={setTeams}
            turn={turn} setTurn={setTurn}
            side={mapSide} starIdx={starIdx} setStarIdx={setStarIdx}
            tourNum={tourNum} setTourNum={setTourNum}
            maxTours={maxTours}
            onDuel={(onDone) => { duelNextTurnRef.current = onDone; setShowDuel(true); }}
            onFinale={() => setShowFinale(true)}
            bridgeTaxTurns={bridgeTaxTurns} setBridgeTaxTurns={setBridgeTaxTurns}
            pendingPoisons={pendingPoisons} setPendingPoisons={setPendingPoisons}
            getChaosCard={getChaosCard}
            onApplyChaos={(name, t1, t2) => applyChaos(name, t1, t2)}
          />
        )}

        {/* ════════════ MINI-JEUX ══════════════════════════ */}
        {tab === "minigames" && (
          <div>
            {/* Format filter */}
            <div style={{
              display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14,
              padding: "10px 14px", borderRadius: 14,
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
            }}>
              <button
                onClick={() => setMgFilter("all")}
                style={{
                  padding: "5px 12px", borderRadius: 8, fontFamily: "inherit",
                  fontSize: 11, fontWeight: 700, cursor: "pointer",
                  background: mgFilter === "all" ? "rgba(255,255,255,0.12)" : "none",
                  border: `1px solid ${mgFilter === "all" ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"}`,
                  color: mgFilter === "all" ? "#fff" : "rgba(255,255,255,0.4)",
                }}
              >
                ⚪ Tous ({MG.length})
              </button>
              {Object.entries(FORMAT).map(([k, f]) => {
                const count = MG.filter(g => g.format === k).length;
                const active = mgFilter === k;
                return (
                  <button key={k} onClick={() => setMgFilter(k)} style={{
                    padding: "5px 12px", borderRadius: 8, fontFamily: "inherit",
                    fontSize: 11, fontWeight: 700, cursor: "pointer",
                    background: active ? `${f.color}20` : "none",
                    border: `1px solid ${active ? f.color + "45" : "rgba(255,255,255,0.08)"}`,
                    color: active ? f.color : "rgba(255,255,255,0.4)",
                  }}>
                    {f.emoji} {f.short} ({count})
                  </button>
                );
              })}
            </div>

            {/* Random picker */}
            <div style={{
              textAlign: "center", marginBottom: 14,
              padding: "14px 18px", borderRadius: 14,
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <button onClick={pickMG} style={{
                background: "rgba(241,196,15,0.15)", border: "2px solid rgba(241,196,15,0.35)",
                color: "#F1C40F", padding: "10px 28px", borderRadius: 12,
                fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              }}>
                🎲 Mini-jeu aléatoire
              </button>
              {randMG && (
                <div style={{ marginTop: 10 }}>
                  <MiniGameCard game={randMG} defaultOpen={true} teams={teams} setTeams={setTeams} />
                </div>
              )}
            </div>

            {/* Games list */}
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>
              {filteredGames.length} JEU{filteredGames.length > 1 ? "X" : ""}
              {mgFilter !== "all" && <span> · {FORMAT[mgFilter]?.label}</span>}
            </div>

            {filteredGames.map(game => (
              <MiniGameCard key={game.id} game={game} teams={teams} setTeams={setTeams} />
            ))}
          </div>
        )}

        {/* ════════════ CHAOS ══════════════════════════════ */}
        {tab === "chaos" && (
          <div>
            {/* Active effects banner */}
            {bridgeTaxTurns > 0 && (
              <div style={{
                padding: "8px 14px", borderRadius: 10, marginBottom: 14,
                background: "rgba(255,140,0,0.12)", border: "1px solid rgba(255,140,0,0.4)",
                color: "#FFA040", fontSize: 12, fontWeight: 700,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                🚧 Péage actif — ponts coûtent 4₽
                <span style={{ marginLeft: "auto", opacity: 0.7 }}>encore {bridgeTaxTurns} tour{bridgeTaxTurns > 1 ? "s" : ""}</span>
                <button onClick={() => setBridgeTaxTurns(0)} style={{
                  background: "rgba(255,100,0,0.2)", border: "1px solid rgba(255,100,0,0.4)",
                  color: "#FF6B35", borderRadius: 6, padding: "2px 8px", fontSize: 11,
                  cursor: "pointer", fontFamily: "inherit", fontWeight: 700,
                }}>✕ Annuler</button>
              </div>
            )}
            {/* Draw section */}
            <div style={{
              textAlign: "center", marginBottom: 20, padding: "20px",
              background: "rgba(142,68,173,0.06)", border: "1px solid rgba(142,68,173,0.18)",
              borderRadius: 18,
            }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginBottom: 12 }}>
                {CC_DECK.length - usedCC.length}/{CC_DECK.length} cartes restantes dans le paquet
              </div>
              {/* Progress dots — one per deck slot */}
              <div style={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
                {CC_DECK.map((cardIdx, pos) => (
                  <div key={pos} style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: usedCC.includes(pos) ? "rgba(255,255,255,0.1)" : CC[cardIdx].count >= 3 ? "#8E44AD" : CC[cardIdx].count === 2 ? "#6C3483" : "#4A235A",
                    transition: "background 0.3s",
                    title: CC[cardIdx].n,
                  }} />
                ))}
              </div>
              <button onClick={drawCC} style={{
                background: "rgba(142,68,173,0.2)", border: "2px solid rgba(142,68,173,0.5)",
                color: "#D4A0F5", padding: "12px 32px", borderRadius: 14,
                fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              }}>
                🌀 Tirer une carte Chaos
              </button>
              {usedCC.length >= CC_DECK.length && (
                <div style={{ marginTop: 10, color: "rgba(142,68,173,0.7)", fontSize: 12 }}>
                  Paquet épuisé — prochain tirage repart du début.
                </div>
              )}

              {/* Current card + apply buttons */}
              {curCC && (
                <div style={{
                  marginTop: 18, padding: "18px 22px", borderRadius: 16, textAlign: "left",
                  background: "rgba(142,68,173,0.14)", border: "2px solid rgba(142,68,173,0.4)",
                }}>
                  <div style={{ textAlign: "center", fontSize: 40, marginBottom: 8 }}>{curCC.e}</div>
                  <div style={{ textAlign: "center", color: "#D4A0F5", fontWeight: 800, fontSize: 18, marginBottom: 10 }}>{curCC.n}</div>
                  <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.6, margin: "0 0 10px" }}>{curCC.d}</p>
                  {curCC.tip && (
                    <div style={{ padding: "6px 12px", borderRadius: 8, marginBottom: 14,
                      background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)",
                      fontSize: 11, fontStyle: "italic" }}>
                      💡 {curCC.tip}
                    </div>
                  )}
                  {/* Auto-apply for simple cards */}
                  {["Tempête","Aubaine","Bénédiction","Peur du vide","Arc-en-ciel","Péage","Taxe","Balance","Coup d'état","Héritage","Jackpot"].includes(curCC.n) && (
                    <button onClick={() => applyChaos(curCC.n)} style={{
                      width: "100%", padding: "10px", borderRadius: 10, fontSize: 13, fontWeight: 700,
                      cursor: "pointer", fontFamily: "inherit",
                      background: "rgba(142,68,173,0.25)", border: "1px solid rgba(142,68,173,0.5)", color: "#D4A0F5",
                    }}>⚡ Appliquer l&apos;effet</button>
                  )}
                  {/* Retournement */}
                  {curCC.n === "Retournement" && (
                    <button onClick={() => applyChaos("Retournement")} style={{
                      width: "100%", padding: "10px", borderRadius: 10, fontSize: 13, fontWeight: 700,
                      cursor: "pointer", fontFamily: "inherit",
                      background: "rgba(142,68,173,0.25)", border: "1px solid rgba(142,68,173,0.5)", color: "#D4A0F5",
                    }}>🔄 Retourner le plateau ({mapSide === 0 ? "RECTO→VERSO" : "VERSO→RECTO"})</button>
                  )}
                  {/* Target-selection cards */}
                  {["Vol de pièces","Don empoisonné","Malédiction","Échange de positions"].includes(curCC.n) && (
                    <div>
                      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginBottom: 8 }}>Choisir la cible :</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {teams.map((t, i) => i !== turn && (
                          <button key={i} onClick={() => applyChaos(curCC.n, i)} style={{
                            background: `${TC[i]}20`, border: `1px solid ${TC[i]}50`,
                            color: TC[i], padding: "8px 14px", borderRadius: 9, fontSize: 12,
                            fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                          }}>{TE[i]} {t.name}</button>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Vol d'étoile — only show opponents who have stars */}
                  {curCC.n === "Vol d'étoile" && (
                    <div>
                      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginBottom: 8 }}>
                        Voler 1 étoile à :
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {teams.map((t, i) => i !== turn && (
                          <button key={i}
                            disabled={t.stars === 0}
                            onClick={() => applyChaos("Vol d'étoile", i)} style={{
                            background: t.stars > 0 ? `${TC[i]}20` : "rgba(80,80,80,0.1)",
                            border: `1px solid ${t.stars > 0 ? TC[i]+"50" : "rgba(80,80,80,0.2)"}`,
                            color: t.stars > 0 ? TC[i] : "#555",
                            padding: "8px 14px", borderRadius: 9, fontSize: 12,
                            fontWeight: 700, cursor: t.stars > 0 ? "pointer" : "not-allowed",
                            fontFamily: "inherit",
                          }}>
                            {TE[i]} {t.name} <span style={{ opacity: 0.7 }}>⭐{t.stars}</span>
                          </button>
                        ))}
                      </div>
                      {teams.every((t, i) => i === turn || t.stars === 0) && (
                        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 6, fontStyle: "italic" }}>
                          Aucune équipe adverse n'a d'étoile — carte sans effet.
                        </div>
                      )}
                    </div>
                  )}
                  {/* Aimant — pick 2 targets via AimantPicker */}
                  {curCC.n === "Aimant" && (
                    <AimantPicker teams={teams} onApply={(a, b) => applyChaos("Aimant", a, b)} />
                  )}
                  {/* Question bonus — inline Expert question */}
                  {curCC.n === "Question bonus" && (() => {
                    const pool = window._Q?.expert ?? [];
                    return <ChaosBonusQ pool={pool} teams={teams} turn={turn} upT={upT} />;
                  })()}
                </div>
              )}
            </div>

            {/* All chaos cards list with count badges */}
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>
              {CC.length} CARTES CHAOS · {CC_DECK.length} DANS LE PAQUET
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 8 }}>
              {CC.map((card, i) => {
                const usedCount = CC_DECK.reduce((n, ci, pos) => ci === i && usedCC.includes(pos) ? n+1 : n, 0);
                const totalCount = card.count || 1;
                const allUsed = usedCount >= totalCount;
                return (
                  <div key={i} style={{
                    padding: "10px 14px", borderRadius: 12,
                    background: allUsed ? "rgba(255,255,255,0.015)" : "rgba(142,68,173,0.07)",
                    border: `1px solid ${allUsed ? "rgba(255,255,255,0.04)" : "rgba(142,68,173,0.2)"}`,
                    opacity: allUsed ? 0.5 : 1,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                      <span style={{ fontSize: 18 }}>{card.e}</span>
                      <span style={{ color: allUsed ? "rgba(255,255,255,0.4)" : "#D4A0F5", fontWeight: 700, fontSize: 13, flex: 1 }}>{card.n}</span>
                      <span style={{ padding: "1px 6px", borderRadius: 6, fontSize: 9, fontWeight: 700,
                        background: "rgba(142,68,173,0.3)", color: "#D4A0F5" }}>×{totalCount}</span>
                      {allUsed && <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 9 }}>✓</span>}
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, lineHeight: 1.5, margin: 0 }}>{card.d}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ════════════ RÈGLES ═════════════════════════════ */}
        {tab === "rules" && (
          <div style={{ fontSize: 13, lineHeight: 1.75 }}>
            {[
              {
                t: "🎲 Déroulement d'un tour",
                c: "1. Lancer le dé → avancer d'autant de cases. 2. Utiliser un pont (−3₽) ou un téléporteur (−5₽) si disponible et voulu. 3. Acheter l'étoile (−10₽) si l'équipe atterrit sur ou passe sur elle. 4. Résoudre l'effet de la case. 5. Jouer le mini-jeu du tour. 6. Tous les 3 mini-jeux : lancer le dé de retournement (1-3 = Recto, 4-6 = Verso).",
              },
              {
                t: "⭐ Système d'étoiles",
                c: "1 seule étoile active sur le plateau à la fois. Coût : 10₽. Après achat, elle se déplace aléatoirement sur un nouveau segment. L'équipe avec le plus d'étoiles en fin de partie gagne.",
              },
              {
                t: "🔄 Recto / Verso",
                c: "Chaque case a 2 faces (A/B) avec des effets différents. Tous les 3 mini-jeux, lancez le dé : 1-3 = Recto, 4-6 = Verso. Si changement → retournez TOUTES les cases + inversez le sens de tous les raccourcis.",
              },
              {
                t: "🛤️ Raccourcis (chemin intérieur)",
                c: "Chemins plus courts à l'intérieur de chaque île, en sens unique. En Recto : A→B. En Verso : B→A (direction inversée). Les ponts (3₽) et téléporteurs (5₽) restent identiques des deux côtés.",
              },
              {
                t: "🎯 Victoire",
                c: "Après 8-10 tours : on distribue les Awards (+1⭐ chacun : Le Savant, Le Bagarreur, L'Explorateur). L'équipe avec le plus d'étoiles gagne. Égalité → plus de pièces. Toujours égalité → duel Expert.",
              },
              {
                t: "🥊 Duel de l'Espoir (tour 7+)",
                c: "Disponible dès le tour 7. La DERNIÈRE équipe peut défier la PREMIÈRE sur une question Expert. Si elle répond juste, elle vole 1 étoile à l'équipe de tête. Aucune pénalité si elle perd.",
              },
            ].map((r, i) => (
              <div key={i} style={{
                marginBottom: 10, padding: "14px 18px", borderRadius: 12,
                background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)",
              }}>
                <h3 style={{ color: "#F1C40F", fontSize: 15, fontWeight: 700, margin: "0 0 6px" }}>{r.t}</h3>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.65)" }}>{r.c}</p>
              </div>
            ))}

            {/* Shop */}
            <div style={{
              marginTop: 16, padding: "14px 18px", borderRadius: 14,
              background: "rgba(39,174,96,0.06)", border: "1px solid rgba(39,174,96,0.18)",
            }}>
              <h3 style={{ color: "#27AE60", fontSize: 15, fontWeight: 700, margin: "0 0 12px" }}>🛒 Boutique</h3>
              {SI.map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: 10, alignItems: "flex-start",
                  padding: "8px 0", borderBottom: i < SI.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{item.e}</span>
                  <div style={{ flex: 1 }}>
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>{item.n}</span>
                    <span style={{
                      marginLeft: 8, padding: "1px 7px", borderRadius: 6,
                      background: "rgba(39,174,96,0.2)", color: "#27AE60", fontSize: 10, fontWeight: 700,
                    }}>
                      {item.c}₽
                    </span>
                    <p style={{ margin: "3px 0 0", color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 1.5 }}>{item.d}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Awards */}
            <div style={{
              marginTop: 12, padding: "14px 18px", borderRadius: 14,
              background: "rgba(241,196,15,0.05)", border: "1px solid rgba(241,196,15,0.15)",
            }}>
              <h3 style={{ color: "#F1C40F", fontSize: 15, fontWeight: 700, margin: "0 0 12px" }}>🏅 Awards (+1⭐ chacun)</h3>
              {AW.map((a, i) => (
                <div key={i} style={{
                  display: "flex", gap: 10, alignItems: "flex-start",
                  padding: "8px 0", borderBottom: i < AW.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{a.e}</span>
                  <div>
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>{a.n}</span>
                    <p style={{ margin: "3px 0 0", color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 1.5 }}>{a.d}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Coin reference */}
            <div style={{
              marginTop: 12, padding: "14px 18px", borderRadius: 14,
              background: "rgba(212,160,23,0.05)", border: "1px solid rgba(212,160,23,0.15)",
            }}>
              <h3 style={{ color: "#D4A017", fontSize: 15, fontWeight: 700, margin: "0 0 12px" }}>🪙 Référence rapide — Pièces</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 6 }}>
                {[
                  ["🟢 Question Collège", "+3₽"], ["🟡 Question Lycée", "+3₽"],
                  ["🔴 Question Expert (juste)", "+5₽"], ["🔴 Question Expert (faux)", "−2₽"],
                  ["🪙 Case +2₽", "+2₽"], ["💀 Case −3₽", "−3₽"],
                  ["💎 Bonus case", "+5₽"], ["🌉 Pont", "−3₽"],
                  ["⚡ Téléporteur", "−5₽"], ["⭐ Achat d'étoile", "−10₽"],
                  ["🫳 Case Vol", "−3₽ (victime)"], ["🎰 Case Dé ×2", "Relance le dé"],
                ].map(([l, v], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 8px", borderRadius: 8, background: "rgba(255,255,255,0.02)" }}>
                    <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}>{l}</span>
                    <span style={{ color: "#D4A017", fontWeight: 700, fontSize: 12 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── Finale overlay ───────────────────────────── */}
      {showFinale && (
        <FinaleScreen
          teams={teams}
          awardLeaders={awardLeaders}
          onApplyAward={applyAward}
          onClose={() => setShowFinale(false)}
        />
      )}

      {/* ── Duel overlay ─────────────────────────────── */}
      {showDuel && (
        <DuelModal
          teams={teams} turn={turn} setTeams={setTeams}
          onClose={() => { setShowDuel(false); duelNextTurnRef.current?.(); duelNextTurnRef.current = null; }}
        />
      )}
    </div>
  );
}
