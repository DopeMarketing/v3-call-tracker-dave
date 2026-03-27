import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types'

const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

// Users
export async function getAllUsers() {
  const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false })
  if (error) throw new Error(`Failed to fetch users: ${error.message}`)
  return data
}

export async function getUserById(id: string) {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single()
  if (error) throw new Error(`Failed to fetch user: ${error.message}`)
  return data
}

export async function createUser(user: Database['public']['Tables']['users']['Insert']) {
  const { data, error } = await supabase.from('users').insert(user).select().single()
  if (error) throw new Error(`Failed to create user: ${error.message}`)
  return data
}

export async function updateUser(id: string, user: Database['public']['Tables']['users']['Update']) {
  const { data, error } = await supabase.from('users').update(user).eq('id', id).select().single()
  if (error) throw new Error(`Failed to update user: ${error.message}`)
  return data
}

export async function deleteUser(id: string) {
  const { error } = await supabase.from('users').delete().eq('id', id)
  if (error) throw new Error(`Failed to delete user: ${error.message}`)
}

// Integration Configs
export async function getAllIntegrationConfigs() {
  const { data, error } = await supabase.from('integration_configs').select('*').order('created_at', { ascending: false })
  if (error) throw new Error(`Failed to fetch integration configs: ${error.message}`)
  return data
}

export async function getIntegrationConfigById(id: string) {
  const { data, error } = await supabase.from('integration_configs').select('*').eq('id', id).single()
  if (error) throw new Error(`Failed to fetch integration config: ${error.message}`)
  return data
}

export async function createIntegrationConfig(config: Database['public']['Tables']['integration_configs']['Insert']) {
  const { data, error } = await supabase.from('integration_configs').insert(config).select().single()
  if (error) throw new Error(`Failed to create integration config: ${error.message}`)
  return data
}

export async function updateIntegrationConfig(id: string, config: Database['public']['Tables']['integration_configs']['Update']) {
  const { data, error } = await supabase.from('integration_configs').update(config).eq('id', id).select().single()
  if (error) throw new Error(`Failed to update integration config: ${error.message}`)
  return data
}

export async function deleteIntegrationConfig(id: string) {
  const { error } = await supabase.from('integration_configs').delete().eq('id', id)
  if (error) throw new Error(`Failed to delete integration config: ${error.message}`)
}

// Call Recordings
export async function getAllCallRecordings() {
  const { data, error } = await supabase.from('call_recordings').select('*').order('recording_date', { ascending: false })
  if (error) throw new Error(`Failed to fetch call recordings: ${error.message}`)
  return data
}

export async function getCallRecordingById(id: string) {
  const { data, error } = await supabase.from('call_recordings').select('*').eq('id', id).single()
  if (error) throw new Error(`Failed to fetch call recording: ${error.message}`)
  return data
}

export async function createCallRecording(recording: Database['public']['Tables']['call_recordings']['Insert']) {
  const { data, error } = await supabase.from('call_recordings').insert(recording).select().single()
  if (error) throw new Error(`Failed to create call recording: ${error.message}`)
  return data
}

export async function updateCallRecording(id: string, recording: Database['public']['Tables']['call_recordings']['Update']) {
  const { data, error } = await supabase.from('call_recordings').update(recording).eq('id', id).select().single()
  if (error) throw new Error(`Failed to update call recording: ${error.message}`)
  return data
}

export async function deleteCallRecording(id: string) {
  const { error } = await supabase.from('call_recordings').delete().eq('id', id)
  if (error) throw new Error(`Failed to delete call recording: ${error.message}`)
}

// Transcriptions
export async function getAllTranscriptions() {
  const { data, error } = await supabase.from('transcriptions').select('*').order('created_at', { ascending: false })
  if (error) throw new Error(`Failed to fetch transcriptions: ${error.message}`)
  return data
}

export async function getTranscriptionById(id: string) {
  const { data, error } = await supabase.from('transcriptions').select('*').eq('id', id).single()
  if (error) throw new Error(`Failed to fetch transcription: ${error.message}`)
  return data
}

export async function createTranscription(transcription: Database['public']['Tables']['transcriptions']['Insert']) {
  const { data, error } = await supabase.from('transcriptions').insert(transcription).select().single()
  if (error) throw new Error(`Failed to create transcription: ${error.message}`)
  return data
}

