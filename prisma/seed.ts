import { readFile } from 'node:fs/promises';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DB_URL,
});

const prisma = new PrismaClient({ adapter });

type Skin = {
  id: number;
  name: string;
  market_hash_name: string;
  image: string;
  weapon: {
    name: string;
  };
  category: {
    name: string;
  };
  pattern: {
    name: string;
  };
  wear: {
    name: string;
  };
  rarity: {
    name: string;
  };
  min_float: number;
  max_float: number;
  stattrak: boolean;
  souvenir: boolean;
};

const file = await readFile('./public/skins.json', 'utf8');
const skins = JSON.parse(file) as Record<string, Skin>;

await prisma.item.createMany({
  data: Object.values(skins).map((skin) => ({
    name: skin.name,
    marketHashName: skin.market_hash_name,
    image: skin.image,
    weapon: skin.weapon?.name,
    category: skin.category?.name,
    pattern: skin.pattern?.name,
    wear: skin.wear?.name,
    rarity: skin.rarity?.name,
    minFloat: skin.min_float,
    maxFloat: skin.max_float,
    isStatTrak: skin.stattrak ?? false,
    isSouvenir: skin.souvenir ?? false,
  })),
  skipDuplicates: true,
});

await prisma.$disconnect();

console.log(`Импортировано предметов: ${Object.keys(skins).length}`);
