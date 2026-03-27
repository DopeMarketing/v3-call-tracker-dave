interface N8nWorkflow {
  id: string;
  name: string;
  active: boolean;
}

interface N8nExecution {
  workflowId: string;
  data: Record<string, any>;
}

const API_BASE = process.env.N8N_BASE_URL || 'https://app.n8n.cloud/api/v1';
const headers = {
  'Content-Type': 'application/json',
  'X-N8N-API-KEY': process.env.N8N_API_KEY
};

export async function triggerWorkflow(webhookUrl: string, data: Record<string, any>): Promise<void> {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`n8n workflow trigger failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error triggering n8n workflow:', error);
    throw error;
  }
}

export async function executeWebhook(workflowId: string, payload: Record<string, any>): Promise<void> {
  try {
    const webhookUrl = `${API_BASE}/webhooks/${workflowId}`;
    await triggerWorkflow(webhookUrl, payload);
  } catch (error) {
    console.error('Error executing n8n webhook:', error);
    throw error;
  }
}