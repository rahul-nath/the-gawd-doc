// ============================================================
// THE GAWD DOC — All static text as importable constants
// ============================================================

export const TITLE = "THE GAWD DOC";

// README
export const README_HEADING = "README";
export const README_INTRO = "This structure is a hybrid of:";
export const README_BULLETS = [
  { bold: "PRD", rest: " (product intent)" },
  { bold: "ADR", rest: " (architectural decision record)" },
  { bold: "SRE error-budget thinking", rest: "" },
  { bold: "Postmortem-readiness", rest: "" },
];

export const PRIORITY_HEADING = "Staff Eng Priority Order";
export const PRIORITY_LIST = [
  "Correctness + auditability",
  "System stability",
  "Operational debuggability",
  "Throughput",
  "Latency",
];

export const README_QUOTE_1 =
  'Staff eng. never produces work where the reviewer feels "I need to stay involved."';
export const README_QUOTE_2 =
  'The GAWD DOC forces bounded design, failure semantics, and organizational alignment — not just "clean architecture."';

export const HOW_TO_USE_HEADING = "How to Use This Template";
export const HOW_TO_USE_BODY =
  "Every section contains Author Guidance — prompts that push you beyond checklist-filling toward the narrative reasoning that makes a design doc a teaching tool. A great design doc doesn't just describe the system; it makes the reader smarter about the problem domain. If your doc could be written by someone who hasn't deeply understood the problem, it's not done yet.";

// ============================================================
// 1. Design Goals
// ============================================================
export const S1_HEADING = "1. Design Goals";

export const S1_1_HEADING = "1.1 Theory of the System";
export const S1_1_GUIDANCE =
  "Before anything else, name the architectural archetype. Is this a pipeline? A saga? A fanout-collect? An event-sourced ledger? A queue-drain with variable-cost work items? This single sentence should let a senior engineer predict 80% of your design decisions before reading further. If you can't name the archetype, you haven't internalized the problem yet.";
export const S1_1_PROMPT =
  "One sentence that captures the fundamental computational shape of this system:";
export const S1_1_EXAMPLE =
  '"This system is a queue-drain pipeline with variable-cost work items (LLM calls), a hard correctness constraint on outputs (grades), and a soft latency target (< 60s p99)."';

export const S1_2_HEADING = "1.2 Why This Exists";
export const S1_2_BODY =
  "Explain in one sentence where this fits in a system. Frame the problem using events and guarantees.";
export const S1_2_GUIDANCE =
  "Don't just describe what it does — describe what the world looks like without it. What's the current pain? What breaks, costs money, or erodes trust? The \"why\" should make a non-technical stakeholder nod.";
export const S1_2_EXAMPLE_INTRO = "Build a fault-tolerant grading pipeline that:";
export const S1_2_EXAMPLE_BULLETS = [
  "Never silently corrupts grades",
  "Never overloads external APIs",
  "Degrades gracefully under load",
  "Supports replay, audit, and recovery",
];

export const S1_3_HEADING = "1.3 This Version";
export const S1_3_GUIDANCE =
  'Be ruthless about what this version is and isn\'t. A principal engineer\'s superpower is saying "not yet" with enough specificity that nobody argues. The non-goals should be specific enough that a future engineer knows when to revisit them.';
export const S1_3_BODY =
  "Describe the problem, inputs, non-goals, possible mistakes, and metrics for the current iteration.";

export const S1_4_HEADING = "1.4 SLA / SLO Targets";
export const S1_4_GUIDANCE =
  "These aren't aspirational — they're promises you're making with your design. For each target, you should be able to point to a specific design decision that makes it achievable and a specific monitoring check that proves it's being met. If you can't trace the number to a mechanism, the number is fiction.";
export const S1_4_TABLE_HEADERS = [
  "Metric",
  "Target",
  "Design Mechanism That Achieves It",
  "How It's Measured",
];
export const S1_4_TABLE_DEFAULTS = [
  { metric: "p99 latency", target: "e.g. < 30s" },
  { metric: "Job success rate", target: "e.g. > 99.5%" },
  { metric: "Time to recovery", target: "e.g. < 15 min" },
  { metric: "Data correctness", target: "e.g. 100%" },
];

