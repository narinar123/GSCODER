# GSQoderAI Change Report

## Completed
- Audited the current Vite/React application and documented production blockers in `AUDIT_REPORT.md`.
- Updated the Supabase client to accept the connected project's `NEXT_PUBLIC_SUPABASE_URL` and publishable/anon key variables while preserving Vite-compatible variables.
- Updated auth configuration detection to use the same production environment variables, preventing a configured Supabase project from being incorrectly treated as demo/offline mode.
- Preserved safe placeholder behavior when no public Supabase configuration is available; no secret/service-role key is exposed to the browser.
- Existing marketing, login, activation, PWA, Electron metadata, and protected `/app` route remain intact.

## Not falsely claimed
Automated UPI verification, Razorpay, phone OTP, Google auth, CMS, Airtable, vector search, Excel/Google Sheets, mobile builds, Coolify, DNS, role enforcement, and dynamic dashboard CRUD require backend schema/API work and credentials that were not available for safe implementation in this client-only repository.

## Required deployment configuration
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` for the auth callback flow
- A server-side payment provider secret and webhook configuration for real payment entitlements

Never place service-role keys or payment secrets in `NEXT_PUBLIC_*` variables.
