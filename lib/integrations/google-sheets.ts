import { google } from 'googleapis';

const sheets = google.sheets({
  version: 'v4',
  auth: process.env.GOOGLE_SHEETS_API_KEY
});

export interface SheetRange {
  range: string;
  values?: string[][];
}

export async function readSheet(spreadsheetId: string, range: string): Promise<string[][]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range
    });
    return response.data.values || [];
  } catch (error) {
    console.error('Error reading sheet:', error);
    throw error;
  }
}

export async function updateSheet(spreadsheetId: string, range: string, values: string[][]): Promise<void> {
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values
      }
    });
  } catch (error) {
    console.error('Error updating sheet:', error);
    throw error;
  }
}