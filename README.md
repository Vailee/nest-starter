# prisma使用步骤

## 初始化prisma

```bash
npx prisma init
```
这里会生成`prisma/schema.prisma`文件，在env文件中配置数据库连接字符串，例如：

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
```

## 使用 Prisma Migrate 创建两个数据库表
```bash
npx prisma migrate dev --name init
```
## 安装prisma client

```bash
pnpm install @prisma/client
```

## 生成prisma client

```bash
npx prisma generate
```

## 针对mysql ，安装prisma adapter
```bash
pnpm install @prisma/adapter-mariadb
```

## create prisma service
├── database/
│   └── prisma.service.ts
│   └── prisma.module.ts

```js
// prisma.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaMariaDb({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      connectionLimit: 5,
    });
    super({ adapter });
  }
}

// prisma.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService], // 让 Nest 知道怎么创建 PrismaService
  exports: [PrismaService], // 导出，供外部模块使用
})
export class PrismaModule {}
```