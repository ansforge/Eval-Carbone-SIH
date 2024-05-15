import { screen } from '@testing-library/react'

import PageInventaire from '../../app/(connecte)/(both)/inventaire/page'
import * as repositoryModeles from '../../repositories/modelesRepository'
import * as repositoryTypesEquipements from '../../repositories/typesEquipementsRepository'
import { FrozenDate, jeSuisUnUtilisateur, modeleModelFactory, referentielTypeEquipementModelFactory, renderComponent } from '../../testShared'

describe('page inventaires', () => {
  describe('en tant qu’utilisateur', () => {
    it('quand le nom d’établissement n’est pas le même que le mien dans l’URL alors je n’y ai pas accès', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      const queryParams = {
        searchParams: {
          nomEtablissement: 'Hopital de Bordeaux$$00000001J',
          nomInventaire: 'Centre hospitalier',
        },
      }

      // WHEN
      const page = async () => renderComponent(await PageInventaire(queryParams))

      // THEN
      await expect(page).rejects.toThrow('NEXT_NOT_FOUND')
    })

    it('quand j’affiche la page alors j’affiche le formulaire', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      vi.stubGlobal('Date', FrozenDate)
      vi.spyOn(repositoryModeles, 'recupererLesModelesRepository').mockResolvedValueOnce([modeleModelFactory()])
      vi.spyOn(repositoryTypesEquipements, 'recupererLesReferentielsTypesEquipementsRepository').mockResolvedValueOnce([referentielTypeEquipementModelFactory()])

      // WHEN
      renderComponent(await PageInventaire(queryParams()))

      // THEN
      const titre = screen.getByRole('heading', { level: 2, name: 'Renseigner les équipements' })
      expect(titre).toBeInTheDocument()
    })
  })

  it('quand il n’y a pas le nom d’inventaire dans l’URL alors je n’y ai pas accès', async () => {
    // GIVEN
    const queryParams = {
      searchParams: {
        nomEtablissement: 'Hopital de Paris$$00000001K',
      },
    }

    // WHEN
    const page = async () => renderComponent(await PageInventaire(queryParams))

    // THEN
    await expect(page).rejects.toThrow('NEXT_NOT_FOUND')
  })

  it('quand il n’y a pas le nom d’établissement dans l’URL alors je n’y ai pas accès', async () => {
    // GIVEN
    const queryParams = {
      searchParams: {
        nomInventaire: 'Centre hospitalier',
      },
    }

    // WHEN
    const page = async () => renderComponent(await PageInventaire(queryParams))

    // THEN
    await expect(page).rejects.toThrow('NEXT_NOT_FOUND')
  })
})

function queryParams(): { searchParams: { nomEtablissement: string; nomInventaire: string } } {
  return {
    searchParams: {
      nomEtablissement: 'Hopital de Paris$$00000001K',
      nomInventaire: 'Centre hospitalier',
    },
  }
}