// ============================================================
// 2. Inputs and Bounds
// ============================================================
export const S2_HEADING = "2. Inputs and Bounds";
export const S2_BODY = "Enforce limits before work begins.";
export const S2_BULLETS = [
  "Size, count, rate — all bounded",
  "Ordering assumptions are explicit",
];
export const S2_GUIDANCE =
  'For every bound, state what happens when it\'s violated. "Max batch size is 500" is incomplete. "Max batch size is 500; requests above this are rejected with a 413 and a structured error body that names the limit" is a design. Also state why this bound — is it a memory constraint? An API limit? A UX decision? Bounds without rationale become cargo cult in six months.';

// ============================================================
// 3. Units of Work
// ============================================================
export const S3_HEADING = "3. Units of Work";
export const S3_BODY_1 =
  "Units of work are named: request, batch, page, student, job, etc.";
export const S3_BODY_2 = "All parallelism is expressed using this unit.";
export const S3_GUIDANCE =
  'The unit of work is the most important abstraction in the system. Everything flows from it — retry granularity, parallelism, observability, billing, and user mental model. Ask yourself: if this unit is wrong, what breaks? If "job" should have been "student" all along, how much do you have to rewrite? The unit of work should be the natural grain of correctness, not just the natural grain of processing.';

// ============================================================
// 4. Lifecycle and State Transitions
// ============================================================
export const S4_HEADING = "4. Lifecycle and State Transitions";
export const S4_BODY = "Define a clear lifecycle:";
export const S4_CODE = "created → validated → processing → completed | failed";
export const S4_SUB_HEADING = "Failure Semantics";
export const S4_SUB_BODY = "For each failure:";
export const S4_BULLETS = [
  "What continues",
  "What stops",
  "What retries",
  "What state is left behind",
];
export const S4_GUIDANCE =
  'Draw the state machine. Literally. Every arrow should have a label (what triggers the transition) and every terminal state should have an explanation of what the operator does next. Pay special attention to stuck states — what if a job is in "processing" for 4 hours? Is there a reaper? A timeout? Who notices? The lifecycle isn\'t done until you\'ve answered: "what\'s the query I run to find everything that\'s broken right now?"';

// ============================================================
// 5. Data Model and State Management
// ============================================================
export const S5_HEADING = "5. Data Model and State Management";
export const S5_BULLETS = [
  { bold: "Entities", rest: ": what's stored and why" },
  { bold: "Storage engine choices", rest: ": and why this one over alternatives" },
  { bold: "Consistency model", rest: ": eventual? strong? per-entity?" },
  { bold: "Retention / TTL", rest: ": when does data expire or get archived" },
  { bold: "Migration path", rest: ": how does the schema evolve without downtime" },
];
export const S5_GUIDANCE =
  'The data model outlives the code. Assume this system gets rewritten in two years — the data model probably survives. Design it that way. For storage engine choices, don\'t just say "Postgres because the team knows it." State the access patterns (read-heavy? write-heavy? scan-heavy?) and why this engine fits. For consistency, be specific per-entity: "grades are strongly consistent; analytics counters are eventually consistent" is far more useful than a blanket statement.';

// ============================================================
// 6. Outputs
// ============================================================
export const S6_HEADING = "6. Outputs";
export const S6_BODY = "Outputs are versioned and well-defined.";
export const S6_BULLETS = [
  "Name who depends on it (user? internal service? admin?)",
  "Isolation + org flow + blast radius control",
];
export const S6_GUIDANCE =
  'For each output, answer: "If this output is wrong, who calls who?" That chain of accountability should be explicit. Also state the shape of the output — is it a response body, a database row, a file in S3, an event on a bus? Versioning strategy should answer: "can I deploy a change to this output without coordinating with every consumer?" If the answer is no, your blast radius is your entire org.';

// ============================================================
// 7. Interface Contracts
// ============================================================
export const S7_HEADING = "7. Interface Contracts";
export const S7_BULLETS = [
  { bold: "Endpoint signatures / event schemas / message formats", rest: "" },
  { bold: "Versioning strategy", rest: ": semver? additive-only?" },
  { bold: "Backward compatibility guarantees", rest: "" },
  { bold: "Contract ownership", rest: ": who owns the contract, who is notified on change" },
];
export const S7_GUIDANCE =
  "The interface is the most expensive thing to change. Write this section as if you're signing a contract with a team that will be annoyed with you if you break it. Include example payloads — not just the schema, but a concrete instance with realistic data. State what fields are guaranteed stable vs. what might change. If you're using events, state ordering guarantees (or explicitly disclaim them). A principal engineer treats every interface as a published API, even internal ones.";

