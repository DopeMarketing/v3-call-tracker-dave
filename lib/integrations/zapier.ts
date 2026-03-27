interface ZapierWebhook {
  id: string;
  url: string;
  status: 'active' | 'inactive';
}

interface ZapierTrigger {
  event: string;
  data: Record<string, any>;
}

const API_BASE = 'https://hooks.zapier.com/hooks/catch';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.ZAPIER_API_KEY}`
};

export async function triggerZap(hookUrl: string, data: Record<string, any>): Promise<void> {
  try {
    const response = await fetch(hookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Zapier trigger failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error triggering Zapier webhook:', error);
    throw error;
  }
}

export async function sendWebhook(event: string, payload: Record<string, any>): Promise<void> {
  try {
    const webhookData = { event, timestamp: new Date().toISOString(), ...payload };
    await triggerZap(`${API_BASE}/${event}`, webhookData);
  } catch (error) {
    console.error('Error sending Zapier webhook:', error);
    throw error;
  }
}