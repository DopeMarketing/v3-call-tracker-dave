# V3 Call Tracker Dave

Automated Fathom call recording export and transcription to Google Drive knowledge base.

## What This Project Does

V3 Call Tracker Dave automatically exports your Fathom call recordings to a Google Drive folder, transcribes them, and creates a searchable knowledge base. Built for personal use to organize and search through all your meeting recordings.

**Who It's For:** Personal productivity enthusiasts who want to turn their Fathom recordings into a searchable knowledge base.

## Tech Stack

- **Framework:** Next.js 15 with TypeScript
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **File Storage:** Google Drive API
- **Calendar:** Google Calendar API
- **Transcription:** Speech-to-text engine
- **Automation:** Zapier, Make, n8n
- **Knowledge Base:** Notion API
- **Deployment:** Vercel

## Prerequisites

- Node.js 18+ and npm
- Supabase CLI
- Google Cloud Project with Drive/Calendar APIs enabled
- Fathom account
- Git

## Local Setup

1. **Clone the repository**
   bash
   git clone <repository-url>
   cd v3-call-tracker-dave
   

2. **Install dependencies**
   bash
   npm install
   

3. **Set up environment variables**
   bash
   cp .env.example .env.local
   
   Fill in the required environment variables (see table below)

4. **Start Supabase**
   bash
   npx supabase start
   

5. **Run the development server**
   bash
   npm run dev
   

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|---------|
| `DATABASE_URL` | Supabase database connection string | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes |
| `GOOGLE_DRIVE_FOLDER_ID` | Target Google Drive folder ID | Yes |
| `FATHOM_API_KEY` | Fathom API access key | Yes |
| `NOTION_API_KEY` | Notion integration token | No |
| `ZAPIER_WEBHOOK_URL` | Zapier webhook endpoint | No |

## Database Setup

The database schema is automatically applied when you run `npx supabase start`. The schema includes:

- `users` - User accounts and preferences
- `integration_configs` - API keys and integration settings
- `call_recordings` - Fathom recording metadata
- `transcriptions` - Generated transcription text
- `calendar_events` - Google Calendar event data
- `call_calendar_matches` - Links between calls and calendar events
- `tags` - Custom labels for categorization
- `call_tags` - Many-to-many relationship for call tagging
- `export_jobs` - Background job tracking

## Deploy to Vercel

1. **Connect your repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your Git repository

2. **Configure environment variables**
   - Add all environment variables from the table above
   - Use production values for API keys

3. **Deploy**
   - Vercel will automatically deploy on push to main branch

## Project Structure


├── app/                 # Next.js 15 app directory
│   ├── api/            # API routes
│   ├── recordings/     # Recording management pages
│   ├── transcriptions/ # Transcription pages
│   ├── calendar/       # Calendar integration pages
│   ├── tags/           # Tag management pages
│   └── settings/       # Configuration pages
├── components/         # Reusable UI components
├── lib/               # Business logic and utilities
├── db/                # Database queries and migrations
├── actions/           # Server actions
├── types/             # TypeScript type definitions
└── supabase/          # Database schema and config


## Development

- Run `npm run build` before committing
- Use conventional commit messages
- All data access should go through `/db` functions
- Keep business logic in `/lib` and `/actions`
- Server components by default, client components when needed

## Support

This is a personal project. For issues, please check the technical debt document and roadmap first.