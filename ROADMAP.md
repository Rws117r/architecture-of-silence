# ARCHITECTURE OF SILENCE // ARCHIVAL ROADMAP

## IN-PROGRESS // RESEARCH PIPELINE REFINEMENTS

### [ ] DEEP PERSISTENCE (V2)
**Objective**: Transition from local browser storage to a shared database.
- Integrate **Supabase** or **Firebase** for cross-session and cross-user data synchronization.
- Enable therapeutic submissions from external clinicians (Therapist role) to appear live in the patient's pipeline.

### [ ] CLINICAL PRIVACY LAYER
**Objective**: Architecture for HIPAA compliance.
- Implement encrypted transport for all diagnostic logs.
- Assess "Clinical Only" permission levels for therapeutic comments versus public paper submissions.
- Ensure public-facing research summaries do not contain PII (Personally Identifiable Information).

### [ ] SOURCE VALIDATION
**Objective**: Metadata enrichment.
- Implement a backend lookup (Crossref / DOI API) for research link submissions.
- Automatically fetch abstracts, publication years, and journal metadata to ensure archival integrity.

---
*Created 2026-04-05 // Archival System Revision 1.8*