// ============================================================
// 8. What Bad Outcome Matters Most
// ============================================================
export const S8_HEADING = "8. What Bad Outcome Matters Most";
export const S8_BODY = "Rank the failure modes that keep you up at night:";
export const S8_FAILURE_MODES = [
  "Latency spike",
  "OOM",
  "Cost blowup",
  "Wrong result",
  "Data loss",
  "Silent corruption",
];
export const S8_GUIDANCE = `Don't just list these — play out 2-3 of the top failure scenarios end-to-end as narratives. Example:

"Scenario: LLM provider returns 500s on 30% of requests for 20 minutes at 2 a.m.
• In-flight jobs: 150 jobs are mid-processing. The circuit breaker trips after 5 failures in 30s. In-flight jobs that haven't reached the LLM call yet continue; those blocked on LLM are moved to retry_pending with exponential backoff.
• Operator experience: PagerDuty alert fires on llm_error_rate > 10%. Runbook says: check LLM status page, check circuit breaker dashboard, verify retry queue is draining.
• User experience: Users see 'grading in progress' for longer than usual. No incorrect grades are surfaced. Jobs complete once provider recovers.
• Recovery: Retry queue drains automatically. No manual intervention unless queue depth exceeds 500 (triggers escalation)."

This is what makes a doc genuinely postmortem-ready rather than postmortem-shaped. If you can't narrate the failure, you haven't designed for it.`;

// ============================================================
// 9. Idempotency and Replay
// ============================================================
export const S9_HEADING = "9. Idempotency and Replay";
export const S9_BULLETS = [
  "job_id hashing",
  "Safe retries",
  "Deduplication",
  "Audit replay",
  "Partial recomputation",
  "Same inputs → same outputs (or variance documented)",
];
export const S9_GUIDANCE =
  "Idempotency is the hardest guarantee to maintain in practice. Be specific about where idempotency is enforced — at the API layer? The job processor? The database? State what happens if the same request arrives twice simultaneously (not just sequentially). For replay, describe who triggers it (operator? automated recovery? user?) and what the blast radius of a replay is. If replaying job X can affect job Y's output, that's a coupling you need to name.";

// ============================================================
// 10. Observability
// ============================================================
export const S10_HEADING = "10. Observability";
export const S10_SUB1_HEADING = "Minimum Viable Observability";
export const S10_SUB1_BULLETS = [
  "Request/job ID exists on every log line",
  "Logs answer: what happened, where, why",
  "Latency + retry counts per stage",
];
export const S10_SUB2_HEADING = "On-Call Runbook Hooks";
export const S10_SUB2_BODY = "For each known alert, provide a stub:";
export const S10_SUB2_BULLETS = [
  "When alert X fires → check Y → escalation path Z",
  "Link to dashboards, log queries, and rollback procedures",
];
export const S10_GUIDANCE =
  'The test for observability is: "A new on-call engineer who has never seen this system gets paged at 3 a.m. Can they diagnose the problem using only the logs, metrics, and runbooks you\'ve provided, without Slacking you?" If the answer is no, your observability isn\'t done. Name the specific dashboards. Write the specific log queries. The runbook should be copy-pasteable, not conceptual.';

// ============================================================
// 11. Verification Strategy
// ============================================================
export const S11_HEADING = "11. Verification Strategy";
export const S11_BODY = "How correctness is proven, not assumed:";
export const S11_BULLETS = [
  { bold: "Unit tests", rest: ": core logic, edge cases" },
  { bold: "Contract tests", rest: ": validate interface agreements with consumers" },
  { bold: "Integration tests", rest: ": end-to-end with real (or realistic) dependencies" },
  { bold: "Load tests", rest: ": behavior at expected and 10x scale" },
  { bold: "Failure injection", rest: ": what happens when dependencies die mid-request" },
  { bold: "Confidence mapping", rest: ": what does each layer of testing actually guarantee" },
];
export const S11_GUIDANCE =
  'Be honest about what\'s not tested and why. Every system has a gap between "what we test" and "what we believe works." Name that gap explicitly. A principal engineer doesn\'t pretend test coverage equals correctness — they state: "This test suite gives me confidence that X and Y work. I do not have confidence in Z, and here\'s my plan to close that gap (or my argument for why the risk is acceptable)."';

