const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const telegramChatId = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramMessage(text: string) {
  if (!telegramBotToken || !telegramChatId) {
    console.warn(
      'Telegram logging is disabled: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set',
    );
    return;
  }

  const response = await fetch(
    `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Telegram API error: ${response.status} ${await response.text()}`,
    );
  }
}
