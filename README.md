# Secure Content Portal

A full-stack internship assignment implementation based on the supplied brief.

## Stack
- Next.js + React
- Supabase Auth (Google OAuth)
- Supabase Postgres
- Supabase private Storage
- Signed URLs for protected content

## Setup
1. Create a Supabase project.
2. In Authentication -> Providers, enable Google and configure the OAuth redirect URL.
3. Run `supabase.sql` in Supabase SQL Editor.
4. Create `.env.local` from `.env.example` and add your Supabase URL and anon key.
5. Run `npm install` then `npm run dev`.
6. Sign in once with Google. In Supabase SQL, promote the test account to ADMIN using the commented SQL.

## Security decisions
- Google OAuth only; no password form.
- Supabase Auth stores the session in secure cookies through the SSR client.
- New users default to VIEWER.
- Database RLS enforces viewer/admin permissions server-side.
- Storage bucket is private; no permanent public file URL is used.
- Viewer pages request short-lived signed URLs (60 seconds).
- Uploads are restricted to MP4/PDF/HTML and 100 MB in the UI.
- HTML is rendered in a sandboxed iframe.
- PDF is embedded without the normal toolbar where the browser honors the fragment.
- Video uses `controlsList="nodownload"` as a deterrent; this is not a DRM boundary.

## Important limitation
No browser application can guarantee that a human cannot copy content (for example, screenshots or screen recording). The implementation prevents trivial permanent public-file access and uses authorization/private storage. Stronger protection could use proxy/range streaming, HLS, watermarking or DRM with more time.

## Assignment deliverables
Deploy the app on a free-tier provider, submit the GitHub repository and live URL, and keep this README updated with deployment details.