// ============================================================
// 12. Dependency Map and Failure Blast Radius
// ============================================================
export const S12_HEADING = "12. Dependency Map and Failure Blast Radius";
export const S12_SUB1_HEADING = "Dependency Inventory";
export const S12_SUB1_GUIDANCE =
  'This table should be exhaustive. If it calls the network, it\'s in the table. Include internal services, not just third-party APIs. For each dependency, the circuit breaker and fallback columns should map to actual code paths, not aspirations. If you write "cached result" as a fallback, show where the cache is populated and what staleness is acceptable.';
export const S12_TABLE_HEADERS = [
  "Dependency",
  "Failure Mode",
  "Fallback",
  "SLA Expectation",
  "Circuit Breaker",
];
export const S12_TABLE_DEFAULTS = [
  {
    dependency: "e.g. OpenAI API",
    failureMode: "429 / timeout",
    fallback: "Queue + retry with backoff",
    sla: "p99 < 5s",
    circuitBreaker: "Trip after 5 failures in 30s",
  },
  {
    dependency: "e.g. PostgreSQL",
    failureMode: "Connection refused",
    fallback: "Read replica / cached result",
    sla: "99.99% uptime",
    circuitBreaker: "Health check + failover",
  },
];
export const S12_SUB2_HEADING = "Resource Use Controls";
export const S12_SUB2_BULLETS = [
  "Never tie user request lifetime to long-running compute",
  "Every external dependency has a timeout",
  "Timeouts cancel downstream work",
  "No orphaned background tasks",
];

// ============================================================
// 13. Security and Access Control
// ============================================================
export const S13_HEADING = "13. Security and Access Control";
export const S13_SUB1_HEADING = "Security Awareness";
export const S13_SUB1_BULLETS = [
  "Secrets not in code",
  "Sensitive data not logged",
  "Inputs validated at the boundary",
];
export const S13_SUB2_HEADING = "Authorization Model";
export const S13_SUB2_BULLETS = [
  { bold: "Who can read / write / admin", rest: " — define roles" },
  { bold: "Tenant isolation strategy", rest: ": how is data separated between users/orgs" },
  { bold: "Audit trail", rest: ": all privileged actions are logged and traceable" },
];
export const S13_GUIDANCE =
  "Think adversarially. If a malicious user has a valid auth token, what's the worst they can do? If an internal engineer has database access, what sensitive data can they see? The authorization model should prevent lateral movement — a user in tenant A should not be able to construct a request that touches tenant B's data, even by manipulating IDs. State whether isolation is enforced at the application layer, the database layer, or both, and what happens if the application-layer check has a bug.";

// ============================================================
// 14. Backpressure and Cost Containment
// ============================================================
export const S14_HEADING = "14. Backpressure and Cost Containment";
export const S14_SUB1_HEADING = "Backpressure Awareness";
export const S14_SUB1_BULLETS = [
  "Retry isolation",
  "Failure compartmentalization",
  "Queue-based scaling",
];
export const S14_SUB2_HEADING = "Cost Model";
export const S14_SUB2_GUIDANCE =
  'Cost is a failure mode. Treat it like one. The 100x row shouldn\'t be "we\'ll figure it out" — it should name the specific architectural change required. If you don\'t know the cost curve, run the numbers before publishing this doc. "I don\'t know" in this row is a risk you\'re asking the org to accept; make sure they know they\'re accepting it.';
export const S14_TABLE_HEADERS = ["Scale", "Estimated Cost", "Non-linear Risk"];
export const S14_TABLE_DEFAULTS = [
  { scale: "1x (current)", cost: "$", risk: "—" },
  { scale: "10x", cost: "$", risk: "e.g. LLM token costs dominate" },
  { scale: "100x", cost: "$", risk: "e.g. need to re-architect storage" },
];

