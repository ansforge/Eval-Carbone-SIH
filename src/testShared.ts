import { indicateurImpactEquipementModel, inventaireModel, modeleModel } from '@prisma/client'
import { RenderResult, render } from '@testing-library/react'
import { UserEvent, userEvent } from '@testing-library/user-event'
import { ReactElement } from 'react'

import * as authentification from './authentification'
import { separator } from './configuration'
import { EtapesAcv } from './presenters/indicateursClesPresenter'
import { IndicateurImpactEquipementSommeModel } from './repositories/indicateursRepository'
import { ReferentielTypeEquipementModel } from './repositories/typesEquipementsRepository'

export function renderComponent(component: ReactElement): RenderResult & { user: UserEvent } {
  return {
    user: userEvent.setup(),
    ...render(component),
  }
}

export const textMatch = (wording: string) => (_: string, element?: Element | null): boolean => {
  return element?.textContent === wording
}

export const nomEtablissementFake = 'Hopital de Paris'

export function jeSuisUnAdmin(): string {
  const nomEtablissement = `${nomEtablissementFake}${separator}admin`

  stubProfil(true, nomEtablissement)

  return nomEtablissement
}

export function jeSuisUnUtilisateur(): string {
  const nomEtablissement = `${nomEtablissementFake}${separator}00000001K`

  stubProfil(false, nomEtablissement)

  return nomEtablissement
}

function stubProfil(isAdmin: boolean, nomEtablissement: string): void {
  vi.spyOn(authentification, 'getProfilAtih').mockResolvedValue({
    isAdmin,
    isConnected: true,
    nomEtablissement,
  })
}

export class FrozenDate extends Date {
  constructor() {
    super('1996-04-15T03:24:00')
  }
}

export const spyNextNavigation = {
  useRouter: {
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    push: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
  },
}

export function inventaireModelFactory(override?: Partial<inventaireModel>): inventaireModel {
  const date = new Date()

  return {
    dateCreation: date,
    dateInventaire: date,
    dateMiseAJour: date,
    id: 1,
    nomEtablissement: `${nomEtablissementFake}${separator}00000001K`,
    nomInventaire: 'mon super inventaire',
    statut: 'TRAITE',
    ...override,
  }
}

export function modeleModelFactory(override?: Partial<modeleModel>): modeleModel {
  const date = new Date()

  return {
    dateAchat: date,
    dateInventaire: date,
    id: 1,
    nom: 'Standard - bureautique - 13 pouces',
    nomEtablissement: 'Hopital de Bordeaux$$00000001J',
    nomInventaire: 'Centre hospitalier',
    quantite: 1,
    tauxUtilisation: 1,
    type: 'Ordinateur portable',
    ...override,
  }
}

export function referentielTypeEquipementModelFactory(override?: Partial<ReferentielTypeEquipementModel>): ReferentielTypeEquipementModel {
  return {
    dureeDeVie: 5,
    modeles: [
      {
        relationModeles: {
          nom: 'Standard - bureautique - 13 pouces',
        },
      },
    ],
    type: 'Ordinateur portable',
    ...override,
  }
}

export function indicateurImpactEquipementModelFactory(override?: Partial<indicateurImpactEquipementModel>): indicateurImpactEquipementModel {
  const date = new Date()

  return {
    critere: 'Climate change',
    dateInventaire: date,
    etapeAcv: EtapesAcv.distribution,
    impactUnitaire: 646.886,
    nomEtablissement: 'Hopital de Bordeaux$$00000001J',
    nomInventaire: 'Centre hospitalier',
    statutIndicateur: 'OK',
    typeEquipement: 'Ordinateur portable',
    ...override,
  }
}

export function indicateurImpactEquipementSommeModelFactory(override?: Partial<IndicateurImpactEquipementSommeModel>): IndicateurImpactEquipementSommeModel {
  return {
    _sum: {
      impactUnitaire: 646.886,
    },
    etapeAcv: EtapesAcv.distribution,
    typeEquipement: 'Ordinateur portable',
    ...override,
  }
}
