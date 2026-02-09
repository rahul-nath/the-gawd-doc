import { useState, useRef, type ChangeEvent } from "react";
import * as L from "./field_labels";

const Guidance = ({ text }: { text: string }) => (
  <blockquote className="my-4 border-l-[3px] border-neutral-400 bg-neutral-50 py-3 px-5 text-[13.5px] leading-relaxed text-neutral-700 whitespace-pre-line">
    <strong>Author Guidance</strong>: {text}
  </blockquote>
);

const Quote = ({ text }: { text: string }) => (
  <blockquote className="my-3 border-l-[3px] border-neutral-400 bg-neutral-50 py-2.5 px-5 text-[14px] leading-relaxed text-neutral-600 italic">
    {text}
  </blockquote>
);

const Hr = () => <hr className="my-8 border-neutral-300" />;
const H1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-[28px] font-bold text-neutral-900 mt-0 mb-6">{children}</h1>
);
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[22px] font-bold text-neutral-900 mt-8 mb-3">{children}</h2>
);
const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-[17px] font-bold text-neutral-900 mt-6 mb-2">{children}</h3>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[15px] leading-relaxed text-neutral-800 mb-2">{children}</p>
);
const Ul = ({ items }: { items: string[] }) => (
  <ul className="list-disc ml-6 mb-3 space-y-1">
    {items.map((t, i) => (
      <li key={i} className="text-[15px] leading-relaxed text-neutral-800">{t}</li>
    ))}
  </ul>
);
const BoldUl = ({ items }: { items: { bold: string; rest: string }[] }) => (
  <ul className="list-disc ml-6 mb-3 space-y-1">
    {items.map((t, i) => (
      <li key={i} className="text-[15px] leading-relaxed text-neutral-800">
        <strong>{t.bold}</strong>{t.rest}
      </li>
    ))}
  </ul>
);
const Ol = ({ items }: { items: string[] }) => (
  <ol className="list-decimal ml-6 mb-3 space-y-1">
    {items.map((t, i) => (
      <li key={i} className="text-[15px] leading-relaxed text-neutral-800">{t}</li>
    ))}
  </ol>
);
const CodeBlock = ({ code }: { code: string }) => (
  <pre className="bg-neutral-100 border border-neutral-200 rounded px-4 py-2.5 my-3 text-[13.5px] font-mono text-neutral-800 overflow-x-auto">
    {code}
  </pre>
);
const ItalicP = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[15px] leading-relaxed text-neutral-600 italic mb-2">{children}</p>
);

