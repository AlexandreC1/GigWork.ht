# GigWork.ht production readiness plan

GigWork.ht is a Haiti-first services marketplace for customers, verified workers, and platform operators. This repo now ships a production-shaped Vite React frontend with multilingual UX, role-aware navigation, service marketplace flows, stats, security posture, and a Play Store release path.

## Current product surface

- Fresh app UI with Haiti-first service data and mobile-responsive layouts.
- Multilingual copy for Haitian Creole, English, French, and Spanish.
- Demo auth with persisted sessions and explicit role permissions for customer, worker, and admin.
- Marketplace search, category filters, saved services, booking/detail compatibility, stats, security, and Play Store planning pages.
- Bundled Vite entrypoint instead of browser import maps or CDN React.

## Production backend path

Use Supabase for the first production backend because it covers auth, Postgres, RLS, storage, realtime messaging, and edge functions without creating a large custom backend too early.

### Core tables

- `profiles`: id, role, name, phone, city, avatar_url, verification_status, moncash_id, created_at.
- `worker_profiles`: profile_id, skills, availability, service_radius_km, rating_avg, review_count.
- `gigs`: id, worker_id, title, category, description, price, currency, city, status, image_urls, created_at.
- `bookings`: id, gig_id, customer_id, worker_id, status, scheduled_for, total, payment_status, created_at.
- `messages`: id, booking_id, sender_id, body, attachment_url, created_at, read_at.
- `reviews`: id, booking_id, gig_id, reviewer_id, rating, comment, image_url, created_at.
- `payments`: id, booking_id, provider, provider_reference, amount, currency, status, webhook_verified_at.
- `favorites`: customer_id, gig_id, created_at.
- `audit_logs`: actor_id, action, entity_type, entity_id, metadata, ip_hash, created_at.
- `device_sessions`: profile_id, device_hash, last_seen_at, risk_score.

### Authorization rules

- Public users can read active gigs and public worker profile fields.
- Customers can create bookings, read their own bookings/messages/payments, and write reviews for completed bookings.
- Workers can create and update their own gigs, read bookings assigned to them, and message customers for those bookings.
- Admins can read aggregate stats, verification queues, abuse queues, and audit logs.
- Every user-owned table must have row-level security enabled before launch.

## Security checklist

- Use Supabase Auth with email/phone verification and optional MFA for admins.
- Store secrets only in deployment environment variables.
- Validate MonCash/payment webhooks with signatures and idempotency keys.
- Apply rate limits to login, booking creation, message sending, review posting, and AI endpoints.
- Add audit logging for profile, gig, booking, payment, and admin actions.
- Add content moderation for listings, reviews, profile photos, and messages.
- Set CSP, HSTS, Referrer-Policy, Permissions-Policy, and secure cookies where applicable.
- Add Sentry or equivalent for error monitoring and privacy-safe diagnostics.

## Networking and offline plan

- Use optimistic UI for save, message, and booking actions.
- Queue booking/message writes when the client is temporarily offline.
- Compress images before upload and serve them through a CDN.
- Cache public gig lists and user bookings for fast mobile reads.
- Use webhook retries with idempotency for payments and notifications.
- Add push notifications for booking status, messages, payment confirmation, and dispute updates.

## Play Store path

1. Ship the web app with HTTPS and production environment variables.
2. Add a web app manifest, icons, offline fallback, and service worker.
3. Install Capacitor and Android support.
4. Configure package id `com.gigwork.ht`, app name `GigWork.ht`, splash/icon assets, and deep links.
5. Generate signed Android App Bundle in Android Studio.
6. Prepare privacy policy, Play Data Safety form, screenshots, feature graphic, and staged rollout.
7. Add crash reporting and monitor first production cohorts before broad rollout.

Commands once mobile dependencies are approved:

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android vite-plugin-pwa
npx cap init GigWork.ht com.gigwork.ht --web-dir=dist
npm run build
npx cap add android
npx cap sync android
npx cap open android
```
