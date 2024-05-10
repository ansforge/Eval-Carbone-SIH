import { useState } from 'react'

type UseModale = Readonly<{
  fermerLaModale: () => void
  isOpen: boolean
  ouvrirLaModale: () => void
}>

export function useModale(): UseModale {
  const [isOpen, setIsOpen] = useState(false)

  const ouvrirLaModale = () => {
    setIsOpen(true)
  }

  const fermerLaModale = () => {
    setIsOpen(false)
  }

  return {
    fermerLaModale,
    isOpen,
    ouvrirLaModale,
  }
}
