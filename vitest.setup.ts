import 'vitest-dom/extend-expect'

// Date par défaut dans tous les tests
class StubedDate extends Date {
  constructor() {
    super('1995-12-17T03:24:00')
  }
}
// @ts-expect-error
global.Date = StubedDate

vi.mock('next/navigation', () => {
  return {
    notFound: vi.fn(() => {
      throw new Error('NEXT_NOT_FOUND')
    }),
    redirect: vi.fn((destination) => {
      throw new Error('NEXT REDIRECT ' + destination)
    }),
    usePathname: vi.fn(),
    useRouter: vi.fn(() => {
      return {
        push: vi.fn(),
      }
    }),
  }
})

// vi.mock('next-auth', async (importOriginal) => {
//   const actual = await importOriginal()

//   return {
//     ...actual,
//     NextAuth: vi.fn(),
//     getServerSession: () => vi.fn(),
//   }
// })
