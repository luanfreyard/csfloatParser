import type { Item, ItemHistory, Prisma } from '../generated/prisma/client';
import { getItemHistory } from './api/history';
import { addItemHistory } from './repository/itemHistory';
import { getAllItems, getItemById } from './repository/items';

async function processRound(items: Item[], workersCount: number) {
  const queue = [...items];
  let addedCount = 0;
  let errorsCount = 0;
  async function worker(workerId: number) {
    while (queue.length > 0) {
      const item = queue.shift();

      if (!item) return;

      try {
        console.log(`Worker ${workerId}: ${item.marketHashName}`);

        const history = await getItemHistory(item.marketHashName);

        const rows = history.map((h) => ({
          externalId: h.id,
          price: h.price,
          skinId: item.id,
          assetId: h.item.asset_id,
          defIndex: h.item.def_index,
          paintIndex: h.item.paint_index,
          paintSeed: h.item.paint_seed,
          floatValue: h.item.float_value,
          soldAt: new Date(h.sold_at.replace(/(\.\d{3})\d+Z$/, '$1Z')),
        }));

        if (rows.length > 0) {
          const inserted = await addItemHistory(rows);
          addedCount += inserted;
          console.log(addedCount);
        }
      } catch (error) {
        errorsCount += 1;
        console.error(`Ошибка обработки ${item.marketHashName}:`, error);
      }
    }
  }

  await Promise.all(
    Array.from(
      {
        length: Math.min(workersCount, items.length),
      },
      (_, index) => worker(index + 1),
    ),
  );

  return [addedCount, errorsCount];
}

async function runQueue(items: Item[], workersCount: number) {
  // while (true) {
  const startedAt = Date.now();

  const [addedCount, errorsCount] = await processRound(items, workersCount);

  const seconds = ((Date.now() - startedAt) / 1000).toFixed(1);

  console.log(
    `Круг завершён. Добавлено новых записей: ${addedCount}. Время: ${seconds} сек. Ошибок ${errorsCount}`,
  );

  await new Promise((resolve) => {
    setTimeout(resolve, 60_000);
  });
  // }
}

const items = await getAllItems();
const workersCount = parseInt(process.env.THREADS_COUNT || '1', 10);

await runQueue(items, workersCount);
