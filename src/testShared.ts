import { RenderResult, render } from '@testing-library/react'
import { UserEvent, userEvent } from '@testing-library/user-event'
import { ReactElement } from 'react'

import * as authentification from './authentification'

export function renderComponent(component: ReactElement): RenderResult & { user: UserEvent } {
  return {
    user: userEvent.setup(),
    ...render(component),
  }
}

export const textMatch = (wording: string) => (_: string, element?: Element | null): boolean => {
  return element?.textContent === wording
}

export const nomEtablissementFake = 'Centre Hospitalier de test'

export function jeSuisUnAdmin(): string {
  const nomEtablissement = `${nomEtablissementFake}$$admin`

  stubProfil(true, nomEtablissement)

  return nomEtablissement
}

export function jeSuisUnUtilisateur(): string {
  const nomEtablissement = `${nomEtablissementFake}$$fakeNumeroFiness`

  stubProfil(false, nomEtablissement)

  return nomEtablissement
}

function stubProfil(isAdmin: boolean, nomEtablissement: string): void {
  vi.spyOn(authentification, 'getProfilAtih').mockResolvedValue({
    isAdmin,
    nomEtablissement,
  })
}
