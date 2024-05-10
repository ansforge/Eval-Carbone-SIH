import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import * as navigation from 'next/navigation'

import PageIndicateursCles from '../../app/(connecte)/(both)/indicateurs-cles/page'
import * as repositoryIndicateurs from '../../gateways/indicateursRepository'
import * as repositoryInventaires from '../../gateways/inventairesRepository'
import * as repositoryTypesEquipements from '../../gateways/typesEquipementsRepository'
import { indicateurImpactEquipementModelFactory, indicateurImpactEquipementSommeModelFactory, jeSuisUnAdmin, jeSuisUnUtilisateur, referentielTypeEquipementModelFactory, renderComponent, spyNextNavigation } from '../../testShared'

describe('page des indicateurs clés', () => {
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
      const page = async () => renderComponent(await PageIndicateursCles(queryParams))

      // THEN
      await expect(page).rejects.toThrow('NEXT_NOT_FOUND')
    })

    it('quand j’affiche la page alors j’affiche des indicateurs', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      vi.spyOn(navigation, 'usePathname').mockReturnValueOnce('/indicateurs-cles')
      vi.spyOn(repositoryIndicateurs, 'recupererLesIndicateursImpactsEquipementsRepository').mockResolvedValueOnce([indicateurImpactEquipementModelFactory()])
      vi.spyOn(repositoryIndicateurs, 'recupererLesIndicateursImpactsEquipementsSommesRepository').mockResolvedValueOnce([indicateurImpactEquipementSommeModelFactory()])
      vi.spyOn(repositoryTypesEquipements, 'recupererLesReferentielsTypesEquipementsRepository').mockResolvedValueOnce([referentielTypeEquipementModelFactory()])

      // WHEN
      renderComponent(await PageIndicateursCles(queryParams()))

      // THEN
      const titre = screen.getByRole('heading', { level: 1, name: 'Indicateurs clés' })
      expect(titre).toBeInTheDocument()

      const lienModifierNomInventaire = screen.getByRole('link', { name: 'Modifier le nom de l’inventaire' })
      expect(lienModifierNomInventaire).toHaveAttribute('href', '/modifier-le-nom-inventaire?nomEtablissement=Hopital%20de%20Paris$$00000001K&nomInventaire=Centre%20hospitalier')

      const lienModifierInventaire = screen.getByRole('link', { name: 'Modifier l’inventaire' })
      expect(lienModifierInventaire).toHaveAttribute('href', '/inventaire?nomEtablissement=Hopital%20de%20Paris$$00000001K&nomInventaire=Centre%20hospitalier&statut=CALCUL%C3%89')

      const lienIndicateursCles = screen.getByRole('link', { name: 'Indicateurs clés' })
      expect(lienIndicateursCles).toHaveAttribute('href', 'indicateurs-cles?nomEtablissement=Hopital%20de%20Paris$$00000001K&nomInventaire=Centre%20hospitalier')

      const lienListeEquipements = screen.getByRole('link', { name: 'Liste d’équipements' })
      expect(lienListeEquipements).toHaveAttribute('href', 'liste-equipements?nomEtablissement=Hopital%20de%20Paris$$00000001K&nomInventaire=Centre%20hospitalier')

      const simulezVosReductions = screen.getByRole('heading', { level: 2, name: 'Simulez vos réductions d’empreinte' })
      expect(simulezVosReductions).toBeInTheDocument()
      const lienCreerUneSimulation = screen.getByRole('link', { name: 'Créer une simulation' })
      expect(lienCreerUneSimulation).toHaveAttribute('href', '/creer-une-simulation?nomInventaire=Centre%20hospitalier')
    })
  })

  describe('en tant qu’admin', () => {
    it('quand le nom d’établissement n’est pas le même que le mien dans l’URL alors j’y ai accès', async () => {
      // GIVEN
      jeSuisUnAdmin()

      vi.spyOn(navigation, 'usePathname').mockReturnValueOnce('/indicateurs-cles')
      const queryParams = {
        searchParams: {
          nomEtablissement: 'Hopital de Bordeaux$$00000001J',
          nomInventaire: 'Centre hospitalier',
        },
      }

      vi.spyOn(repositoryIndicateurs, 'recupererLesIndicateursImpactsEquipementsRepository').mockResolvedValueOnce([indicateurImpactEquipementModelFactory()])
      vi.spyOn(repositoryIndicateurs, 'recupererLesIndicateursImpactsEquipementsSommesRepository').mockResolvedValueOnce([indicateurImpactEquipementSommeModelFactory()])
      vi.spyOn(repositoryTypesEquipements, 'recupererLesReferentielsTypesEquipementsRepository').mockResolvedValueOnce([referentielTypeEquipementModelFactory()])

      // WHEN
      renderComponent(await PageIndicateursCles(queryParams))

      // THEN
      const titre = screen.getByRole('heading', { level: 1, name: 'Indicateurs clés' })
      expect(titre).toBeInTheDocument()
    })

    it('quand j’affiche la page alors je n’ai pas accès à l’encart de simulation', async () => {
      // GIVEN
      jeSuisUnAdmin()

      vi.spyOn(navigation, 'usePathname').mockReturnValueOnce('/indicateurs-cles')
      vi.spyOn(repositoryIndicateurs, 'recupererLesIndicateursImpactsEquipementsRepository').mockResolvedValueOnce([indicateurImpactEquipementModelFactory()])
      vi.spyOn(repositoryIndicateurs, 'recupererLesIndicateursImpactsEquipementsSommesRepository').mockResolvedValueOnce([indicateurImpactEquipementSommeModelFactory()])
      vi.spyOn(repositoryTypesEquipements, 'recupererLesReferentielsTypesEquipementsRepository').mockResolvedValueOnce([referentielTypeEquipementModelFactory()])

      // WHEN
      renderComponent(await PageIndicateursCles(queryParams()))

      // THEN
      const titre = screen.queryByRole('heading', { level: 2, name: 'Simulez vos réductions d’empreinte' })
      expect(titre).not.toBeInTheDocument()
    })

    it('quand je clique sur le bouton de suppression alors l’inventaire est supprimé et ne s’affiche plus', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      const date = new Date()
      vi.spyOn(navigation, 'usePathname').mockReturnValueOnce('/indicateurs-cles')
      vi.spyOn(repositoryIndicateurs, 'recupererLesIndicateursImpactsEquipementsRepository').mockResolvedValueOnce([indicateurImpactEquipementModelFactory()])
      vi.spyOn(repositoryIndicateurs, 'recupererLesIndicateursImpactsEquipementsSommesRepository').mockResolvedValueOnce([indicateurImpactEquipementSommeModelFactory()])
      vi.spyOn(repositoryTypesEquipements, 'recupererLesReferentielsTypesEquipementsRepository').mockResolvedValueOnce([referentielTypeEquipementModelFactory()])
      vi.spyOn(navigation, 'useRouter')
        .mockReturnValueOnce(spyNextNavigation.useRouter)
        .mockReturnValueOnce(spyNextNavigation.useRouter)
      vi.spyOn(repositoryInventaires, 'supprimerUnInventaireRepository').mockResolvedValueOnce(date)

      renderComponent(await PageIndicateursCles(queryParams()))

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

  it('quand il n’y a pas le nom d’inventaire dans l’URL alors je n’y ai pas accès', async () => {
    // GIVEN
    const queryParams = {
      searchParams: {
        nomEtablissement: 'Hopital de Paris$$00000001K',
      },
    }

    // WHEN
    const page = async () => renderComponent(await PageIndicateursCles(queryParams))

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
    const page = async () => renderComponent(await PageIndicateursCles(queryParams))

    // THEN
    await expect(page).rejects.toThrow('NEXT_NOT_FOUND')
  })

  it('quand le nom d’établissement n’existe pas ou plus alors je n’y ai pas accès', async () => {
    // GIVEN
    jeSuisUnUtilisateur()

    vi.spyOn(repositoryIndicateurs, 'recupererLesIndicateursImpactsEquipementsRepository').mockResolvedValueOnce([])

    // WHEN
    const page = async () => renderComponent(await PageIndicateursCles(queryParams()))

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
