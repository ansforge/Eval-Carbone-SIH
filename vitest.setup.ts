import 'vitest-dom/extend-expect'

vi.mock('next/navigation', () => {
  return {
    notFound: vi.fn(() => {
      throw new Error('NEXT_NOT_FOUND')
    }),
    redirect: vi.fn((destination) => {
      throw new Error('NEXT REDIRECT ' + destination)
    }),
    usePathname: vi.fn(),
    useRouter: vi.fn(),
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
