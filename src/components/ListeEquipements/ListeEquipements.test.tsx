import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import * as navigation from 'next/navigation'

import PageListeEquipements from '../../app/(connecte)/(both)/liste-equipements/page'
import * as repositoryInventaires from '../../gateways/inventairesRepository'
import * as repositoryModeles from '../../gateways/modelesRepository'
import * as repositoryTypesEquipements from '../../gateways/typesEquipementsRepository'
import { jeSuisUnAdmin, jeSuisUnUtilisateur, modeleModelFactory, referentielTypeEquipementModelFactory, renderComponent, spyNextNavigation } from '../../testShared'

describe('page liste d’équipements', () => {
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
      const page = async () => renderComponent(await PageListeEquipements(queryParams))

      // THEN
      await expect(page).rejects.toThrow('NEXT_NOT_FOUND')
    })

    it('quand j’affiche la page alors j’affiche ma liste de types d’équipements', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      vi.spyOn(repositoryModeles, 'recupererLesModelesRepository').mockResolvedValueOnce([modeleModelFactory()])
      vi.spyOn(repositoryTypesEquipements, 'recupererLesReferentielsTypesEquipementsRepository').mockResolvedValueOnce([referentielTypeEquipementModelFactory()])

      // WHEN
      renderComponent(await PageListeEquipements(queryParams()))

      // THEN
      const titre = screen.getByRole('heading', { level: 1, name: 'Liste d’équipements' })
      expect(titre).toBeInTheDocument()

      const lienModifierNomInventaire = screen.getByRole('link', { name: 'Modifier le nom de l’inventaire' })
      expect(lienModifierNomInventaire).toHaveAttribute('href', '/modifier-le-nom-inventaire?nomEtablissement=Hopital%20de%20Paris$$00000001K&nomInventaire=Centre%20hospitalier')

      const lienModifierInventaire = screen.getByRole('link', { name: 'Modifier l’inventaire' })
      expect(lienModifierInventaire).toHaveAttribute('href', '/inventaire?nomEtablissement=Hopital%20de%20Paris$$00000001K&nomInventaire=Centre%20hospitalier&statut=CALCUL%C3%89')

      const lienIndicateursCles = screen.getByRole('link', { name: 'Indicateurs clés' })
      expect(lienIndicateursCles).toHaveAttribute('href', 'indicateurs-cles?nomEtablissement=Hopital%20de%20Paris$$00000001K&nomInventaire=Centre%20hospitalier')

      const lienListeEquipements = screen.getByRole('link', { name: 'Liste d’équipements' })
      expect(lienListeEquipements).toHaveAttribute('href', 'liste-equipements?nomEtablissement=Hopital%20de%20Paris$$00000001K&nomInventaire=Centre%20hospitalier')

      const boutonOrdinateurPortable = screen.getByRole('tab', { name: 'Ordinateur portable (1)' })
      expect(boutonOrdinateurPortable).toBeInTheDocument()
    })

    it('quand je clique sur un type d’équipement alors j’affiche la liste de modèles', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      vi.spyOn(repositoryModeles, 'recupererLesModelesRepository').mockResolvedValueOnce([modeleModelFactory()])
      vi.spyOn(repositoryTypesEquipements, 'recupererLesReferentielsTypesEquipementsRepository').mockResolvedValueOnce([referentielTypeEquipementModelFactory()])

      renderComponent(await PageListeEquipements(queryParams()))

      // WHEN
      const boutonOrdinateurPortable = screen.getByRole('tab', { name: 'Ordinateur portable (1)' })
      fireEvent.click(boutonOrdinateurPortable)

      // THEN
      const tableModeles = screen.getByRole('table')
      const rowgroup = within(tableModeles).getAllByRole('rowgroup')
      const tbodyRows = within(rowgroup[1]).getAllByRole('row')
      expect(tbodyRows).toHaveLength(1)

      const cellsRow1 = within(tbodyRows[0]).getAllByRole('cell')
      expect(cellsRow1[0]).toHaveTextContent('Standard - bureautique - 13 pouces')
      expect(cellsRow1[1]).toHaveTextContent('1')
      expect(cellsRow1[2]).toHaveTextContent('0')
      expect(cellsRow1[3]).toHaveTextContent('24')
    })

    it('quand je clique sur le bouton de suppression alors l’inventaire est supprimé et ne s’affiche plus', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      const date = new Date()
      vi.spyOn(repositoryModeles, 'recupererLesModelesRepository').mockResolvedValueOnce([modeleModelFactory()])
      vi.spyOn(repositoryTypesEquipements, 'recupererLesReferentielsTypesEquipementsRepository').mockResolvedValueOnce([referentielTypeEquipementModelFactory()])
      vi.spyOn(navigation, 'useRouter')
        .mockReturnValueOnce(spyNextNavigation.useRouter)
        .mockReturnValueOnce(spyNextNavigation.useRouter)
      vi.spyOn(repositoryInventaires, 'supprimerUnInventaireRepository').mockResolvedValueOnce(date)

      renderComponent(await PageListeEquipements(queryParams()))

      const boutonSupprimerUnInventaire = screen.getByRole('button', { name: 'Supprimer l’inventaire' })
      fireEvent.click(boutonSupprimerUnInventaire)

      // WHEN
      const modale = screen.getByRole('dialog', { name: 'Supprimer l’inventaire' })
      const boutonSupprimer = within(modale).getByRole('button', { name: 'Supprimer l’inventaire' })
      fireEvent.click(boutonSupprimer)

      // THEN
      await waitFor(() => {
        expect(repositoryInventaires.supprimerUnInventaireRepository).toHaveBeenCalledWith('Hopital de Paris$$00000001K', 'Centre hospitalier')
      })
      expect(spyNextNavigation.useRouter.push).toHaveBeenCalledWith('/')
      expect(spyNextNavigation.useRouter.refresh).toHaveBeenCalledWith()
      const titreModale = within(modale).queryByRole('heading', { level: 1, name: 'Supprimer l’inventaire' })
      expect(titreModale).not.toBeInTheDocument()
    })
  })

  describe('en tant qu’admin', () => {
    it('quand le nom d’établissement n’est pas le même que le mien dans l’URL alors j’y ai accès', async () => {
      // GIVEN
      jeSuisUnAdmin()

      vi.spyOn(navigation, 'usePathname').mockReturnValueOnce('/liste-equipements')
      const queryParams = {
        searchParams: {
          nomEtablissement: 'Hopital de Bordeaux$$00000001J',
          nomInventaire: 'Centre hospitalier',
        },
      }

      vi.spyOn(repositoryModeles, 'recupererLesModelesRepository').mockResolvedValueOnce([modeleModelFactory()])
      vi.spyOn(repositoryTypesEquipements, 'recupererLesReferentielsTypesEquipementsRepository').mockResolvedValueOnce([referentielTypeEquipementModelFactory()])

      // WHEN
      renderComponent(await PageListeEquipements(queryParams))

      // THEN
      const titre = screen.getByRole('heading', { level: 1, name: 'Liste d’équipements' })
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
    const page = async () => renderComponent(await PageListeEquipements(queryParams))

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
    const page = async () => renderComponent(await PageListeEquipements(queryParams))

    // THEN
    await expect(page).rejects.toThrow('NEXT_NOT_FOUND')
  })

  it('quand le nom d’établissement n’existe pas ou plus alors je n’y ai pas accès', async () => {
    // GIVEN
    jeSuisUnUtilisateur()

    vi.spyOn(repositoryModeles, 'recupererLesModelesRepository').mockResolvedValueOnce([])

    // WHEN
    const page = async () => renderComponent(await PageListeEquipements(queryParams()))

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
