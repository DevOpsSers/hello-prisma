const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' })
  })

app.post('/homes', async (req, res) => {
  try {
    const { name, kWhTariff } = req.body
    const newHome = await prisma.home.create({
      data: {
        name,
        kWhTariff,
      },
    })
    res.json(newHome)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
