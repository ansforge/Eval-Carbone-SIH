import { screen } from '@testing-library/react'

import PageTableauComparatif from '../../app/(connecte)/(utilisateur)/tableau-comparatif/page'
import * as repositoryIndicateurs from '../../repositories/indicateursRepository'
import * as repositoryModeles from '../../repositories/modelesRepository'
import { indicateurImpactEquipementModelFactory, jeSuisUnAdmin, jeSuisUnUtilisateur, modeleModelFactory, renderComponent } from '../../testShared'

describe('page tableau comparatif', () => {
  describe('en tant qu’utilisateur', () => {
    it('quand j’affiche la page alors j’y ai accès', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      vi.spyOn(repositoryIndicateurs, 'recupererLesIndicateursImpactsEquipementsRepository')
        .mockResolvedValueOnce([indicateurImpactEquipementModelFactory()])
        .mockResolvedValueOnce([indicateurImpactEquipementModelFactory()])
      vi.spyOn(repositoryModeles, 'recupererLesModelesRepository')
        .mockResolvedValueOnce([modeleModelFactory()])
        .mockResolvedValueOnce([modeleModelFactory()])

      // WHEN
      renderComponent(await PageTableauComparatif(queryParams()))

      // THEN
      const titre = screen.getByRole('heading', { name: 'Tableau comparatif' })
      expect(titre).toBeInTheDocument()
    })

    it('quand le nom d’établissement comparé n’existe pas ou plus alors je n’y ai pas accès', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      vi.spyOn(repositoryIndicateurs, 'recupererLesIndicateursImpactsEquipementsRepository').mockResolvedValueOnce([])

      // WHEN
      const page = async () => renderComponent(await PageTableauComparatif(queryParams()))

      // THEN
      await expect(page).rejects.toThrow('NEXT_NOT_FOUND')
    })

    it('quand le nom d’établissement référencé n’existe pas ou plus alors je n’y ai pas accès', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      vi.spyOn(repositoryIndicateurs, 'recupererLesIndicateursImpactsEquipementsRepository')
        .mockResolvedValueOnce([indicateurImpactEquipementModelFactory()])
        .mockResolvedValueOnce([])

      // WHEN
      const page = async () => renderComponent(await PageTableauComparatif(queryParams()))

      // THEN
      await expect(page).rejects.toThrow('NEXT_NOT_FOUND')
    })
  })

  describe('en tant qu’admin', () => {
    it('quand j’affiche la page alors je n’y ai pas accès', async () => {
      // GIVEN
      jeSuisUnAdmin()

      // WHEN
      const page = async () => renderComponent(await PageTableauComparatif(queryParams()))

      // THEN
      await expect(page).rejects.toThrow('NEXT_NOT_FOUND')
    })
  })

  it('quand il n’y a pas de nom d’inventaire de référence dans l’url alors je n’y ai pas accès', async () => {
    // GIVEN
    const queryParams = {
      searchParams: {
        inventaireCompare: 'Centre hospitalier',
      },
    }

    // WHEN
    const page = async () => renderComponent(await PageTableauComparatif(queryParams))

    // THEN
    await expect(page).rejects.toThrow('NEXT_NOT_FOUND')
  })

  it('quand il n’y a pas de nom d’inventaire comparé dans l’url alors je n’y ai pas accès', async () => {
    // GIVEN
    const queryParams = {
      searchParams: {
        inventaireReference: 'Centre hospitalier',
      },
    }

    // WHEN
    const page = async () => renderComponent(await PageTableauComparatif(queryParams))

    // THEN
    await expect(page).rejects.toThrow('NEXT_NOT_FOUND')
  })
})

function queryParams() {
  return {
    searchParams: {
      inventaireCompare: 'Centre hospitalier',
      inventaireReference: 'Secteur infirmier',
    },
  }
}
