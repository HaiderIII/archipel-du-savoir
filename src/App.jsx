import { useState, useEffect, useCallback } from "react";
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
    { id: "1b", x: 160, y: 56,  r: "coins_minus", v: "bonus"     },
    { id: "1c", x: 228, y: 46,  r: "question",   v: "steal"     },
    { id: "1d", x: 298, y: 66,  r: "duel",        v: "question"  },
    { id: "1e", x: 328, y: 128, r: "question",   v: "chaos"     },
    { id: "1f", x: 292, y: 195, r: "chaos",       v: "coins_plus"},
    { id: "1g", x: 220, y: 222, r: "coins_plus",  v: "coins_minus"},
    { id: "1h", x: 142, y: 208, r: "question",   v: "double"    },
    { id: "1i", x: 85,  y: 152, r: "teleport",   v: "teleport"  },
    { id: "1x", x: 205, y: 118, r: "question",   v: "shield"    },
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
    { id: "2a", x: 568, y: 70,  r: "question",   v: "steal"     },
    { id: "2b", x: 646, y: 106, r: "duel",        v: "question"  },
    { id: "2c", x: 688, y: 172, r: "question",   v: "coins_minus"},
    { id: "2d", x: 646, y: 240, r: "coins_minus", v: "bonus"     },
    { id: "2e", x: 568, y: 270, r: "question",   v: "duel"      },
    { id: "2f", x: 490, y: 240, r: "chaos",       v: "shield"    },
    { id: "2g", x: 452, y: 172, r: "question",   v: "double"    },
    { id: "2h", x: 490, y: 106, r: "teleport",   v: "teleport"  },
    { id: "2x", x: 530, y: 145, r: "shop",        v: "duel"      },
    { id: "2y", x: 608, y: 145, r: "question",   v: "chaos"     },
    { id: "2z", x: 608, y: 205, r: "coins_plus",  v: "coins_minus"},
    { id: "2w", x: 530, y: 205, r: "duel",        v: "question"  },
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
    { id: "3a", x: 256, y: 373, r: "duel",        v: "question"  },
    { id: "3b", x: 348, y: 346, r: "question",   v: "steal"     },
    { id: "3c", x: 440, y: 373, r: "question",   v: "shield"    },
    { id: "3d", x: 480, y: 438, r: "chaos",       v: "coins_plus"},
    { id: "3e", x: 440, y: 500, r: "coins_minus", v: "double"    },
    { id: "3f", x: 348, y: 520, r: "teleport",   v: "teleport"  },
    { id: "3g", x: 256, y: 500, r: "question",   v: "duel"      },
    { id: "3h", x: 216, y: 438, r: "shop",        v: "chaos"     },
    { id: "3x", x: 310, y: 408, r: "question",   v: "coins_minus"},
    { id: "3y", x: 392, y: 408, r: "coins_plus",  v: "duel"      },
    { id: "3z", x: 348, y: 465, r: "duel",        v: "bonus"     },
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
  bridges.forEach((b, i) => s.push({ f: b.f, t: b.t, sid: `br-${i}` }));
  return s;
}
const AS = segs();

