const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function main() {
  console.log('Start seeding...')

  // Create homes
  const cozyCottage = await prisma.home.create({
    data: {
      name: 'Cozy Cottage',
      
      tariff: 0.15,
      buffer: 100,
      meterInstructions: 'Meter is located in the basement, next to the water heater.'
    }
  })

  const sunnyVilla = await prisma.home.create({
    data: {
      name: 'Sunny Villa',
      
      tariff: 0.12,
      buffer: 150,
      meterInstructions: 'Meter is located in the garage, next to the fuse box.'
    }
  })

  // Create users
  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
      homes: {
        connect: [{ id: cozyCottage.id }]
      }
    }
  })

  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob',
      homes: {
        connect: [{ id: sunnyVilla.id }]
      }
    }
  })

  // Create bookings
  const booking1 = await prisma.booking.create({
    data: {
      checkIn: new Date('2022-02-15T00:00:00.000Z'),
      checkOut: new Date('2022-02-20T00:00:00.000Z'),
      guests: 2,
      home: {
        connect: { id: cozyCottage.id }
      },
      user: {
        connect: { id: alice.id }
      }
    }
  })

  const booking2 = await prisma.booking.create({
    data: {
      checkIn: new Date('2022-03-10T00:00:00.000Z'),
      checkOut: new Date('2022-03-15T00:00:00.000Z'),
      guests: 4,
      home: {
        connect: { id: sunnyVilla.id }
      },
      user: {
        connect: { id: bob.id }
      }
    }
  })

  console.log('Seeding finished.')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
