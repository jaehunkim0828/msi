import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('tjdrhd25!', 10);

  const user = await prisma.user.upsert({
    where: { username: 'msi' },
    update: {},
    create: {
      username: 'msi',
      password: hashedPassword,
    },
  });

  console.log('✅ 관리자 계정 생성 완료:', user.username);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
