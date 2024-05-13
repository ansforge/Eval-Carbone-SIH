import 'vitest-dom/extend-expect'

vi.mock('next/navigation', () => {
  return {
    notFound: () => {
      throw new Error('NEXT_NOT_FOUND')
    },
    redirect: vi.fn(),
    usePathname: vi.fn(),
    useRouter: vi.fn(),
  }
})

// vi.mock('next-auth', async (importOriginal) => {
//   const actual = await importOriginal()

//   return {
//     ...actual,
//     NextAuth: vi.fn(),
//     getServerSession: vi.fn(),
//   }
// })