export async function updateTranscription(id: string, transcription: Database['public']['Tables']['transcriptions']['Update']) {
  const { data, error } = await supabase.from('transcriptions').update(transcription).eq('id', id).select().single()
  if (error) throw new Error(`Failed to update transcription: ${error.message}`)
  return data
}

export async function deleteTranscription(id: string) {
  const { error } = await supabase.from('transcriptions').delete().eq('id', id)
  if (error) throw new Error(`Failed to delete transcription: ${error.message}`)
}

// Calendar Events
export async function getAllCalendarEvents() {
  const { data, error } = await supabase.from('calendar_events').select('*').order('start_time', { ascending: false })
  if (error) throw new Error(`Failed to fetch calendar events: ${error.message}`)
  return data
}

export async function getCalendarEventById(id: string) {
  const { data, error } = await supabase.from('calendar_events').select('*').eq('id', id).single()
  if (error) throw new Error(`Failed to fetch calendar event: ${error.message}`)
  return data
}

export async function createCalendarEvent(event: Database['public']['Tables']['calendar_events']['Insert']) {
  const { data, error } = await supabase.from('calendar_events').insert(event).select().single()
  if (error) throw new Error(`Failed to create calendar event: ${error.message}`)
  return data
}

export async function updateCalendarEvent(id: string, event: Database['public']['Tables']['calendar_events']['Update']) {
  const { data, error } = await supabase.from('calendar_events').update(event).eq('id', id).select().single()
  if (error) throw new Error(`Failed to update calendar event: ${error.message}`)
  return data
}

export async function deleteCalendarEvent(id: string) {
  const { error } = await supabase.from('calendar_events').delete().eq('id', id)
  if (error) throw new Error(`Failed to delete calendar event: ${error.message}`)
}

// Call Calendar Matches
export async function getAllCallCalendarMatches() {
  const { data, error } = await supabase.from('call_calendar_matches').select('*').order('created_at', { ascending: false })
  if (error) throw new Error(`Failed to fetch call calendar matches: ${error.message}`)
  return data
}

export async function getCallCalendarMatchById(id: string) {
  const { data, error } = await supabase.from('call_calendar_matches').select('*').eq('id', id).single()
  if (error) throw new Error(`Failed to fetch call calendar match: ${error.message}`)
  return data
}

export async function createCallCalendarMatch(match: Database['public']['Tables']['call_calendar_matches']['Insert']) {
  const { data, error } = await supabase.from('call_calendar_matches').insert(match).select().single()
  if (error) throw new Error(`Failed to create call calendar match: ${error.message}`)
  return data
}

export async function updateCallCalendarMatch(id: string, match: Database['public']['Tables']['call_calendar_matches']['Update']) {
  const { data, error } = await supabase.from('call_calendar_matches').update(match).eq('id', id).select().single()
  if (error) throw new Error(`Failed to update call calendar match: ${error.message}`)
  return data
}

export async function deleteCallCalendarMatch(id: string) {
  const { error } = await supabase.from('call_calendar_matches').delete().eq('id', id)
  if (error) throw new Error(`Failed to delete call calendar match: ${error.message}`)
}

// Tags
export async function getAllTags() {
  const { data, error } = await supabase.from('tags').select('*').order('name')
  if (error) throw new Error(`Failed to fetch tags: ${error.message}`)
  return data
}

export async function getTagById(id: string) {
  const { data, error } = await supabase.from('tags').select('*').eq('id', id).single()
  if (error) throw new Error(`Failed to fetch tag: ${error.message}`)
  return data
}

export async function createTag(tag: Database['public']['Tables']['tags']['Insert']) {
  const { data, error } = await supabase.from('tags').insert(tag).select().single()
  if (error) throw new Error(`Failed to create tag: ${error.message}`)
  return data
}

export async function updateTag(id: string, tag: Database['public']['Tables']['tags']['Update']) {
  const { data, error } = await supabase.from('tags').update(tag).eq('id', id).select().single()
  if (error) throw new Error(`Failed to update tag: ${error.message}`)
  return data
}

export async function deleteTag(id: string) {
  const { error } = await supabase.from('tags').delete().eq('id', id)
  if (error) throw new Error(`Failed to delete tag: ${error.message}`)
}