import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY
});

export interface NotionPage {
  id: string;
  title: string;
  properties: Record<string, any>;
}

export interface NotionDatabase {
  id: string;
  title: string;
  properties: Record<string, any>;
}

export async function queryDatabase(databaseId: string, filter?: any): Promise<NotionPage[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter
    });
    return response.results.map(page => ({
      id: page.id,
      title: (page as any).properties?.title?.title?.[0]?.plain_text || '',
      properties: (page as any).properties
    }));
  } catch (error) {
    console.error('Error querying Notion database:', error);
    throw error;
  }
}

export async function createPage(databaseId: string, properties: Record<string, any>): Promise<NotionPage> {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties
    });
    return {
      id: response.id,
      title: (response as any).properties?.title?.title?.[0]?.plain_text || '',
      properties: (response as any).properties
    };
  } catch (error) {
    console.error('Error creating Notion page:', error);
    throw error;
  }
}