// ============================================================
// 15. Organizational Context
// ============================================================
export const S15_HEADING = "15. Organizational Context";
export const S15_GUIDANCE =
  "Principal engineers design for organizations, not just systems. This section is where you show that awareness. A system that works technically but creates operational chaos across teams is not well-designed.";
export const S15_SUB1_HEADING = "Ownership and Team Boundaries";
export const S15_SUB1_BULLETS = [
  "Who owns this system day-to-day? Name the team, not just a role.",
  "Who gets paged? What's the escalation path?",
  "Who approves changes to the interface contracts? Is it the owning team unilaterally, or is there a cross-team review?",
];
export const S15_SUB2_HEADING = "Cross-Team Coordination";
export const S15_SUB2_BULLETS = [
  "What happens when Team A's deploy breaks Team B's assumptions?",
  "Are there shared resources (databases, queues, API rate limits) that require coordination?",
  "What's the communication protocol for breaking changes? (RFC? Slack channel? Migration window?)",
];
export const S15_SUB3_HEADING = "On-Call Handoff";
export const S15_SUB3_BULLETS = [
  "What does a new on-call engineer need to know about this system that isn't in the runbook?",
  'Where\'s the "start here" document?',
  'What\'s the "I have no idea what\'s happening" escalation path?',
];

// ============================================================
// Intentional Tradeoffs
// ============================================================
export const TRADEOFFS_HEADING = "Intentional Tradeoffs";
export const TRADEOFFS_ITEMS = [
  { bold: "Constrain scope deliberately", rest: " and communicate it", sub: [] as string[] },
  {
    bold: "Communicate tradeoffs rigorously",
    rest: ":",
    sub: [
      "What I optimized for",
      "What I sacrificed",
      "Why this is acceptable for now",
    ],
  },
  {
    bold: "Saturation behavior / resource constraints",
    rest: ":",
    sub: ["Queue work", "Reject early", "Degrade", "Shed non-critical work"],
  },
];
export const TRADEOFFS_QUOTE =
  "Require hard bounds being known: concurrency, memory, payload, time.";
export const TRADEOFFS_GUIDANCE =
  'Every tradeoff should have a reversal trigger — a specific, measurable condition under which the tradeoff becomes unacceptable. "We chose eventual consistency for analytics" is good. "We chose eventual consistency for analytics; this becomes unacceptable if users report stale data more than twice per quarter, at which point we implement change-data-capture from the primary" is principal-level. Tradeoffs without reversal triggers become permanent technical debt.';

// ============================================================
// Risk Synthesis
// ============================================================
export const RISK_HEADING = "Risk Synthesis";
export const RISK_GUIDANCE =
  "This section is the principal-engineer differentiator. Every section above identifies risks locally. This section synthesizes them into a ranked, honest assessment. If a VP reads only one section of this doc, it should be this one.";
export const RISK_SUB_HEADING = "Top 3 Ways This System Fails in Production";
export const RISK_TABLE_HEADERS = [
  "Rank",
  "Risk",
  "Likelihood",
  "Severity",
  "Mitigation",
  "Confidence in Mitigation",
];
export const RISK_FOOTNOTE =
  "For each risk, state your confidence level in the mitigation: high, medium, low. If it's low, say what would make it high and what that costs. This is the section where intellectual honesty matters more than polish.";

// ============================================================
// Known Limitations
// ============================================================
export const LIMITATIONS_HEADING = "Known Limitations";
export const LIMITATIONS_ITEMS = [
  { bold: "What I refuse to support in this version", rest: " — non-goals are explicitly listed" },
  { bold: "Name the mistakes that can and will happen", rest: "" },
  { bold: "State exactly when this design stops being sufficient", rest: "" },
  { bold: "What is the dominating failure mode", rest: "" },
];
export const LIMITATIONS_QUOTE =
  "If I can't debug it at 3 a.m., it's not production-grade.";
export const LIMITATIONS_GUIDANCE =
  'The best limitation sections are predictive, not just descriptive. Don\'t just say "we don\'t support multi-region." Say: "We don\'t support multi-region. This becomes a problem when we exceed 10k concurrent users in non-US regions, which based on current growth we expect in Q3 2026. The migration path is X, estimated at Y weeks of work." A principal engineer doesn\'t just know the limits — they know the timeline of the limits.';

