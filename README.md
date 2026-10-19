# Persync

Persync is an AI-assisted business direction tool for people in Indonesia who are exploring a micro-business, side hustle, or an early business direction.

It starts with the user's actual constraints: available capital, time, skills, work preferences, sales confidence, market familiarity, and income goals. The output is intended to help narrow the next realistic experiment. It is not a guarantee of income, profit, or business success, and it is not a substitute for professional legal, tax, financial, or other advice.

Production site: [https://persync.ai.id](https://persync.ai.id)

## Project overview

Many business idea lists are too broad to be useful. Persync is designed to make the first decision smaller and more practical by connecting a user's resources and constraints with a possible business direction.

The current product is most relevant to students, fresh graduates, full-time employees, freelancers, people starting to sell, and others testing a small business with limited time or capital.

Persync does not authenticate users, maintain user accounts, verify market demand, or operate a business on the user's behalf. Its recommendations are AI-generated starting points that still need to be checked against real customers, costs, regulations, and the user's own circumstances.

## Features

The current application provides:

- A business profile form covering current situation, main goal, capital range, time availability, preferred work style, sales confidence, target income, market familiarity, and selected skills or interests.
- A list of skill and interest categories, including programming, design, marketing, sales, content, e-commerce, teaching, food and beverage, and other areas.
- A two-step AI analysis that first evaluates the user's commercial profile and execution constraints, then produces business guidance.
- A result containing a primary business direction, alternatives, fit reasoning, SWOT analysis, first-money path, initial validation steps, concrete action steps, and risks.
- A visible thinking state while the analysis is being generated.
- Browser-based analysis history with date grouping, individual deletion, full deletion through browser site-data controls, and a short undo window after deletion.
- A signed daily usage cookie limiting the free service to three successful analysis requests per browser cookie scope per day.
- Public About, Terms of Service, Privacy Policy, robots, and sitemap pages.

## Tech stack and architecture

- Next.js 15.5 with the App Router and React 19.
- JavaScript with ES modules. The repository does not currently use TypeScript.
- Tailwind CSS 4 through the Tailwind PostCSS plugin.
- Google Gemini through `@google/genai`.
- Vercel-oriented serverless deployment.
- No application database.
- No login, account system, or authentication flow.

### Request flow

1. The browser validates the required form fields and sends the analysis input to `POST /api/generate`.
2. The server validates the request again and checks the signed `persync_daily_quota` HttpOnly cookie.
3. The server sends the input to Gemini for the first analysis step.
4. The first result and the original input are used to construct a second Gemini request for business guidance.
5. The server returns the generated session to the browser and updates the signed quota cookie.
6. The browser saves the returned session in `localStorage` and uses the generated session ID for the result route `/chat/[id]`.

The API route is configured with a maximum duration of 60 seconds for the Vercel function. Gemini requests can retry transient provider failures using the configured retry settings described below.

### Storage and authentication

The application has no server-side session database. Analysis history is stored in the browser under the `persync_sessions_history` localStorage key. The stored session includes the submitted profile fields, generated result, session ID, and timestamps.

The application has no user login. The daily usage limit is not tied to a person or verified identity. It is based on a signed cookie in the browser, so a different browser or device can have a separate quota state. Clearing cookies or site data can also affect the local quota state.

## Getting started

### Prerequisites

- Node.js and npm versions compatible with Next.js 15.
- A Google AI Studio API key with access to the configured Gemini model.

### Install dependencies

From the repository root:

```bash
npm ci
```

Use `npm install` if you intentionally need to update the lockfile while working on dependencies.

### Configure local environment variables

Copy the example file and edit the local copy:

```bash
cp .env.example .env.local
```

Never commit `.env.local` or place secrets in variables prefixed with `NEXT_PUBLIC_`.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build and run production locally

```bash
npm run build
npm run start
```

The production server uses port 3000 through the repository script.

## Environment variables

| Variable | Required | Purpose | Default or guidance |
| --- | --- | --- | --- |
| `GEMINI_API_KEY` | Yes | Server-side credential used by `@google/genai` to call Gemini. | Create it in [Google AI Studio](https://aistudio.google.com/). Do not expose it to the browser. |
| `GEMINI_MODEL` | No | Gemini model name passed to the API. | `gemini-2.5-flash` |
| `GEMINI_RETRY_ATTEMPTS` | No | Number of retries after a retryable Gemini failure. | `2`, resulting in up to three total attempts. |
| `GEMINI_RETRY_BASE_DELAY_MS` | No | Base delay in milliseconds between retry attempts. | `1200`; the delay increases with the attempt number. |
| `QUOTA_SECRET` | Yes | Secret used to create and verify the HMAC-SHA256 daily quota cookie. | Use a long, randomly generated value. |
| `JWT_SECRET` | No | Legacy fallback accepted by the quota module when `QUOTA_SECRET` is absent. | Prefer `QUOTA_SECRET`; do not rely on the fallback for a new deployment. |

The repository's `.env.example` contains the primary variables and placeholder values only. `NODE_ENV` is managed by the runtime. `NEXT_PUBLIC_APP_URL` is not used by the current application.

Example variable names without real values:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
QUOTA_SECRET=your_long_random_secret_here
```

## Deployment

The repository is configured for Vercel through `vercel.json`. The project should be deployed from the repository root, where `package.json` and the `app` directory are located.

1. Import the repository into Vercel.
2. Use the Next.js framework preset and the default build command, `npm run build`.
3. Add `GEMINI_API_KEY` and `QUOTA_SECRET` to the Vercel Production environment. Add optional Gemini settings only if you need to override their defaults.
4. Deploy and attach the production domain `persync.ai.id` in Vercel.
5. Confirm HTTPS is active and configure any required redirect from an older or preview domain to `https://persync.ai.id` outside the application code.
6. Check the public pages and generated metadata after deployment:

   - `https://persync.ai.id/`
   - `https://persync.ai.id/about`
   - `https://persync.ai.id/terms`
   - `https://persync.ai.id/privacy`
   - `https://persync.ai.id/robots.txt`
   - `https://persync.ai.id/sitemap.xml`

7. Run one controlled analysis using non-sensitive test information and confirm that the Gemini request, quota cookie, result page, and local browser history work as expected.

Do not put API keys, quota secrets, or private user data into public environment variables, source code, screenshots, issue reports, or deployment logs.

## Privacy and data handling

The authoritative user-facing documents are the [Privacy Policy](https://persync.ai.id/privacy) and [Terms of Service](https://persync.ai.id/terms). The summary below describes the current implementation and does not replace those documents.

### Information submitted

The analysis form sends information about the user's work situation, goal, skills and interests, capital range, time availability, preferred work style, sales confidence, target income, and market familiarity. Users should not submit identity numbers, health data, another person's personal data, trade secrets, or sensitive financial information unless it is genuinely necessary.

### Server and Gemini processing

The form input is sent to the Persync backend at `/api/generate`. It does not remain only on the device. The backend sends the input to Google Gemini in two sequential generation requests to produce the analysis and guidance. The Gemini API is a third-party service, so its processing and retention are also subject to Google's applicable terms and policies.

The application does not write analysis sessions to an application database. The API response contains the session and result, which the browser then stores locally.

### Browser storage

The browser stores the returned analysis history in localStorage under `persync_sessions_history`. It remains there until the user deletes entries, clears site data, or the browser removes it. The application provides per-session deletion and a short undo period. Users of shared devices should clear browser data and avoid storing sensitive information in the form.

### Quota cookie

The server sets an HttpOnly cookie named `persync_daily_quota`. Its signed payload records the current date and usage count. It does not contain the form input or analysis result. The cookie is configured for a 24-hour lifetime, `SameSite=Lax`, and `Secure` in production. The date calculation follows the `Asia/Jakarta` timezone.

### Logs and third-party services

The code records server errors and retry-related Gemini request metadata through `console.error` and `console.warn`. Hosting-provider logs may therefore contain operational error information. The repository does not show an analytics, advertising, or additional tracking integration. Retention by Vercel, Google, or other providers is controlled by their respective services and is not specified by this application code.

## Security and usage limits

- The Gemini API key is read only on the server from `GEMINI_API_KEY`.
- The API validates required string fields and requires at least one selected skill or interest before running the analysis.
- The quota cookie is signed with HMAC-SHA256 and verified server-side using `QUOTA_SECRET`.
- The quota is three analysis requests per cookie scope per day. It is not an account-level or identity-level abuse prevention system.
- Invalid or tampered quota cookies fall back to the default quota state. Browser changes, cookie deletion, multiple devices, and other client-side conditions can affect the observed quota.
- Transient Gemini failures may be retried. Other failures are returned as an error response, and the user may need to try again.

These controls reduce accidental or basic misuse. They do not provide absolute security, identity verification, or guaranteed abuse prevention.

## AI limitations

Persync output is generated by an external AI model from the information supplied by the user. It may be inaccurate, incomplete, overly general, inconsistent, or unsuitable for a particular market or personal situation. It may also become less relevant as prices, customer behavior, regulations, or market conditions change.

Before acting on a recommendation, verify customer demand, costs, operating requirements, applicable rules, and the risks of the decision. Persync does not guarantee revenue, profit, funding, employment, or business success.

## Legal and disclaimer

Persync provides information and decision support for business exploration. It is not a financial institution, investment service, legal adviser, tax adviser, or substitute for another professional service that the user's situation may require.

Use of the service is governed by the [Terms of Service](https://persync.ai.id/terms). Information handling is explained in the [Privacy Policy](https://persync.ai.id/privacy). No company name, legal entity, registration number, office address, certification, or regulatory compliance claim is stated here because those details are not available in the repository.

## Scripts and maintenance

The scripts currently defined in `package.json` are:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Starts the Next.js development server on port 3000. |
| `npm run build` | Creates the optimized production build and runs Next.js build validation. |
| `npm run start` | Starts the built application on port 3000. |
| `npm run lint` | Runs ESLint across the repository. |

There is currently no `npm test` script and no `npm run typecheck` script. The application is JavaScript-based, and `npm run build` performs the type-validity checks provided by the configured Next.js build process.

For routine maintenance:

1. Install from the lockfile with `npm ci`.
2. Run `npm run lint` and `npm run build` before deployment.
3. Review dependency updates deliberately and regenerate `package-lock.json` when dependencies change.
4. Keep `.env.local` out of version control and rotate the Gemini key or quota secret if either may have been exposed.
5. Re-check the Privacy Policy whenever storage, logging, analytics, AI providers, or retention behavior changes.

## Known limitations

- There is no user account, server-side analysis history, cross-device synchronization, or authenticated ownership of results.
- Browser history depends on localStorage and can be unavailable, cleared, or visible to another user of a shared device.
- The usage limit is cookie-based and can differ between browsers or devices.
- The server validates required fields, but the current implementation does not provide comprehensive content moderation or an extensive server-side length policy for every input value.
- Gemini availability, response quality, pricing, quotas, and provider retention are outside Persync's direct control.
- Automated test and standalone TypeScript type-check scripts are not currently included.
- No production indexing, traffic, uptime, or model-quality outcome is guaranteed by this repository.

## License and contact

The repository is marked private and does not contain a license file. No open-source license is granted or implied by this README.

For product, terms, or privacy questions:

- Email: [hilmanokk09@gmail.com](mailto:hilmanokk09@gmail.com)
- Instagram: [@mnaprd_](https://instagram.com/mnaprd_)
