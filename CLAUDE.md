# V3 Call Tracker Dave — Claude Briefing

Automated Fathom call recording export and transcription system that creates a searchable knowledge base in Google Drive.

## Project Overview

This is a personal productivity app that automatically exports Fathom call recordings to Google Drive, generates transcriptions, and syncs with Google Calendar to create a comprehensive searchable knowledge base. It's built with Next.js 15, Supabase, and integrates with Google Drive, Calendar, Fathom, and Notion APIs.

## Tech Stack

- **Framework:** Next.js 15 with TypeScript (strict mode)
- **Database:** Supabase (PostgreSQL with RLS)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **APIs:** Google Drive, Google Calendar, Fathom, Notion, Zapier, Make, n8n

## Folder Structure


app/
├── api/                 # API routes only
│   ├── fathom/         # Fathom integration endpoints
│   ├── transcribe/     # Transcription service
│   └── calendar/       # Calendar sync endpoints
├── recordings/         # Recording management UI
├── transcriptions/     # Transcription viewing UI
├── calendar/           # Calendar integration UI
├── tags/               # Tag management UI
├── settings/           # Configuration UI
└── globals.css         # Global styles

components/
├── ui/                 # Reusable UI components
├── recordings/         # Recording-specific components
├── transcriptions/     # Transcription components
└── calendar/           # Calendar components

lib/
├── utils.ts           # General utilities
├── fathom.ts          # Fathom API client
├── google-drive.ts    # Google Drive client
├── transcription.ts   # Transcription logic
└── calendar.ts        # Calendar sync logic

db/
├── index.ts           # Database connection
├── recordings.ts      # Recording queries
├── transcriptions.ts  # Transcription queries
├── calendar.ts        # Calendar queries
└── tags.ts            # Tag queries

actions/
├── recordings.ts      # Recording server actions
├── transcriptions.ts  # Transcription actions
├── calendar.ts        # Calendar sync actions
└── tags.ts            # Tag management actions

types/
├── database.ts        # Database types
├── fathom.ts          # Fathom API types
├── google.ts          # Google API types
└── index.ts           # Shared types

supabase/
├── migrations/        # Database migrations
└── seed.sql           # Initial data


## Coding Conventions

- **TypeScript:** Strict mode enabled, no `any` types
- **Components:** Server components by default, client components only when needed
- **Data Access:** Only in `/db` folder, never in components
- **Business Logic:** Only in `/lib` and `/actions`, not in components
- **Security:** No API keys or secrets in client components
- **Error Handling:** Use proper error boundaries and try/catch
- **Styling:** Tailwind CSS with consistent design system

## Current State

This is a fresh scaffold with:
- ✅ Complete database schema (9 tables)
- ✅ All route stubs from sitemap (16 routes)
- ✅ Basic folder structure
- ✅ Integration stubs for all required APIs
- ✅ TypeScript configuration
- ✅ Supabase setup
- ⏳ No actual functionality built yet

## What to Build Next (v1 Features)

1. **Automated Fathom Export** - Set up API integration to export call recordings to Google Drive with organized folder structure
2. **Speech-to-Text Engine** - Implement transcription processing for uploaded recordings
3. **Calendar Integration** - Sync Google Calendar events and match with call recordings
4. **Basic Tagging System** - Manual tag assignment for categorizing calls

## Never Touch Rules

- ❌ Never modify `.env` files - always use `.env.example` as template
- ❌ Never edit migration files without explicit instruction
- ❌ Never change RLS policies without security review
- ❌ Never put API keys in client-side code
- ❌ Never commit secrets or sensitive data

## How to Work on This Project

1. **Always read this file first** before starting any work
2. **Run `npm run build`** before committing to catch TypeScript errors
3. **Commit small and often** with conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `refactor:` for code refactoring
4. **Document technical debt** explicitly in TECHNICAL_DEBT.md
5. **Test integrations** thoroughly - this app depends on external APIs
6. **Keep it simple** - no over-engineering, focus on core functionality

## Data Model Context

Key relationships:
- Users have integration configs (API keys)
- Call recordings link to transcriptions (1:1)
- Calendar events match to call recordings (1:1)
- Tags are many-to-many with call recordings
- Export jobs track background processes

## Integration Priority

1. **Fathom API** - Core functionality depends on this
2. **Google Drive** - Storage for recordings and transcriptions
3. **Google Calendar** - Meeting context and metadata
4. **Transcription Service** - Text generation from audio
5. **Notion** - Knowledge base creation (v2+)

## Success Criteria

A successful v1 should:
- Automatically export Fathom recordings to Google Drive
- Generate searchable transcriptions
- Match recordings with calendar events
- Allow basic manual tagging
- Provide simple dashboard to view everything