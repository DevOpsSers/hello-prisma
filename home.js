import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createHome(name: string, kWhTariff: number) {
  const newHome = await prisma.home.create({
    data: {
      name: name,
      kWhTariff: kWhTariff,
    },
  })
  return newHome
}

// Usage
createHome("My Home", 0.20)
  .then(home => console.log(`Created home with ID ${home.id}`))
  .catch(error => console.error(error))
