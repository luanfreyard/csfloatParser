import { API_URL } from '../constants';
import 'dotenv/config';

interface ItemHistoryResponse {
  id: string;
  price: number;
  item: {
    asset_id: string;
    def_index: number;
    paint_index: number;
    paint_seed: number;
    float_value: number;
  };
  sold_at: string;
}

export const getItemHistory = async (
  itemName: string,
): Promise<ItemHistoryResponse[]> => {
  const response = await fetch(
    `${API_URL}/history/${encodeURIComponent(itemName)}/sales`,
    {
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
        pragma: 'no-cache',
        priority: 'u=1, i',
        referer: 'https://csfloat.com/',
        'sec-ch-ua':
          '"Chromium";v="154", "Google Chrome";v="154", "Not(A:Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36',
      },
      proxy: process.env.PROXY_URL || undefined,
      signal: AbortSignal.timeout(10_000),
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch item history: ${response.statusText}`);
  }

  const data = (await response.json()) as ItemHistoryResponse[];

  return data;
};
