interface MakeScenario {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}

interface MakeExecution {
  scenarioId: string;
  data: Record<string, any>;
}

const API_BASE = 'https://hook.eu1.make.com';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Token ${process.env.MAKE_API_KEY}`
};

export async function triggerScenario(webhookUrl: string, data: Record<string, any>): Promise<void> {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Make scenario trigger failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error triggering Make scenario:', error);
    throw error;
  }
}

export async function executeWebhook(hookId: string, payload: Record<string, any>): Promise<void> {
  try {
    const webhookUrl = `${API_BASE}/${hookId}`;
    await triggerScenario(webhookUrl, payload);
  } catch (error) {
    console.error('Error executing Make webhook:', error);
    throw error;
  }
}