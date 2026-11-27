import 'vitest-dom/extend-expect'

// jsdom does not implement the modal dialog API. This stub mimics the two browser behaviours a test can observe:
// showModal() moves focus inside the dialog, and close() hands it back to the element that had it — but only
// while the dialog is still attached, which is exactly what a browser does and what a premature unmount breaks.
const elementsFocusAvantOuverture = new WeakMap<HTMLDialogElement, Element | null>()

HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement): void {
  elementsFocusAvantOuverture.set(this, document.activeElement)
  this.open = true
  this.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')?.focus()
}
HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement): void {
  this.open = false
  const elementFocusAvantOuverture = elementsFocusAvantOuverture.get(this)
  if (this.isConnected && elementFocusAvantOuverture instanceof HTMLElement) {
    elementFocusAvantOuverture.focus()
  }
}

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