// ═══════════════════════════════════════════════════════
// CHAOS DECK  (multiple copies per card based on count)
// ═══════════════════════════════════════════════════════
const CC_DECK = CC.flatMap((card, i) => Array(card.count || 1).fill(i));

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
  { name: "Équipe 1", coins: 0, stars: 0, shields: 0, qOk: 0, mgWon: 0, pos: "1a", visitedCases: ["1a"] },
  { name: "Équipe 2", coins: 0, stars: 0, shields: 0, qOk: 0, mgWon: 0, pos: "1a", visitedCases: ["1a"] },
  { name: "Équipe 3", coins: 0, stars: 0, shields: 0, qOk: 0, mgWon: 0, pos: "1a", visitedCases: ["1a"] },
  { name: "Équipe 4", coins: 0, stars: 0, shields: 0, qOk: 0, mgWon: 0, pos: "1a", visitedCases: ["1a"] },
];
const INIT_USED = { college: [], lycee: [], expert: [] };
const MAX_TOURS = 10;
const STAR_COST = 10;
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
function ContentRenderer({ content, gameId }) {
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
// ═══════════════════════════════════════════════════════
function PawnShape({ cx, cy, color, active }) {
  return (
    <g style={{ pointerEvents: "none" }}>
      {active && <circle cx={cx} cy={cy-2} r={22} fill={color} opacity={0.15} />}
      {/* Drop shadow */}
      <ellipse cx={cx+1.5} cy={cy+17} rx={11} ry={4} fill="rgba(0,0,0,0.4)" />
      {/* Base platform */}
      <rect x={cx-10} y={cy+10} width={20} height={7} rx={4}
        fill={color}
        stroke={active ? "#fff" : "rgba(0,0,0,0.3)"} strokeWidth={active ? 2 : 1} />
      {/* Stem */}
      <path d={`M ${cx-4} ${cy+10} L ${cx-3} ${cy} L ${cx+3} ${cy} L ${cx+4} ${cy+10} Z`}
        fill={color}
        stroke={active ? "#fff" : "rgba(0,0,0,0.3)"} strokeWidth={active ? 2 : 1} />
      {/* Head */}
      <circle cx={cx} cy={cy-9} r={9}
        fill={color}
        stroke={active ? "#fff" : "rgba(0,0,0,0.28)"} strokeWidth={active ? 2.5 : 1} />
      {/* Shine */}
      <circle cx={cx-3} cy={cy-13} r={3} fill="rgba(255,255,255,0.5)" />
    </g>
  );
}

// ═══════════════════════════════════════════════════════
// MINI-GAME RANKING — distributes rewards after a game
// ═══════════════════════════════════════════════════════
function MiniGameRanking({ teams, setTeams }) {
  const [ranking, setRanking] = useState([null, null, null, null]);
  const [done, setDone] = useState(false);

  const assign = (teamIdx, rankPos) => {
    if (done) return;
    setRanking(prev => {
      const next = [...prev];
      const old = next.indexOf(teamIdx);
      if (old !== -1) next[old] = null;
      next[rankPos] = teamIdx;
      return next;
    });
  };

  const distribute = () => {
    setTeams(prev => prev.map((t, i) => {
      const pos = ranking.indexOf(i);
      if (pos === -1) return t;
      return {
        ...t,
        coins: t.coins + RANK_COINS[pos],
        mgWon: pos === 0 ? t.mgWon + 1 : t.mgWon,
      };
    }));
    setDone(true);
  };

  const rankColors = ["#F1C40F", "#BDC3C7", "#CD7F32", "rgba(255,255,255,0.25)"];
  const rankLabels = ["🥇 1er", "🥈 2e", "🥉 3e", "4️⃣ 4e"];

  return (
    <div style={{ marginTop: 14, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 12 }}>
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>
        🏆 RÉSULTATS DU MINI-JEU
      </div>
      {[0, 1, 2, 3].map(pos => (
        <div key={pos} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ color: rankColors[pos], fontSize: 12, fontWeight: 700, minWidth: 36 }}>{rankLabels[pos]}</span>
          <span style={{ color: "#D4A017", fontSize: 11, minWidth: 30 }}>
            {RANK_COINS[pos] > 0 ? `+${RANK_COINS[pos]}₽` : "—"}
          </span>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {teams.map((t, i) => {
              const isHere = ranking[pos] === i;
              const placed = ranking.indexOf(i) !== -1 && !isHere;
              return (
                <button key={i} onClick={() => assign(i, pos)} style={{
                  padding: "3px 9px", borderRadius: 7, fontSize: 11, fontWeight: 700,
                  cursor: done ? "default" : "pointer", fontFamily: "inherit",
                  background: isHere ? `${TC[i]}30` : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isHere ? TC[i]+"70" : "rgba(255,255,255,0.08)"}`,
                  color: isHere ? TC[i] : "rgba(255,255,255,0.35)",
                  opacity: placed ? 0.3 : 1,
                }}>
                  {TE[i]} {t.name}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {done ? (
        <div style={{ color: "#2ECC71", fontSize: 12, fontWeight: 700, textAlign: "center", marginTop: 8 }}>
          ✓ Récompenses distribuées !
        </div>
      ) : (
        <button disabled={ranking.some(r => r === null)} onClick={distribute} style={{
          marginTop: 8, width: "100%", padding: "8px", borderRadius: 10, fontSize: 12, fontWeight: 700,
          cursor: ranking.some(r => r === null) ? "not-allowed" : "pointer", fontFamily: "inherit",
          background: ranking.some(r => r === null) ? "rgba(80,80,80,0.1)" : "rgba(212,160,23,0.15)",
          border: `1px solid ${ranking.some(r => r === null) ? "rgba(80,80,80,0.2)" : "rgba(212,160,23,0.4)"}`,
          color: ranking.some(r => r === null) ? "#555" : "#D4A017",
        }}>
          💰 Distribuer les récompenses
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// DUEL MODAL — Les 12 coups de midi style
// ═══════════════════════════════════════════════════════
function DuelModal({ teams, turn, setTeams, onClose }) {
  const [challenger, setChallenger] = useState(null);
  const [phase, setPhase] = useState("setup"); // setup|p1|p1done|p2|p2done|result
  const [timeLeft, setTimeLeft] = useState(60);
  const [running, setRunning] = useState(false);
  const [times, setTimes] = useState([null, null]);
  const [question, setQuestion] = useState(null);
  const [showAns, setShowAns] = useState(false);

  useEffect(() => {
    if (!running || timeLeft <= 0) return;
    const iv = setTimeout(() => {
      if (timeLeft <= 1) {
        setRunning(false);
        setTimes(prev => phase === "p1" ? [60, prev[1]] : [prev[0], 60]);
        setPhase(p => p === "p1" ? "p1done" : "p2done");
      } else {
        setTimeLeft(t => t - 1);
      }
    }, 1000);
    return () => clearTimeout(iv);
  }, [running, timeLeft, phase]);

  const start = () => { setTimeLeft(60); setRunning(true); };

  const correct = () => {
    const elapsed = 60 - timeLeft;
    setRunning(false);
    setTimes(prev => phase === "p1" ? [elapsed, prev[1]] : [prev[0], elapsed]);
    setPhase(p => p === "p1" ? "p1done" : "p2done");
  };
  const miss = () => {
    setRunning(false);
    setTimes(prev => phase === "p1" ? [60, prev[1]] : [prev[0], 60]);
    setPhase(p => p === "p1" ? "p1done" : "p2done");
  };

  const applyAndClose = () => {
    const [t1, t2] = times;
    const t1ok = t1 !== null && t1 < 60;
    const t2ok = t2 !== null && t2 < 60;
    let winnerIdx = null;
    if (t1ok && !t2ok) winnerIdx = turn;
    else if (!t1ok && t2ok) winnerIdx = challenger;
    else if (t1ok && t2ok) winnerIdx = t1 <= t2 ? turn : challenger;
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

  const timerColor = timeLeft <= 10 ? "#E74C3C" : timeLeft <= 30 ? "#F1C40F" : "#2ECC71";
  const curIdx = phase.startsWith("p2") ? challenger : turn;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.93)", zIndex: 999,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#0c1525", border: "2px solid rgba(231,76,60,0.45)", borderRadius: 20,
        padding: 28, maxWidth: 480, width: "100%", maxHeight: "92vh", overflowY: "auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <div style={{ color: "#E74C3C", fontWeight: 800, fontSize: 22, letterSpacing: 1 }}>⚔️ DUEL</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)",
            fontSize: 20, cursor: "pointer", fontFamily: "inherit" }}>✕</button>
        </div>

        {/* SETUP */}
        {phase === "setup" && (
          <div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, marginBottom: 14 }}>
              {TE[turn]} <strong style={{ color: TC[turn] }}>{teams[turn].name}</strong> défie…
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
              {teams.map((t, i) => i !== turn && (
                <button key={i} onClick={() => setChallenger(i)} style={{
                  background: challenger === i ? `${TC[i]}28` : "rgba(255,255,255,0.04)",
                  border: `2px solid ${challenger === i ? TC[i] : "rgba(255,255,255,0.09)"}`,
                  color: challenger === i ? TC[i] : "rgba(255,255,255,0.55)",
                  padding: "10px 18px", borderRadius: 12, fontSize: 13, fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit",
                }}>
                  {TE[i]} {t.name}
                </button>
              ))}
            </div>
            {question && (
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, marginBottom: 6 }}>QUESTION</div>
                <div style={{ color: "#fff", fontSize: 14, fontWeight: 600, lineHeight: 1.55 }}>{question.q}</div>
                {showAns
                  ? <div style={{ marginTop: 8, color: "#2ECC71", fontWeight: 700, fontSize: 14 }}>→ {question.r}</div>
                  : <button onClick={() => setShowAns(true)} style={{
                      marginTop: 8, background: "none", border: "1px solid rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.4)", borderRadius: 6, padding: "2px 8px",
                      fontSize: 10, cursor: "pointer", fontFamily: "inherit",
                    }}>Réponse</button>
                }
              </div>
            )}
            <button onClick={() => window._Q && setQuestion(
              [...window._Q.college, ...window._Q.lycee][Math.floor(Math.random() * (window._Q.college.length + window._Q.lycee.length))]
            )} style={{
              background: "rgba(241,196,15,0.12)", border: "1px solid rgba(241,196,15,0.28)",
              color: "#F1C40F", padding: "8px 18px", borderRadius: 10, fontSize: 12, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit", marginBottom: 14, display: "block",
            }}>🎲 Tirer une question</button>
            <button disabled={challenger === null || !question} onClick={() => { setPhase("p1"); start(); }}
              style={{
                width: "100%", padding: "12px", borderRadius: 12, fontSize: 14, fontWeight: 700,
                cursor: challenger !== null && question ? "pointer" : "not-allowed", fontFamily: "inherit",
                background: challenger !== null && question ? "rgba(231,76,60,0.18)" : "rgba(60,60,60,0.1)",
                border: `1px solid ${challenger !== null && question ? "rgba(231,76,60,0.4)" : "rgba(80,80,80,0.2)"}`,
                color: challenger !== null && question ? "#E74C3C" : "#555",
              }}>
              Lancer le Duel →
            </button>
          </div>
        )}

        {/* PLAYER ROUND */}
        {(phase === "p1" || phase === "p1done" || phase === "p2" || phase === "p2done") && curIdx !== null && (
          <div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>
              {phase.startsWith("p1") ? "MANCHE 1" : "MANCHE 2"}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <span style={{ fontSize: 22 }}>{TE[curIdx]}</span>
              <span style={{ color: TC[curIdx], fontWeight: 800, fontSize: 18 }}>{teams[curIdx].name}</span>
            </div>
            <div style={{ textAlign: "center", marginBottom: 18 }}>
              <div style={{ fontSize: 80, fontWeight: 900, color: timerColor,
                fontFamily: "system-ui", lineHeight: 1, transition: "color 0.4s" }}>
                {timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>secondes</div>
            </div>
            {question && (
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 16px", marginBottom: 16 }}>
                <div style={{ color: "#fff", fontSize: 14, fontWeight: 600, lineHeight: 1.55 }}>{question.q}</div>
              </div>
            )}
            {(phase === "p1" || phase === "p2") && (
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={correct} style={{
                  flex: 2, background: "rgba(46,204,113,0.18)", border: "1px solid rgba(46,204,113,0.4)",
                  color: "#2ECC71", padding: "12px", borderRadius: 12, fontSize: 13, fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit",
                }}>✓ Bonne réponse ! ({60 - timeLeft}s)</button>
                <button onClick={miss} style={{
                  flex: 1, background: "rgba(231,76,60,0.1)", border: "1px solid rgba(231,76,60,0.3)",
                  color: "#E74C3C", padding: "12px", borderRadius: 12, fontSize: 12, fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit",
                }}>✗ Raté</button>
              </div>
            )}
            {(phase === "p1done" || phase === "p2done") && (
              <div>
                <div style={{ textAlign: "center", marginBottom: 14, fontWeight: 700, fontSize: 16,
                  color: (phase === "p1done" ? times[0] : times[1]) < 60 ? "#2ECC71" : "#E74C3C" }}>
                  {(phase === "p1done" ? times[0] : times[1]) < 60
                    ? `✓ Répondu en ${phase === "p1done" ? times[0] : times[1]}s`
                    : "✗ Temps écoulé"
                  }
                </div>
                {phase === "p1done" ? (
                  <button onClick={() => { setPhase("p2"); start(); }} style={{
                    width: "100%", background: "rgba(52,152,219,0.18)", border: "1px solid rgba(52,152,219,0.4)",
                    color: "#3498DB", padding: "12px", borderRadius: 12, fontSize: 14, fontWeight: 700,
                    cursor: "pointer", fontFamily: "inherit",
                  }}>
                    → Manche 2 : {TE[challenger]} {teams[challenger].name}
                  </button>
                ) : (
                  <button onClick={() => setPhase("result")} style={{
                    width: "100%", background: "rgba(241,196,15,0.14)", border: "1px solid rgba(241,196,15,0.3)",
                    color: "#F1C40F", padding: "12px", borderRadius: 12, fontSize: 14, fontWeight: 700,
                    cursor: "pointer", fontFamily: "inherit",
                  }}>🏆 Résultats</button>
                )}
              </div>
            )}
          </div>
        )}

        {/* RESULT */}
        {phase === "result" && (() => {
          const [t1, t2] = times;
          const t1ok = t1 < 60, t2ok = t2 < 60;
          let winnerIdx = null;
          if (t1ok && !t2ok) winnerIdx = turn;
          else if (!t1ok && t2ok) winnerIdx = challenger;
          else if (t1ok && t2ok) winnerIdx = t1 <= t2 ? turn : challenger;
          return (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 56, marginBottom: 10 }}>{winnerIdx !== null ? "🏆" : "🤝"}</div>
              {winnerIdx !== null ? (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ color: TC[winnerIdx], fontWeight: 800, fontSize: 20, marginBottom: 6 }}>
                    {TE[winnerIdx]} {teams[winnerIdx].name} GAGNE !
                  </div>
                  <div style={{ color: "#2ECC71", fontSize: 16, fontWeight: 700 }}>+5₽</div>
                  <div style={{ color: "#E74C3C", fontSize: 13, marginTop: 4, opacity: 0.7 }}>
                    {TE[winnerIdx === turn ? challenger : turn]} −3₽
                  </div>
                </div>
              ) : (
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, marginBottom: 20 }}>
                  Égalité — personne n&apos;a répondu à temps
                </div>
              )}
              <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
                {[turn, challenger].map((tIdx, pi) => (
                  <div key={pi} style={{ flex: 1, padding: "12px", borderRadius: 12,
                    background: tIdx === winnerIdx ? `${TC[tIdx]}18` : "rgba(255,255,255,0.03)",
                    border: `2px solid ${tIdx === winnerIdx ? TC[tIdx]+"50" : "rgba(255,255,255,0.06)"}` }}>
                    <div style={{ color: TC[tIdx], fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{TE[tIdx]} {teams[tIdx].name}</div>
                    <div style={{ fontWeight: 900, fontSize: 28, color: times[pi] < 60 ? "#2ECC71" : "#E74C3C" }}>
                      {times[pi] < 60 ? `${times[pi]}s` : "✗"}
                    </div>
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
  onHoverChange, onCaseClick, onStarClick, pawns = [], activePawnTeamIdx = -1 }) {
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
    <svg viewBox="0 0 760 580" style={{ width: "100%", display: "block", borderRadius: mario ? 16 : 0 }}
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
          <text x={il.cx} y={il.cy - il.ry + 20}
            textAnchor="middle" fill={mario ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.4)"} fontSize={9.5}
            fontWeight="600" letterSpacing="1.5">
            {il.icon} {il.name}
          </text>
          <text x={il.cx} y={il.cy + il.ry - 12}
            textAnchor="middle" fill={`${sideColor}55`} fontSize={8}
            fontWeight="700" letterSpacing="2">
            {isRecto ? "RECTO" : "VERSO"}
          </text>
        </g>
      ))}

      {/* Bridges */}
      {bridges.map((b, i) => (
        <g key={`br${i}`}>
          <line x1={b.f.x} y1={b.f.y} x2={b.t.x} y2={b.t.y}
            stroke="#5C4A1A" strokeWidth={9} strokeLinecap="round" opacity={0.28} />
          <line x1={b.f.x} y1={b.f.y} x2={b.t.x} y2={b.t.y}
            stroke="#A07C28" strokeWidth={3.5} strokeLinecap="round"
            strokeDasharray="10,7" opacity={0.55} />
          <g onMouseEnter={withHover ? () => handleEnter(`br${i}`, "bridge") : undefined}
             onMouseLeave={withHover ? handleLeave : undefined}
             style={{ cursor: withHover ? "pointer" : "default" }}>
            {hov === `br${i}` && <circle cx={b.m.x} cy={b.m.y} r={26} fill="#8B6914" opacity={0.18} />}
            <circle cx={b.m.x+1.5} cy={b.m.y+2} r={14} fill="rgba(0,0,0,0.28)" />
            <circle cx={b.m.x} cy={b.m.y} r={14} fill="#8B6914"
              stroke={hov === `br${i}` ? "#fff" : "rgba(0,0,0,0.2)"}
              strokeWidth={hov === `br${i}` ? 2.5 : 1.5} />
            <text x={b.m.x} y={b.m.y+1} textAnchor="middle" dominantBaseline="central"
              fill="#fff" fontWeight="700" fontSize={10}>→</text>
          </g>
        </g>
      ))}

      {/* Main path segments */}
      {islands.map(il => il.mp.map((cid, idx) => {
        const nid = il.mp[(idx + 1) % il.mp.length];
        const f = gc(cid), t = gc(nid);
        if (!f || !t) return null;
        const sid = `m-${cid}-${nid}`;
        const hasStar = starSeg?.sid === sid;
        return (
          <line key={sid} x1={f.x} y1={f.y} x2={t.x} y2={t.y}
            stroke={hasStar ? "rgba(241,196,15,0.22)" : "rgba(255,255,255,0.12)"}
            strokeWidth={hasStar ? 3 : 2.5} strokeDasharray="5,4" />
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

      {/* Star token */}
      {!buying && starSeg && (() => {
        const mx = (starSeg.f.x + starSeg.t.x) / 2;
        const my = (starSeg.f.y + starSeg.t.y) / 2;
        return (
          <g onClick={onStarClick}
             onMouseEnter={withHover ? () => handleEnter("star", "star") : undefined}
             onMouseLeave={withHover ? handleLeave : undefined}
             style={{ cursor: onStarClick ? "pointer" : "default" }}>
            {hov === "star" && <circle cx={mx} cy={my} r={28} fill="rgba(241,196,15,0.12)" />}
            <circle cx={mx+1.5} cy={my+2} r={19} fill="rgba(0,0,0,0.32)" />
            <circle cx={mx} cy={my} r={19} fill="#F1C40F"
              stroke={hov === "star" ? "#fff" : "rgba(0,0,0,0.15)"}
              strokeWidth={hov === "star" ? 2.5 : 1.5} />
            <circle cx={mx-4} cy={my-5} r={4.5} fill="rgba(255,255,255,0.3)" />
            <text x={mx} y={my+2} textAnchor="middle" dominantBaseline="central"
              fill="#fff" fontWeight="800" fontSize={18}>★</text>
          </g>
        );
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
// BOARD MAP COMPONENT
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
// PAWN MAP (Plateau tab)
// ═══════════════════════════════════════════════════════
function PawnMap({ teams, setTeams, turn, setTurn, side, starIdx, tourNum, setTourNum, maxTours, onDuel }) {
  const [toast, setToast] = useState(null);
  const show = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleCaseClick = useCallback((caseId) => {
    const c = gc(caseId);
    const tp = c ? (c.r === c.v ? c.r : (side === 0 ? c.r : c.v)) : null;
    setTeams(prev => prev.map((t, i) => {
      if (i !== turn) return t;
      const visited = t.visitedCases ?? [];
      const nv = visited.includes(caseId) ? visited : [...visited, caseId];
      return { ...t, pos: caseId, visitedCases: nv };
    }));
    if (tp === "duel") { onDuel?.(); return; }
    const ct = tp ? CT[tp] : null;
    show(`${TE[turn]} → ${caseId}${ct ? ` · ${ct.e} ${ct.d}` : ""}`);
  }, [turn, side, setTeams, onDuel]);

  const pawns = teams.map((t, i) => ({ teamIdx: i, caseId: t.pos ?? "1a" }));
  const tourPct = Math.round((tourNum / maxTours) * 100);

  return (
    <div>
      {/* Tour counter */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12, marginBottom: 10,
        padding: "10px 16px", borderRadius: 14,
        background: "linear-gradient(90deg,rgba(241,196,15,0.1),rgba(52,152,219,0.06))",
        border: "1px solid rgba(241,196,15,0.2)",
      }}>
        <span style={{ fontSize: 18 }}>🗺️</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ color: "#F1C40F", fontWeight: 800, fontSize: 15 }}>Tour {tourNum}</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>/ {maxTours}</span>
          </div>
          <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${tourPct}%`, borderRadius: 3,
              background: tourPct >= 80 ? "#E74C3C" : tourPct >= 50 ? "#F1C40F" : "#2ECC71",
              transition: "width 0.4s, background 0.4s" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <button onClick={() => setTourNum(p => Math.max(1, p - 1))} style={{
            background: "none", border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.5)", borderRadius: 6, padding: "2px 7px",
            fontSize: 11, cursor: "pointer", fontFamily: "inherit",
          }}>−</button>
          <button onClick={() => setTourNum(p => Math.min(maxTours, p + 1))} style={{
            background: "none", border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.5)", borderRadius: 6, padding: "2px 7px",
            fontSize: 11, cursor: "pointer", fontFamily: "inherit",
          }}>+</button>
        </div>
      </div>

      {/* Team stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 10 }}>
        {teams.map((t, i) => (
          <div key={i} style={{
            padding: "8px 10px", borderRadius: 12,
            background: i === turn ? `${TC[i]}18` : "rgba(255,255,255,0.025)",
            border: `2px solid ${i === turn ? TC[i]+"70" : "rgba(255,255,255,0.06)"}`,
            boxShadow: i === turn ? `0 0 12px ${TC[i]}20` : "none",
            transition: "all 0.2s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 5 }}>
              <span style={{ fontSize: 13 }}>{TE[i]}</span>
              <span style={{
                color: i === turn ? TC[i] : "rgba(255,255,255,0.65)",
                fontWeight: 700, fontSize: 11, flex: 1,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{t.name}</span>
              {i === turn && <span style={{ fontSize: 8, color: TC[i], fontWeight: 700 }}>▶</span>}
            </div>
            <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
              <span style={{ color: "#D4A017", fontWeight: 700, fontSize: 13 }}>🪙{t.coins}</span>
              <span style={{ color: "#F1C40F", fontWeight: 700, fontSize: 13 }}>⭐{t.stars}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Active team bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
        padding: "8px 14px", borderRadius: 12,
        background: `${TC[turn]}12`, border: `1px solid ${TC[turn]}35`,
      }}>
        <span style={{ color: TC[turn], fontWeight: 700, fontSize: 13 }}>{TE[turn]} {teams[turn].name}</span>
        <span style={{ color: "rgba(255,255,255,0.28)", fontSize: 11 }}>— clique une case</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <button onClick={() => onDuel?.()} style={{
            background: "rgba(231,76,60,0.15)", border: "1px solid rgba(231,76,60,0.35)",
            color: "#E74C3C", padding: "4px 10px", borderRadius: 8, fontSize: 11,
            fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}>⚔️ Duel</button>
          <button onClick={() => setTurn(p => (p + 1) % 4)} style={{
            background: `${TC[turn]}20`, border: `1px solid ${TC[turn]}40`, color: TC[turn],
            padding: "4px 12px", borderRadius: 8, fontSize: 11,
            fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}>Suivant →</button>
        </div>
      </div>

      {toast && (
        <div style={{
          textAlign: "center", background: "rgba(10,12,24,0.96)",
          border: "1px solid rgba(255,255,255,0.14)", padding: "6px 16px",
          borderRadius: 10, color: "#fff", fontSize: 12, fontWeight: 600, marginBottom: 8,
        }}>
          {toast}
        </div>
      )}

      <div style={{ margin: "0 -14px" }}>
        <BoardSVG
          side={side} starIdx={starIdx} buying={false}
          withHover={false} mario={true}
          onCaseClick={handleCaseClick}
          pawns={pawns}
          activePawnTeamIdx={turn}
        />
      </div>
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
  const [turn,     setTurn]     = useLS("archi_turn",   0);
  const [tourNum,  setTourNum]  = useLS("archi_tour",   1);
  const [maxTours, setMaxTours] = useLS("archi_maxtour", 10);
  const [mapSide,  setMapSide]  = useLS("archi_side",   0);
  const [mgCount,  setMgCount]  = useLS("archi_mg",     0);
  const [starIdx,  setStarIdx]  = useLS("archi_star",   4);
  const [usedCC,   setUsedCC]   = useLS("archi_cc",     []);
  const [mgFilter, setMgFilter] = useLS("archi_mgf",    "all");

  // ── Transient state ───────────────────────────────────
  const [curQ,       setCurQ]       = useState(null);
  const [showA,      setShowA]      = useState(false);
  const [editT,      setEditT]      = useState(null);
  const [curCC,      setCurCC]      = useState(null);
  const [randMG,     setRandMG]     = useState(null);
  const [resetConf,  setResetConf]  = useState(false);
  const [showFinale, setShowFinale] = useState(false);
  const [showDuel,   setShowDuel]   = useState(false);

  // Expose Q globally so DuelModal can access it
  useEffect(() => { window._Q = Q; }, []);

  // ── Team helpers ──────────────────────────────────────
  const upT  = (i, field, delta)  => setTeams(p => p.map((t, j) => j === i ? { ...t, [field]: Math.max(0, t[field] + delta) } : t));
  const setTF = (i, field, value) => setTeams(p => p.map((t, j) => j === i ? { ...t, [field]: value } : t));

  // ── Question helpers ──────────────────────────────────
  const drawQ = useCallback((lv) => {
    const pool = Q[lv];
    setUsed(prev => {
      const u = prev[lv];
      const avail = pool.reduce((acc, _, i) => { if (!u.includes(i)) acc.push(i); return acc; }, []);
      if (avail.length === 0) {
        const idx = Math.floor(Math.random() * pool.length);
        setCurQ({ ...pool[idx], level: lv });
        return { ...prev, [lv]: [] };
      }
      const ri = Math.floor(Math.random() * avail.length);
      const oi = avail[ri];
      setCurQ({ ...pool[oi], level: lv });
      return { ...prev, [lv]: [...u, oi] };
    });
    setShowA(false);
    setTab("questions");
  }, [setUsed, setTab]);

  const rem = (lv) => Q[lv].length - used[lv].length;

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

  // ── Chaos auto-apply ──────────────────────────────────
  const applyChaos = useCallback((cardName, targetIdx = null, targetIdx2 = null) => {
    setTeams(prev => {
      const t = prev.map(x => ({ ...x }));
      switch (cardName) {
        case "Tempête":        return t.map(x => ({ ...x, coins: Math.max(0, x.coins - 2) }));
        case "Solidarité":     return t.map(x => ({ ...x, coins: x.coins + 2 }));
        case "Aubaine":        return t.map((x, i) => i === turn ? { ...x, coins: x.coins + 5 } : x);
        case "Bénédiction": {
          const min = Math.min(...t.map(x => x.coins));
          return t.map(x => x.coins === min ? { ...x, coins: x.coins + 5 } : x);
        }
        case "Peur du vide": {
          const max = Math.max(...t.map(x => x.coins));
          return t.map(x => x.coins === max ? { ...x, coins: Math.max(0, x.coins - 4) } : x);
        }
        case "Tsunami": {
          const max = Math.max(...t.map(x => x.coins));
          return t.map(x => x.coins === max ? { ...x, coins: Math.max(0, x.coins - 5) } : x);
        }
        case "Arc-en-ciel":    return t.map(x => ({ ...x, coins: x.coins + x.stars }));
        case "Échange royal": {
          const [c0, c2] = [t[0].coins, t[2].coins];
          t[0].coins = c2; t[2].coins = c0;
          const [c1, c3] = [t[1].coins, t[3].coins];
          t[1].coins = c3; t[3].coins = c1;
          return t;
        }
        case "Ricochet": {
          const base = prev.map(x => x.coins);
          return t.map((x, i) => ({
            ...x,
            coins: Math.max(0, base[i] - 1) + (base[(i + 3) % 4] > 0 ? 1 : 0),
          }));
        }
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
          if (t[targetIdx].shields > 0) { t[targetIdx].shields -= 1; }
          else { t[targetIdx].coins = Math.max(0, t[targetIdx].coins - 3); }
          return t;
        case "Aimant":
          if (targetIdx === null || targetIdx2 === null) return t;
          { const [ca, cb] = [t[targetIdx].coins, t[targetIdx2].coins];
            t[targetIdx].coins = cb; t[targetIdx2].coins = ca; return t; }
        default: return t;
      }
    });
    if (cardName === "Retournement") setMapSide(s => s === 0 ? 1 : 0);
  }, [turn, setTeams, setMapSide]);

  // ── Award apply ───────────────────────────────────────
  const applyAward = useCallback((awardIdx) => {
    const teamsWithIdx = teams.map((t, i) => ({ ...t, idx: i }));
    const { award } = AW[awardIdx];
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
          Tour {tourNum}/{MAX_TOURS} · {mapSide === 0 ? "RECTO" : "VERSO"}
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
      <main style={{ maxWidth: 940, margin: "0 auto", padding: "12px 14px 80px" }}>

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
                  {tourNum}/{MAX_TOURS}
                </span>
                <Btn label="+" onClick={() => setTourNum(p => Math.min(MAX_TOURS,p+1))} color="#2ECC71" small />
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
            <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center",
              marginBottom: 10, flexWrap: "wrap" }}>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Nombre de tours :</span>
              {[6, 8, 10, 12, 15].map(n => (
                <button key={n} onClick={() => setMaxTours(n)} style={{
                  padding: "3px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit",
                  background: maxTours === n ? "rgba(241,196,15,0.18)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${maxTours === n ? "rgba(241,196,15,0.4)" : "rgba(255,255,255,0.08)"}`,
                  color: maxTours === n ? "#F1C40F" : "rgba(255,255,255,0.4)",
                }}>{n}</button>
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
            side={mapSide} starIdx={starIdx}
            tourNum={tourNum} setTourNum={setTourNum}
            maxTours={maxTours}
            onDuel={() => setShowDuel(true)}
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
                  {["Tempête","Solidarité","Aubaine","Bénédiction","Peur du vide","Tsunami","Arc-en-ciel","Échange royal","Ricochet"].includes(curCC.n) && (
                    <button onClick={() => applyChaos(curCC.n)} style={{
                      width: "100%", padding: "9px", borderRadius: 10, fontSize: 13, fontWeight: 700,
                      cursor: "pointer", fontFamily: "inherit",
                      background: "rgba(142,68,173,0.25)", border: "1px solid rgba(142,68,173,0.5)", color: "#D4A0F5",
                    }}>⚡ Appliquer l&apos;effet</button>
                  )}
                  {/* Retournement */}
                  {curCC.n === "Retournement" && (
                    <button onClick={() => applyChaos("Retournement")} style={{
                      width: "100%", padding: "9px", borderRadius: 10, fontSize: 13, fontWeight: 700,
                      cursor: "pointer", fontFamily: "inherit",
                      background: "rgba(142,68,173,0.25)", border: "1px solid rgba(142,68,173,0.5)", color: "#D4A0F5",
                    }}>🔄 Retourner le plateau ({mapSide === 0 ? "RECTO→VERSO" : "VERSO→RECTO"})</button>
                  )}
                  {/* Target-selection cards */}
                  {["Vol de pièces","Don empoisonné","Malédiction"].includes(curCC.n) && (
                    <div>
                      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginBottom: 8 }}>Choisir la cible :</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {teams.map((t, i) => i !== turn && (
                          <button key={i} onClick={() => applyChaos(curCC.n, i)} style={{
                            background: `${TC[i]}20`, border: `1px solid ${TC[i]}50`,
                            color: TC[i], padding: "6px 12px", borderRadius: 8, fontSize: 12,
                            fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                          }}>{TE[i]} {t.name}</button>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Aimant — pick 2 targets via AimantPicker */}
                  {curCC.n === "Aimant" && (
                    <AimantPicker teams={teams} onApply={(a, b) => applyChaos("Aimant", a, b)} />
                  )}
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
                  ["🟢 Question Collège", "+1₽"], ["🟡 Question Lycée", "+3₽"],
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
          onClose={() => setShowDuel(false)}
        />
      )}
    </div>
  );
}