// ============================================================
// Decision Log
// ============================================================
export const DECISIONS_HEADING = "Decision Log";
export const DECISIONS_GUIDANCE =
  "This is the most valuable section for future engineers. The table is an index — but for every non-obvious decision, write a paragraph of narrative reasoning. The goal: a future engineer who disagrees with your decision can tell exactly where their assumptions diverge from yours. If they can't, your explanation isn't precise enough. Include what you almost chose and the specific concern that tipped you away from it.";
export const DECISIONS_TABLE_HEADERS = [
  "Decision",
  "Alternatives Considered",
  "Why This One",
  "Revisit When",
];
export const DECISIONS_TABLE_DEFAULTS = [
  {
    decision: "e.g. PostgreSQL over DynamoDB",
    alternatives: "DynamoDB, SQLite",
    why: "Need complex queries + joins; team expertise",
    revisit: "> 50k writes/sec",
  },
  {
    decision: "e.g. Polling over WebSockets",
    alternatives: "WebSockets, SSE",
    why: "Simpler ops; latency tolerance is 5s",
    revisit: "Real-time requirement emerges",
  },
];
export const DECISIONS_NARRATIVES_HEADING = "Decision Narratives";
export const DECISIONS_NARRATIVES_BODY =
  "(For each non-trivial decision above, expand the reasoning here.)";

// ============================================================
// Rollout Plan
// ============================================================
export const ROLLOUT_HEADING = "Rollout Plan";
export const ROLLOUT_GUIDANCE =
  'Deployment is design. If your rollout plan is "merge to main and deploy," you haven\'t designed the rollout. A principal engineer treats the rollout as a state machine just like the system itself — with stages, validation gates, and rollback transitions. The question isn\'t "can we deploy this" — it\'s "can we un-deploy this at any point in the rollout without data loss or user impact?"';
export const ROLLOUT_SUB1_HEADING = "Deployment Strategy";
export const ROLLOUT_SUB1_BULLETS = [
  "Feature flags? Canary? Shadow traffic? Blue-green?",
  "What percentage of traffic hits new code first",
  "Validation criteria at each stage before proceeding",
];
export const ROLLOUT_SUB2_HEADING = "Rollback";
export const ROLLOUT_SUB2_BULLETS = [
  { bold: "Rollback triggers", rest: ": what metrics or alerts trigger a rollback" },
  { bold: "Rollback procedure", rest: ": automated or manual, time to execute" },
  { bold: "Data rollback", rest: ": can state be unwound, or is it forward-only" },
];
export const ROLLOUT_SUB3_HEADING = "Migration from Current State";
export const ROLLOUT_SUB3_BULLETS = [
  "How do we get from here to there without downtime",
  "Validation criteria for each stage of rollout",
];

// ============================================================
// If I Had 2 More Weeks
// ============================================================
export const TWOWEEKS_HEADING = "If I Had 2 More Weeks";
export const TWOWEEKS_ITEMS = [
  {
    bold: "Name the next architecture step",
    rest: "",
    metrics: [
      "grading_latency_seconds",
      "ocr_latency_seconds",
      "llm_latency_seconds",
      "job_queue_depth",
      "job_failure_rate",
      "retry_rate",
      "partial_completion_rate",
    ],
    sub: [] as string[],
  },
  { bold: "Reproducibility builds trust", rest: ": tag a frozen snapshot", sub: [] as string[], metrics: [] as string[] },
  { bold: "Tagging checklist", rest: ": coherent system, no debug junk", sub: [] as string[], metrics: [] as string[] },
  {
    bold: "Build product decision dashboards",
    rest: ":",
    sub: ["Can we sell this?", "Can we scale this?", "Where are we bleeding money?"],
    metrics: [] as string[],
  },
  { bold: "One golden example exists", rest: "", sub: [] as string[], metrics: [] as string[] },
];
export const TWOWEEKS_GUIDANCE =
  'This section should make your manager uncomfortable in a productive way. It should be clear that you know what\'s missing and you\'ve chosen not to do it yet because of time constraints, not ignorance. If someone reads this section and thinks "we should give them two more weeks," you\'ve written it well.';
