# THE GAWD DOC

## README

This structure is a hybrid of:
- **PRD** (product intent)
- **ADR** (architectural decision record)
- **SRE error-budget thinking**
- **Postmortem-readiness**

### Staff Eng Priority Order
1. Correctness + auditability
2. System stability
3. Operational debuggability
4. Throughput
5. Latency

> Staff eng. never produces work where the reviewer feels "I need to stay involved."

> The GAWD DOC forces bounded design, failure semantics, and organizational alignment — not just "clean architecture."

---

## 1. Design Goals

### 1.1 Why This Exists
Explain in one sentence where this fits in a system. Frame the problem using **events and guarantees**.

> *Example: Build a fault-tolerant grading pipeline that:*
> - *Never silently corrupts grades*
> - *Never overloads external APIs*
> - *Degrades gracefully under load*
> - *Supports replay, audit, and recovery*

### 1.2 This Version
Describe the problem, inputs, non-goals, possible mistakes, and metrics for the current iteration.

### 1.3 SLA / SLO Targets
Define concrete, measurable targets for this system. Error-budget thinking means nothing without numbers.

| Metric | Target |
|---|---|
| p99 latency | e.g. < 30s |
| Job success rate | e.g. > 99.5% |
| Time to recovery | e.g. < 15 min |
| Data correctness | e.g. 100% (zero silent corruption) |

---

## 2. Inputs and Bounds

Enforce limits **before** work begins.

- Size, count, rate — all bounded
- Ordering assumptions are **explicit**

---

## 3. Units of Work

Units of work are named: `request`, `batch`, `page`, `student`, `job`, etc.

All parallelism is expressed using this unit.

---

## 4. Lifecycle and State Transitions

Define a clear lifecycle:

```
created → validated → processing → completed | failed
```

### Failure Semantics
For each failure:
- What **continues**
- What **stops**
- What **retries**
- What **state is left behind**

---

## 5. Data Model and State Management

- **Entities**: what's stored and why
- **Storage engine choices**: and why this one over alternatives
- **Consistency model**: eventual? strong? per-entity?
- **Retention / TTL**: when does data expire or get archived
- **Migration path**: how does the schema evolve without downtime

---

## 6. Outputs

Outputs are versioned and well-defined.

- Name **who depends on it** (user? internal service? admin?)
- Isolation + org flow + blast radius control

---

## 7. Interface Contracts

- **Endpoint signatures / event schemas / message formats**
- **Versioning strategy**: semver? additive-only?
- **Backward compatibility guarantees**
- **Contract ownership**: who owns the contract, who is notified on change

---

## 8. What Bad Outcome Matters Most

Rank the failure modes that keep you up at night:
- Latency spike
- OOM
- Cost blowup
- Wrong result
- Data loss
- Silent corruption

---

## 9. Idempotency and Replay

- `job_id` hashing
- Safe retries
- Deduplication
- Audit replay
- Partial recomputation
- **Same inputs → same outputs** (or variance documented)

---

## 10. Observability

### Minimum Viable Observability
- Request/job ID exists on every log line
- Logs answer: **what happened, where, why**
- Latency + retry counts **per stage**

### On-Call Runbook Hooks
For each known alert, provide a stub:
- When alert X fires → check Y → escalation path Z
- Link to dashboards, log queries, and rollback procedures

---

## 11. Verification Strategy

How correctness is proven, not assumed:

- **Unit tests**: core logic, edge cases
- **Contract tests**: validate interface agreements with consumers
- **Integration tests**: end-to-end with real (or realistic) dependencies
- **Load tests**: behavior at expected and 10x scale
- **Failure injection**: what happens when dependencies die mid-request
- **Confidence mapping**: what does each layer of testing actually guarantee

---

## 12. Dependency Map and Failure Blast Radius

### Dependency Inventory
For **every** external dependency:

| Dependency | Failure Mode | Fallback | SLA Expectation | Circuit Breaker |
|---|---|---|---|---|
| e.g. OpenAI API | 429 / timeout | Queue + retry with backoff | p99 < 5s | Trip after 5 failures in 30s |
| e.g. PostgreSQL | Connection refused | Read replica / cached result | 99.99% uptime | Health check + failover |

### Resource Use Controls
- Never tie user request lifetime to long-running compute
- Every external dependency has a **timeout**
- Timeouts **cancel downstream work**
- No orphaned background tasks

---

## 13. Security and Access Control

### Security Awareness
- Secrets not in code
- Sensitive data not logged
- Inputs validated at the boundary

### Authorization Model
- **Who can read / write / admin** — define roles
- **Tenant isolation strategy**: how is data separated between users/orgs
- **Audit trail**: all privileged actions are logged and traceable

---

## 14. Backpressure and Cost Containment

### Backpressure Awareness
- Retry isolation
- Failure compartmentalization
- Queue-based scaling

### Cost Model
Estimate cost at different scales:

| Scale | Estimated Cost | Non-linear Risk |
|---|---|---|
| 1x (current) | $ | — |
| 10x | $ | e.g. LLM token costs dominate |
| 100x | $ | e.g. need to re-architect storage |

Where does cost grow non-linearly? Name it.

---

## Intentional Tradeoffs

1. **Constrain scope deliberately** and communicate it
2. **Communicate tradeoffs rigorously**:
   - What I optimized for
   - What I sacrificed
   - Why this is acceptable *for now*
3. **Saturation behavior / resource constraints**:
   - Queue work
   - Reject early
   - Degrade
   - Shed non-critical work

> Require hard bounds being known: concurrency, memory, payload, time.

---

## Known Limitations

1. **What I refuse to support in this version** — non-goals are explicitly listed
2. **Name the mistakes that can and will happen**
3. **State exactly when this design stops being sufficient**
4. **What is the dominating failure mode**

> If I can't debug it at 3 a.m., it's not production-grade.

---

## Decision Log

Decisions made and alternatives rejected. This is the ADR core.

| Decision | Alternatives Considered | Why This One | Revisit When |
|---|---|---|---|
| e.g. PostgreSQL over DynamoDB | DynamoDB, SQLite | Need complex queries + joins; team expertise | > 50k writes/sec |
| e.g. Polling over WebSockets | WebSockets, SSE | Simpler ops; latency tolerance is 5s | Real-time requirement emerges |

---

## Rollout Plan

### Deployment Strategy
- Feature flags? Canary? Shadow traffic? Blue-green?
- What percentage of traffic hits new code first

### Rollback
- **Rollback triggers**: what metrics or alerts trigger a rollback
- **Rollback procedure**: automated or manual, time to execute
- **Data rollback**: can state be unwound, or is it forward-only

### Migration from Current State
- How do we get from here to there without downtime
- Validation criteria for each stage of rollout

---

## If I Had 2 More Weeks

1. **Name the next architecture step**
   - Metrics that must exist:
     - `grading_latency_seconds`
     - `ocr_latency_seconds`
     - `llm_latency_seconds`
     - `job_queue_depth`
     - `job_failure_rate`
     - `retry_rate`
     - `partial_completion_rate`

2. **Reproducibility builds trust**: tag a frozen snapshot

3. **Tagging checklist**: coherent system, no debug junk

4. **Build product decision dashboards**:
   - Can we sell this?
   - Can we scale this?
   - Where are we bleeding money?

5. **One golden example exists**
