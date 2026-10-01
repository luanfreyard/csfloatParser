# первый запуск проекта

bunx prisma init

# изменил модели

bunx prisma migrate dev --name <название>

# посмотреть данные

bunx prisma studio

# пересоздать Prisma Client

bunx prisma generate

# посмотреть состояние миграций

bunx prisma migrate status

# НА СЕРВЕРЕ применить готовые миграции

bunx prisma migrate deploy
