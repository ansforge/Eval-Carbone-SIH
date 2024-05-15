import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

type UseInventaires = Readonly<{
  comparerDeuxInventaires: () => void
  isDisabled: boolean
  mettreAJourNombreInventaireCoche: (event: FormEvent<HTMLInputElement>) => void
}>

export function useInventaires(): UseInventaires {
  const router = useRouter()
  const [inventairesCoches, setInventairesCoches] = useState<Array<string>>([])
  const isDisabled = inventairesCoches.length < 2 || inventairesCoches.length > 2

  function mettreAJourNombreInventaireCoche(event: FormEvent<HTMLInputElement>) {
    if (event.currentTarget.checked) {
      setInventairesCoches([
        ...inventairesCoches,
        event.currentTarget.value,
      ])
    } else {
      setInventairesCoches(inventairesCoches.filter((inventaire): boolean => inventaire !== event.currentTarget.value))
    }
  }

  function comparerDeuxInventaires() {
    const url = new URL('/tableau-comparatif', document.location.href)
    url.searchParams.append('inventaireReference', inventairesCoches[0])
    url.searchParams.append('inventaireCompare', inventairesCoches[1])

    router.push(url.toString())
  }

  return {
    comparerDeuxInventaires,
    isDisabled,
    mettreAJourNombreInventaireCoche,
  }
}
