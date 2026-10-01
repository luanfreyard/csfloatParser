import type { Prisma } from '../../generated/prisma/client';
import { prisma } from './client';

export const addItemHistory = async (
  itemHistory: Prisma.ItemHistoryCreateManyInput[],
) => {
  try {
    const result = await prisma.itemHistory.createMany({
      data: itemHistory,
      skipDuplicates: true,
    });

    return result.count;
  } catch (error) {
    console.error('Error adding item history:', error);
    throw error;
  }
};