const Field = ({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) => (
  <textarea
    value={value}
    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
    placeholder={placeholder}
    rows={rows}
    className="w-full border border-neutral-300 rounded px-3 py-2 text-[14px] leading-relaxed text-neutral-800 bg-white focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-400 resize-y my-2 placeholder:text-neutral-400"
  />
);

interface TableRow { [key: string]: string }

const EditableTable = ({ headers, rows, setRows, keys }: {
  headers: string[]; rows: TableRow[]; setRows: (r: TableRow[]) => void; keys: string[];
}) => {
  const updateCell = (ri: number, key: string, val: string) => {
    const next = rows.map((r, i) => (i === ri ? { ...r, [key]: val } : r));
    setRows(next);
  };
  const addRow = () => {
    const empty: TableRow = {};
    keys.forEach((k) => (empty[k] = ""));
    setRows([...rows, empty]);
  };
  return (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse text-[14px]">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="border-b-2 border-neutral-400 py-2 px-3 text-left font-bold text-neutral-900 bg-neutral-50">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-neutral-200">
              {keys.map((k, ci) => (
                <td key={ci} className="py-1.5 px-1">
                  <input type="text" value={row[k] || ""} onChange={(e) => updateCell(ri, k, e.target.value)}
                    placeholder={headers[ci]}
                    className="w-full border border-neutral-200 rounded px-2 py-1 text-[13.5px] text-neutral-800 bg-white focus:outline-none focus:border-neutral-400 placeholder:text-neutral-300" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={addRow} className="mt-2 text-[13px] text-neutral-500 hover:text-neutral-800 cursor-pointer">+ Add row</button>
    </div>
  );
};

export default function GawdDoc() {
  const docRef = useRef<HTMLDivElement>(null);

  const [s1_1, setS1_1] = useState("");
  const [s1_2, setS1_2] = useState("");
  const [s1_3, setS1_3] = useState("");
  const [slaRows, setSlaRows] = useState<TableRow[]>(
    L.S1_4_TABLE_DEFAULTS.map((d) => ({ metric: d.metric, target: d.target, mechanism: "", measured: "" }))
  );
  const [s2, setS2] = useState("");
  const [s3, setS3] = useState("");
  const [s4_lifecycle, setS4Lifecycle] = useState("");
  const [s4_failure, setS4Failure] = useState("");
  const [s5, setS5] = useState("");
  const [s6, setS6] = useState("");
  const [s7, setS7] = useState("");
  const [s8, setS8] = useState("");
  const [s9, setS9] = useState("");
  const [s10, setS10] = useState("");
  const [s10_runbook, setS10Runbook] = useState("");
  const [s11, setS11] = useState("");
  const [depRows, setDepRows] = useState<TableRow[]>(
    L.S12_TABLE_DEFAULTS.map((d) => ({ dependency: d.dependency, failureMode: d.failureMode, fallback: d.fallback, sla: d.sla, circuitBreaker: d.circuitBreaker }))
  );
  const [s12_controls, setS12Controls] = useState("");
  const [s13_security, setS13Security] = useState("");
  const [s13_authz, setS13Authz] = useState("");
  const [s14_backpressure, setS14Backpressure] = useState("");
  const [costRows, setCostRows] = useState<TableRow[]>(
    L.S14_TABLE_DEFAULTS.map((d) => ({ scale: d.scale, cost: d.cost, risk: d.risk }))
  );
  const [s15_ownership, setS15Ownership] = useState("");
  const [s15_crossteam, setS15Crossteam] = useState("");
  const [s15_oncall, setS15Oncall] = useState("");
  const [tradeoffs, setTradeoffs] = useState("");
  const [riskRows, setRiskRows] = useState<TableRow[]>([
    { rank: "1", risk: "", likelihood: "", severity: "", mitigation: "", confidence: "" },
    { rank: "2", risk: "", likelihood: "", severity: "", mitigation: "", confidence: "" },
    { rank: "3", risk: "", likelihood: "", severity: "", mitigation: "", confidence: "" },
  ]);
  const [limitations, setLimitations] = useState("");
  const [decisionRows, setDecisionRows] = useState<TableRow[]>(
    L.DECISIONS_TABLE_DEFAULTS.map((d) => ({ decision: d.decision, alternatives: d.alternatives, why: d.why, revisit: d.revisit }))
  );
  const [decisionNarratives, setDecisionNarratives] = useState("");
  const [rollout_deploy, setRolloutDeploy] = useState("");
  const [rollout_rollback, setRolloutRollback] = useState("");
  const [rollout_migration, setRolloutMigration] = useState("");
  const [twoweeks, setTwoweeks] = useState("");

  const handleSavePdf = async () => {
    if (!docRef.current) return;

    const printRoot = document.createElement("div");
    printRoot.id = "print-only-root";

    const makeHeading = (text: string, level: "h1" | "h2" | "h3") => {
      const el = document.createElement(level);
      el.textContent = text;
      el.style.margin = "16px 0 6px 0";
      el.style.fontFamily = "'Charter', 'Georgia', 'Times New Roman', serif";
      el.style.fontSize = level === "h1" ? "22px" : level === "h2" ? "18px" : "15px";
      el.style.fontWeight = "700";
      return el;
    };

    const makeText = (text: string, isEmpty: boolean) => {
      const el = document.createElement("div");
      el.textContent = isEmpty ? "(empty)" : text;
      el.style.whiteSpace = "pre-wrap";
      el.style.margin = "0 0 10px 0";
      el.style.fontFamily = "'Charter', 'Georgia', 'Times New Roman', serif";
      el.style.fontSize = "13px";
      el.style.lineHeight = "1.45";
      if (isEmpty) el.style.color = "#666";
      return el;
    };

    const skipHeadings = new Set([
      "README",
      "Staff Eng Priority Order",
      "How to Use This Template",
    ]);
    const nodes = Array.from(docRef.current.querySelectorAll("h1,h2,h3,textarea,table"));
    for (const node of nodes) {
      if (node.tagName === "H1") {
        const text = (node as HTMLElement).innerText;
        if (!skipHeadings.has(text.trim())) {
          printRoot.appendChild(makeHeading(text, "h1"));
        }
      } else if (node.tagName === "H2") {
        const text = (node as HTMLElement).innerText;
        if (!skipHeadings.has(text.trim())) {
          printRoot.appendChild(makeHeading(text, "h2"));
        }
      } else if (node.tagName === "H3") {
        const text = (node as HTMLElement).innerText;
        if (!skipHeadings.has(text.trim())) {
          printRoot.appendChild(makeHeading(text, "h3"));
        }
      } else if (node.tagName === "TEXTAREA") {
        const value = (node as HTMLTextAreaElement).value || "";
        printRoot.appendChild(makeText(value, value.trim().length === 0));
      } else if (node.tagName === "TABLE") {
        const clone = node.cloneNode(true) as HTMLElement;
        printRoot.appendChild(clone);
      }
    }

    const printStyle = document.createElement("style");
    printStyle.id = "print-only-style";
    printStyle.textContent = `
      @media print {
        body * { visibility: hidden !important; }
        #print-only-root, #print-only-root * { visibility: visible !important; }
        html, body { height: auto !important; overflow: visible !important; }
        #print-only-root { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; display: inline-block; }
        #print-only-root { page-break-after: avoid; break-after: avoid; }
        #print-only-root > * { break-inside: avoid; }
        #print-only-root > *:last-child { break-after: avoid; }
        table { width: 100%; border-collapse: collapse; margin: 6px 0 12px 0; }
        th, td { border: 1px solid #ddd; padding: 6px; vertical-align: top; }
      }
    `;

    document.head.appendChild(printStyle);
    document.body.appendChild(printRoot);

    const cleanup = () => {
      printRoot.remove();
      printStyle.remove();
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);

    requestAnimationFrame(() => window.print());
  };

  return (
    <div className="min-h-screen bg-neutral-100 py-8 px-4">
      <div ref={docRef} className="max-w-[816px] mx-auto bg-white shadow-sm border border-neutral-200 px-12 py-10"
        style={{ fontFamily: "'Charter', 'Georgia', 'Times New Roman', serif" }}>

        <H1>{L.TITLE}</H1>

        {/* README */}
        <H2>{L.README_HEADING}</H2>
        <P>{L.README_INTRO}</P>
        <BoldUl items={L.README_BULLETS} />
        <H3>{L.PRIORITY_HEADING}</H3>
        <Ol items={L.PRIORITY_LIST} />
        <Quote text={L.README_QUOTE_1} />
        <Quote text={L.README_QUOTE_2} />
        <H3>{L.HOW_TO_USE_HEADING}</H3>
        <P>{L.HOW_TO_USE_BODY}</P>
        <Hr />

        {/* 1. Design Goals */}
        <H2>{L.S1_HEADING}</H2>
        <H3>{L.S1_1_HEADING}</H3>
        <Guidance text={L.S1_1_GUIDANCE} />
        <ItalicP>{L.S1_1_PROMPT}</ItalicP>
        <Quote text={`Example: ${L.S1_1_EXAMPLE}`} />
        <Field value={s1_1} onChange={setS1_1} placeholder="Describe the architectural archetype of your system…" rows={2} />

        <H3>{L.S1_2_HEADING}</H3>
        <P>{L.S1_2_BODY}</P>
        <Guidance text={L.S1_2_GUIDANCE} />
        <Quote text={L.S1_2_EXAMPLE_INTRO} />
        <ul className="list-disc ml-10 mb-3 space-y-0.5">
          {L.S1_2_EXAMPLE_BULLETS.map((b, i) => (
            <li key={i} className="text-[14px] italic text-neutral-600">{b}</li>
          ))}
        </ul>
        <Field value={s1_2} onChange={setS1_2} placeholder="Why does this system exist? What guarantees does it provide?" rows={3} />

        <H3>{L.S1_3_HEADING}</H3>
        <Guidance text={L.S1_3_GUIDANCE} />
        <P>{L.S1_3_BODY}</P>
        <Field value={s1_3} onChange={setS1_3} placeholder="Problem, inputs, non-goals, possible mistakes, metrics…" rows={4} />

        <H3>{L.S1_4_HEADING}</H3>
        <Guidance text={L.S1_4_GUIDANCE} />
        <EditableTable headers={L.S1_4_TABLE_HEADERS} rows={slaRows} setRows={setSlaRows} keys={["metric", "target", "mechanism", "measured"]} />
        <Hr />

        {/* 2. Inputs and Bounds */}
        <H2>{L.S2_HEADING}</H2>
        <P>Enforce limits <strong>before</strong> work begins.</P>
        <Ul items={L.S2_BULLETS} />
        <Guidance text={L.S2_GUIDANCE} />
        <Field value={s2} onChange={setS2} placeholder="Define your input bounds and what happens when they're violated…" rows={4} />
        <Hr />

        {/* 3. Units of Work */}
        <H2>{L.S3_HEADING}</H2>
        <P>Units of work are named: <code className="text-[13.5px] bg-neutral-100 px-1 py-0.5 rounded border border-neutral-200">request</code>, <code className="text-[13.5px] bg-neutral-100 px-1 py-0.5 rounded border border-neutral-200">batch</code>, <code className="text-[13.5px] bg-neutral-100 px-1 py-0.5 rounded border border-neutral-200">page</code>, <code className="text-[13.5px] bg-neutral-100 px-1 py-0.5 rounded border border-neutral-200">student</code>, <code className="text-[13.5px] bg-neutral-100 px-1 py-0.5 rounded border border-neutral-200">job</code>, etc.</P>
        <P>{L.S3_BODY_2}</P>
        <Guidance text={L.S3_GUIDANCE} />
        <Field value={s3} onChange={setS3} placeholder="Name your unit of work and why it's the right grain…" rows={3} />
        <Hr />

        {/* 4. Lifecycle */}
        <H2>{L.S4_HEADING}</H2>
        <P>{L.S4_BODY}</P>
        <CodeBlock code={L.S4_CODE} />
        <Field value={s4_lifecycle} onChange={setS4Lifecycle} placeholder="Describe your system's lifecycle states and transitions…" rows={3} />
        <H3>{L.S4_SUB_HEADING}</H3>
        <P>{L.S4_SUB_BODY}</P>
        <Ul items={L.S4_BULLETS} />
        <Guidance text={L.S4_GUIDANCE} />
        <Field value={s4_failure} onChange={setS4Failure} placeholder="For each failure: what continues, stops, retries, and what state is left behind…" rows={4} />
        <Hr />

        {/* 5. Data Model */}
        <H2>{L.S5_HEADING}</H2>
        <BoldUl items={L.S5_BULLETS} />
        <Guidance text={L.S5_GUIDANCE} />
        <Field value={s5} onChange={setS5} placeholder="Entities, storage engine, consistency model, retention, migration…" rows={5} />
        <Hr />

        {/* 6. Outputs */}
        <H2>{L.S6_HEADING}</H2>
        <P>{L.S6_BODY}</P>
        <Ul items={L.S6_BULLETS} />
        <Guidance text={L.S6_GUIDANCE} />
        <Field value={s6} onChange={setS6} placeholder="Describe outputs, who depends on them, and blast radius…" rows={4} />
        <Hr />

        {/* 7. Interface Contracts */}
        <H2>{L.S7_HEADING}</H2>
        <BoldUl items={L.S7_BULLETS} />
        <Guidance text={L.S7_GUIDANCE} />
        <Field value={s7} onChange={setS7} placeholder="Endpoint signatures, schemas, versioning, compatibility guarantees…" rows={4} />
        <Hr />

        {/* 8. Bad Outcomes */}
        <H2>{L.S8_HEADING}</H2>
        <P>{L.S8_BODY}</P>
        <Ul items={L.S8_FAILURE_MODES} />
        <Guidance text={L.S8_GUIDANCE} />
        <Field value={s8} onChange={setS8} placeholder="Rank failure modes and narrate 2-3 scenarios end-to-end…" rows={6} />
        <Hr />

        {/* 9. Idempotency */}
        <H2>{L.S9_HEADING}</H2>
        <Ul items={L.S9_BULLETS} />
        <Guidance text={L.S9_GUIDANCE} />
        <Field value={s9} onChange={setS9} placeholder="Where is idempotency enforced? What happens on duplicate requests?…" rows={4} />
        <Hr />

        {/* 10. Observability */}
        <H2>{L.S10_HEADING}</H2>
        <H3>{L.S10_SUB1_HEADING}</H3>
        <Ul items={L.S10_SUB1_BULLETS} />
        <H3>{L.S10_SUB2_HEADING}</H3>
        <P>{L.S10_SUB2_BODY}</P>
        <Ul items={L.S10_SUB2_BULLETS} />
        <Guidance text={L.S10_GUIDANCE} />
        <Field value={s10} onChange={setS10} placeholder="Describe your observability setup — structured logs, metrics, dashboards…" rows={4} />
        <Field value={s10_runbook} onChange={setS10Runbook} placeholder="Runbook stubs: alert → check → escalation path…" rows={3} />
        <Hr />

        {/* 11. Verification */}
        <H2>{L.S11_HEADING}</H2>
        <P>{L.S11_BODY}</P>
        <BoldUl items={L.S11_BULLETS} />
        <Guidance text={L.S11_GUIDANCE} />
        <Field value={s11} onChange={setS11} placeholder="What's tested, what's not, and what confidence does each layer give you…" rows={5} />
        <Hr />

        {/* 12. Dependency Map */}
        <H2>{L.S12_HEADING}</H2>
        <H3>{L.S12_SUB1_HEADING}</H3>
        <Guidance text={L.S12_SUB1_GUIDANCE} />
        <EditableTable headers={L.S12_TABLE_HEADERS} rows={depRows} setRows={setDepRows} keys={["dependency", "failureMode", "fallback", "sla", "circuitBreaker"]} />
        <H3>{L.S12_SUB2_HEADING}</H3>
        <Ul items={L.S12_SUB2_BULLETS} />
        <Field value={s12_controls} onChange={setS12Controls} placeholder="Describe resource use controls — timeouts, cancellation, orphan prevention…" rows={3} />
        <Hr />

        {/* 13. Security */}
        <H2>{L.S13_HEADING}</H2>
        <H3>{L.S13_SUB1_HEADING}</H3>
        <Ul items={L.S13_SUB1_BULLETS} />
        <Field value={s13_security} onChange={setS13Security} placeholder="Describe security posture — secrets management, data handling, validation…" rows={3} />
        <H3>{L.S13_SUB2_HEADING}</H3>
        <BoldUl items={L.S13_SUB2_BULLETS} />
        <Guidance text={L.S13_GUIDANCE} />
        <Field value={s13_authz} onChange={setS13Authz} placeholder="AuthZ model — roles, tenant isolation, audit trail…" rows={4} />
        <Hr />

        {/* 14. Backpressure */}
        <H2>{L.S14_HEADING}</H2>
        <H3>{L.S14_SUB1_HEADING}</H3>
        <Ul items={L.S14_SUB1_BULLETS} />
        <Field value={s14_backpressure} onChange={setS14Backpressure} placeholder="Describe backpressure strategy — retry isolation, compartmentalization…" rows={3} />
        <H3>{L.S14_SUB2_HEADING}</H3>
        <Guidance text={L.S14_SUB2_GUIDANCE} />
        <EditableTable headers={L.S14_TABLE_HEADERS} rows={costRows} setRows={setCostRows} keys={["scale", "cost", "risk"]} />
        <Hr />

        {/* 15. Organizational Context */}
        <H2>{L.S15_HEADING}</H2>
        <Guidance text={L.S15_GUIDANCE} />
        <H3>{L.S15_SUB1_HEADING}</H3>
        <Ul items={L.S15_SUB1_BULLETS} />
        <Field value={s15_ownership} onChange={setS15Ownership} placeholder="Team ownership, paging, contract approval process…" rows={3} />
        <H3>{L.S15_SUB2_HEADING}</H3>
        <Ul items={L.S15_SUB2_BULLETS} />
        <Field value={s15_crossteam} onChange={setS15Crossteam} placeholder="Shared resources, breaking change protocol, coordination…" rows={3} />
        <H3>{L.S15_SUB3_HEADING}</H3>
        <Ul items={L.S15_SUB3_BULLETS} />
        <Field value={s15_oncall} onChange={setS15Oncall} placeholder="On-call context, start-here doc, escalation path…" rows={3} />
        <Hr />

        {/* Intentional Tradeoffs */}
        <H2>{L.TRADEOFFS_HEADING}</H2>
        <ol className="list-decimal ml-6 mb-3 space-y-2">
          {L.TRADEOFFS_ITEMS.map((item, i) => (
            <li key={i} className="text-[15px] leading-relaxed text-neutral-800">
              <strong>{item.bold}</strong>{item.rest}
              {item.sub && item.sub.length > 0 && (
                <ul className="list-disc ml-6 mt-1 space-y-0.5">
                  {item.sub.map((s, j) => (
                    <li key={j} className="text-[14px] text-neutral-700">{s}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
        <Quote text={L.TRADEOFFS_QUOTE} />
        <Guidance text={L.TRADEOFFS_GUIDANCE} />
        <Field value={tradeoffs} onChange={setTradeoffs} placeholder="Document tradeoffs with reversal triggers…" rows={5} />
        <Hr />

        {/* Risk Synthesis */}
        <H2>{L.RISK_HEADING}</H2>
        <Guidance text={L.RISK_GUIDANCE} />
        <H3>{L.RISK_SUB_HEADING}</H3>
        <EditableTable headers={L.RISK_TABLE_HEADERS} rows={riskRows} setRows={setRiskRows} keys={["rank", "risk", "likelihood", "severity", "mitigation", "confidence"]} />
        <Quote text={L.RISK_FOOTNOTE} />
        <Hr />

        {/* Known Limitations */}
        <H2>{L.LIMITATIONS_HEADING}</H2>
        <ol className="list-decimal ml-6 mb-3 space-y-1">
          {L.LIMITATIONS_ITEMS.map((item, i) => (
            <li key={i} className="text-[15px] leading-relaxed text-neutral-800">
              <strong>{item.bold}</strong>{item.rest}
            </li>
          ))}
        </ol>
        <Quote text={L.LIMITATIONS_QUOTE} />
        <Guidance text={L.LIMITATIONS_GUIDANCE} />
        <Field value={limitations} onChange={setLimitations} placeholder="Non-goals, expected mistakes, when does this design break, dominating failure mode…" rows={5} />
        <Hr />

        {/* Decision Log */}
        <H2>{L.DECISIONS_HEADING}</H2>
        <Guidance text={L.DECISIONS_GUIDANCE} />
        <EditableTable headers={L.DECISIONS_TABLE_HEADERS} rows={decisionRows} setRows={setDecisionRows} keys={["decision", "alternatives", "why", "revisit"]} />
        <H3>{L.DECISIONS_NARRATIVES_HEADING}</H3>
        <ItalicP>{L.DECISIONS_NARRATIVES_BODY}</ItalicP>
        <Field value={decisionNarratives} onChange={setDecisionNarratives} placeholder="For each non-trivial decision, expand the reasoning narrative…" rows={5} />
        <Hr />

        {/* Rollout Plan */}
        <H2>{L.ROLLOUT_HEADING}</H2>
        <Guidance text={L.ROLLOUT_GUIDANCE} />
        <H3>{L.ROLLOUT_SUB1_HEADING}</H3>
        <Ul items={L.ROLLOUT_SUB1_BULLETS} />
        <Field value={rollout_deploy} onChange={setRolloutDeploy} placeholder="Feature flags, canary, shadow traffic, validation criteria…" rows={3} />
        <H3>{L.ROLLOUT_SUB2_HEADING}</H3>
        <BoldUl items={L.ROLLOUT_SUB2_BULLETS} />
        <Field value={rollout_rollback} onChange={setRolloutRollback} placeholder="Rollback triggers, procedure, data rollback…" rows={3} />
        <H3>{L.ROLLOUT_SUB3_HEADING}</H3>
        <Ul items={L.ROLLOUT_SUB3_BULLETS} />
        <Field value={rollout_migration} onChange={setRolloutMigration} placeholder="Migration path, validation criteria per stage…" rows={3} />
        <Hr />

        {/* If I Had 2 More Weeks */}
        <H2>{L.TWOWEEKS_HEADING}</H2>
        <ol className="list-decimal ml-6 mb-3 space-y-2">
          {L.TWOWEEKS_ITEMS.map((item, i) => (
            <li key={i} className="text-[15px] leading-relaxed text-neutral-800">
              <strong>{item.bold}</strong>{item.rest}
              {item.metrics && item.metrics.length > 0 && (
                <>
                  <p className="text-[14px] text-neutral-700 mt-1 ml-2">Metrics that must exist:</p>
                  <ul className="list-disc ml-8 mt-0.5 space-y-0.5">
                    {item.metrics.map((m, j) => (
                      <li key={j} className="text-[13.5px] font-mono text-neutral-600">{m}</li>
                    ))}
                  </ul>
                </>
              )}
              {item.sub && item.sub.length > 0 && (
                <ul className="list-disc ml-6 mt-1 space-y-0.5">
                  {item.sub.map((s, j) => (
                    <li key={j} className="text-[14px] text-neutral-700">{s}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
        <Guidance text={L.TWOWEEKS_GUIDANCE} />
        <Field value={twoweeks} onChange={setTwoweeks} placeholder="What would you do with 2 more weeks? What's the next architecture step?" rows={4} />

      </div>

      {/* Save as PDF button */}
      <div className="max-w-[816px] mx-auto mt-6 mb-12 flex justify-center">
        <button
          onClick={handleSavePdf}
          className="px-8 py-3 bg-neutral-900 text-white text-[15px] font-medium rounded hover:bg-neutral-700 transition-colors cursor-pointer shadow-md"
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
}
