export interface User {
  id: string;
  email: string;
  full_name: string | null;
  google_drive_folder_id: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface IntegrationConfig {
  id: string;
  user_id: string;
  integration_type: string;
  config_data: any;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CallRecording {
  id: string;
  user_id: string;
  title: string;
  fathom_recording_id: string | null;
  google_drive_file_id: string | null;
  google_drive_url: string | null;
  file_path: string | null;
  duration_seconds: number | null;
  file_size_bytes: number | null;
  recording_date: Date;
  export_status: string;
  transcription_status: string;
  metadata: any;
  created_at: Date;
  updated_at: Date;
}

export interface Transcription {
  id: string;
  user_id: string;
  call_recording_id: string;
  transcript_text: string;
  structured_transcript: any | null;
  confidence_score: number | null;
  processing_engine: string | null;
  google_drive_transcript_file_id: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CalendarEvent {
  id: string;
  user_id: string;
  google_event_id: string;
  calendar_id: string;
  title: string;
  description: string | null;
  start_time: Date;
  end_time: Date;
  attendees: any;
  meeting_link: string | null;
  location: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CallCalendarMatch {
  id: string;
  user_id: string;
  call_recording_id: string;
  calendar_event_id: string;
  match_confidence: number | null;
  match_method: string;
  is_confirmed: boolean;
  created_at: Date;
}

export interface Tag {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  color: string | null;
  tag_type: string;
  is_system: boolean;
  created_at: Date;
}

export interface CallTag {
  id: string;
  user_id: string;
  call_recording_id: string;
  tag_id: string;
  assigned_by: string;
  created_at: Date;
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;
      };
      integration_configs: {
        Row: IntegrationConfig;
        Insert: Omit<IntegrationConfig, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<IntegrationConfig, 'id' | 'created_at' | 'updated_at'>>;
      };
      call_recordings: {
        Row: CallRecording;
        Insert: Omit<CallRecording, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<CallRecording, 'id' | 'created_at' | 'updated_at'>>;
      };
      transcriptions: {
        Row: Transcription;
        Insert: Omit<Transcription, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Transcription, 'id' | 'created_at' | 'updated_at'>>;
      };
      calendar_events: {
        Row: CalendarEvent;
        Insert: Omit<CalendarEvent, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<CalendarEvent, 'id' | 'created_at' | 'updated_at'>>;
      };
      call_calendar_matches: {
        Row: CallCalendarMatch;
        Insert: Omit<CallCalendarMatch, 'id' | 'created_at'>;
        Update: Partial<Omit<CallCalendarMatch, 'id' | 'created_at'>>;
      };
      tags: {
        Row: Tag;
        Insert: Omit<Tag, 'id' | 'created_at'>;
        Update: Partial<Omit<Tag, 'id' | 'created_at'>>;
      };
      call_tags: {
        Row: CallTag;
        Insert: Omit<CallTag, 'id' | 'created_at'>;
        Update: Partial<Omit<CallTag, 'id' | 'created_at'>>;
      };
    };
  };
}