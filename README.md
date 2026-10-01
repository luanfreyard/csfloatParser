# csfloatparser

To install dependencies:

```bash
bun install
```

To run the parser:

```bash
bun run start
```

This project was created using `bun init` in bun v1.3.14. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

## Sales analytics admin

The Next.js application is in `admin/` and uses the same PostgreSQL `DB_URL`
from the root `.env`.

```bash
npm --prefix admin install
bunx prisma generate --config prisma7.config.ts
bun run admin
```

Open http://localhost:3000. Run `bun run start` in another terminal to collect
sales in parallel. Search items, filter sale dates and float ranges, browse 100
sales per page and compare price charts, mean, median and float groups.

See [admin/README.md](admin/README.md) for production and analytics details.
