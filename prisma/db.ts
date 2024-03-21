import { Prisma, PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'

const prismaClientSingleton = (): PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> => {
  const prisma = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'info',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ],
  })

  // prisma.$on('query', (eventType) => {
  //   console.log('Query: ' + eventType.query)
  //   console.log('Params: ' + eventType.params)
  //   console.log('Duration: ' + eventType.duration + 'ms')
  // })

  return prisma
}

declare global {
  const prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

// @ts-ignore
const prisma = globalThis.prismaGlobal as PrismaClient ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  globalThis.prismaGlobal = prisma
}
