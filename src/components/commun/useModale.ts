import { useState } from 'react'

export function useModale() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

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
