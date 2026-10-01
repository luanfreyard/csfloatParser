import { prisma } from './client';

export const getAllItems = async () => {
  try {
    const items = await prisma.item.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    return items;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const getItemById = async (id: number) => {
  try {
    const item = await prisma.item.findUnique({
      where: {
        id,
      },
    });

    return item;
  } catch (error) {
    console.error('Error fetching item by ID:', error);
    throw error;
  }
};
