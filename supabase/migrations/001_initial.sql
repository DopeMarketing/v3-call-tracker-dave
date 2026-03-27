BEGIN;

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text NOT NULL,
  full_name text,
  google_drive_folder_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE integration_configs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  integration_type text NOT NULL,
  config_data jsonb NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE call_recordings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  fathom_recording_id text,
  google_drive_file_id text,
  google_drive_url text,
  file_path text,
  duration_seconds integer,
  file_size_bytes bigint,
  recording_date timestamptz NOT NULL,
  export_status text NOT NULL DEFAULT 'pending',
  transcription_status text NOT NULL DEFAULT 'pending',
  metadata jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE transcriptions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  call_recording_id uuid NOT NULL,
  transcript_text text NOT NULL,
  structured_transcript jsonb,
  confidence_score numeric,
  processing_engine text,
  google_drive_transcript_file_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE calendar_events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  google_event_id text NOT NULL,
  calendar_id text NOT NULL,
  title text NOT NULL,
  description text,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  attendees jsonb NOT NULL DEFAULT '[]',
  meeting_link text,
  location text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE call_calendar_matches (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  call_recording_id uuid NOT NULL,
  calendar_event_id uuid NOT NULL,
  match_confidence numeric,
  match_method text NOT NULL,
  is_confirmed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE tags (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  color text,
  tag_type text NOT NULL,
  is_system boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE call_tags (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  call_recording_id uuid NOT NULL,
  tag_id uuid NOT NULL,
  assigned_by text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Add foreign key constraints
ALTER TABLE integration_configs ADD CONSTRAINT integration_configs_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE call_recordings ADD CONSTRAINT call_recordings_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE transcriptions ADD CONSTRAINT transcriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE transcriptions ADD CONSTRAINT transcriptions_call_recording_id_fkey FOREIGN KEY (call_recording_id) REFERENCES call_recordings(id) ON DELETE CASCADE;
ALTER TABLE calendar_events ADD CONSTRAINT calendar_events_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE call_calendar_matches ADD CONSTRAINT call_calendar_matches_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE call_calendar_matches ADD CONSTRAINT call_calendar_matches_call_recording_id_fkey FOREIGN KEY (call_recording_id) REFERENCES call_recordings(id) ON DELETE CASCADE;
ALTER TABLE call_calendar_matches ADD CONSTRAINT call_calendar_matches_calendar_event_id_fkey FOREIGN KEY (calendar_event_id) REFERENCES calendar_events(id) ON DELETE CASCADE;
ALTER TABLE tags ADD CONSTRAINT tags_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE call_tags ADD CONSTRAINT call_tags_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE call_tags ADD CONSTRAINT call_tags_call_recording_id_fkey FOREIGN KEY (call_recording_id) REFERENCES call_recordings(id) ON DELETE CASCADE;
ALTER TABLE call_tags ADD CONSTRAINT call_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE;

-- Create indexes
CREATE UNIQUE INDEX users_email_idx ON users(email);
CREATE UNIQUE INDEX integration_configs_user_id_integration_type_idx ON integration_configs(user_id, integration_type);
CREATE INDEX integration_configs_user_id_idx ON integration_configs(user_id);
CREATE INDEX integration_configs_created_at_idx ON integration_configs(created_at);
CREATE INDEX call_recordings_user_id_idx ON call_recordings(user_id);
CREATE INDEX call_recordings_recording_date_idx ON call_recordings(recording_date);
CREATE INDEX call_recordings_export_status_idx ON call_recordings(export_status);
CREATE INDEX call_recordings_transcription_status_idx ON call_recordings(transcription_status);
CREATE INDEX call_recordings_created_at_idx ON call_recordings(created_at);
CREATE UNIQUE INDEX call_recordings_fathom_recording_id_idx ON call_recordings(fathom_recording_id) WHERE fathom_recording_id IS NOT NULL;
CREATE INDEX transcriptions_user_id_idx ON transcriptions(user_id);
CREATE INDEX transcriptions_call_recording_id_idx ON transcriptions(call_recording_id);
CREATE INDEX transcriptions_created_at_idx ON transcriptions(created_at);
CREATE INDEX transcriptions_transcript_text_idx ON transcriptions USING gin(to_tsvector('english', transcript_text));
CREATE INDEX calendar_events_user_id_idx ON calendar_events(user_id);
CREATE INDEX calendar_events_start_time_idx ON calendar_events(start_time);
CREATE INDEX calendar_events_created_at_idx ON calendar_events(created_at);
CREATE UNIQUE INDEX calendar_events_user_id_google_event_id_idx ON calendar_events(user_id, google_event_id);
CREATE INDEX call_calendar_matches_user_id_idx ON call_calendar_matches(user_id);
CREATE INDEX call_calendar_matches_call_recording_id_idx ON call_calendar_matches(call_recording_id);
CREATE INDEX call_calendar_matches_calendar_event_id_idx ON call_calendar_matches(calendar_event_id);
CREATE INDEX call_calendar_matches_created_at_idx ON call_calendar_matches(created_at);
CREATE UNIQUE INDEX call_calendar_matches_call_recording_id_calendar_event_id_idx ON call_calendar_matches(call_recording_id, calendar_event_id);
CREATE INDEX tags_user_id_idx ON tags(user_id);
CREATE UNIQUE INDEX tags_user_id_name_idx ON tags(user_id, name);
CREATE INDEX tags_tag_type_idx ON tags(tag_type);
CREATE INDEX tags_created_at_idx ON tags(created_at);
CREATE INDEX call_tags_user_id_idx ON call_tags(user_id);
CREATE INDEX call_tags_call_recording_id_idx ON call_tags(call_recording_id);
CREATE INDEX call_tags_tag_id_idx ON call_tags(tag_id);
CREATE INDEX call_tags_created_at_idx ON call_tags(created_at);
CREATE UNIQUE INDEX call_tags_call_recording_id_tag_id_idx ON call_tags(call_recording_id, tag_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE integration_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_recordings ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_calendar_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "owner_all" ON users FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON integration_configs FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON call_recordings FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON transcriptions FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON calendar_events FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON call_calendar_matches FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON tags FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON call_tags FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

COMMIT;