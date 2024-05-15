import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import * as navigation from 'next/navigation'

import PageInventaires from '../../app/(connecte)/(both)/inventaires/page'
import * as repositoryInventaires from '../../repositories/inventairesRepository'
import { FrozenDate, inventaireModelFactory, jeSuisUnAdmin, jeSuisUnUtilisateur, renderComponent, spyNextNavigation } from '../../testShared'

describe('page inventaires', () => {
  describe('en tant qu’utilisateur', () => {
    describe('et n’ayant pas d’inventaire', () => {
      it('quand j’affiche la page alors j’affiche l’accueil et je peux en créer un', async () => {
        // GIVEN
        jeSuisUnUtilisateur()

        vi.spyOn(repositoryInventaires, 'recupererLesInventairesRepository').mockResolvedValueOnce([])

        // WHEN
        renderComponent(await PageInventaires({}))

        // THEN
        const titre = screen.getByRole('heading', { level: 1 })
        expect(titre.textContent).contains('Inventaires')
        const liensCreerUnInventaire = screen.getAllByRole('link', { name: 'Créer un inventaire' })
        expect(liensCreerUnInventaire).toHaveLength(2)
        expect(liensCreerUnInventaire[0]).toHaveAttribute('href', 'creer-un-inventaire')
      })
    })

    describe('et ayant des inventaires', () => {
      it('quand j’affiche la page alors j’affiche tous les inventaires qui m’appartiennent', async () => {
        // GIVEN
        const nomEtablissement = jeSuisUnUtilisateur()

        vi.stubGlobal('Date', FrozenDate)
        vi.spyOn(repositoryInventaires, 'recupererLesInventairesRepository').mockResolvedValueOnce([
          inventaireModelFactory({
            id: 1,
            nomEtablissement,
            nomInventaire: 'mon inventaire traité',
            statut: 'TRAITE',
          }),
          inventaireModelFactory({
            id: 2,
            nomEtablissement,
            nomInventaire: 'mon inventaire non calculé',
            statut: 'EN_ATTENTE',
          }),
        ])

        // WHEN
        renderComponent(await PageInventaires({}))

        // THEN
        const tableInventaires = screen.getByRole('table')
        const rowgroup = within(tableInventaires).getAllByRole('rowgroup')
        const tbodyRows = within(rowgroup[1]).getAllByRole('row')
        expect(tbodyRows).toHaveLength(2)

        const cellsRow1 = within(tbodyRows[0]).getAllByRole('cell')
        const lien1 = within(cellsRow1[0]).getByRole('link', { name: 'mon inventaire traité' })
        expect(lien1).toHaveAttribute('href', '/indicateurs-cles?nomEtablissement=Hopital%20de%20Paris$$00000001K&nomInventaire=mon%20inventaire%20trait%C3%A9')
        expect(cellsRow1[1]).toHaveTextContent('Hopital de Paris')
        expect(cellsRow1[2]).toHaveTextContent('15/04/1996')
        expect(cellsRow1[3]).toHaveTextContent('CALCULÉ')
        const lienDupliquer = within(cellsRow1[4]).getByRole('link', { name: 'Dupliquer l’inventaire' })
        expect(lienDupliquer).toHaveAttribute('href', '/dupliquer-un-inventaire?nomInventaire=mon%20inventaire%20trait%C3%A9')
        expect(cellsRow1[4]).toHaveTextContent('Supprimer l’inventaire')

        const cellsRow2 = within(tbodyRows[1]).getAllByRole('cell')
        const lien2 = within(cellsRow2[0]).getByRole('link', { name: 'mon inventaire non calculé' })
        expect(lien2).toHaveAttribute('href', '/inventaire?nomEtablissement=Hopital%20de%20Paris$$00000001K&nomInventaire=mon%20inventaire%20non%20calcul%C3%A9&statut=NON%C2%A0CALCUL%C3%89')
        expect(cellsRow2[1]).toHaveTextContent('Hopital de Paris')
        expect(cellsRow2[2]).toHaveTextContent('15/04/1996')
        expect(cellsRow2[3]).toHaveTextContent('NON CALCULÉ')
        const lienDupliquer2 = within(cellsRow2[4]).getByRole('link', { name: 'Dupliquer l’inventaire' })
        expect(lienDupliquer2).toHaveAttribute('href', '/dupliquer-un-inventaire?nomInventaire=mon%20inventaire%20non%20calcul%C3%A9')
        expect(cellsRow2[4]).toHaveTextContent('Supprimer l’inventaire')
      })

      it('quand j’affiche la page alors je n’affiche pas la pagination', async () => {
        // GIVEN
        const nomEtablissement = jeSuisUnUtilisateur()

        vi.stubGlobal('Date', FrozenDate)
        vi.spyOn(repositoryInventaires, 'recupererLesInventairesRepository').mockResolvedValueOnce([
          inventaireModelFactory({
            id: 1,
            nomEtablissement,
            nomInventaire: 'mon inventaire traité',
            statut: 'TRAITE',
          }),
        ])

        // WHEN
        renderComponent(await PageInventaires({}))

        // THEN
        const navigation = screen.queryByRole('navigation', { name: 'Pagination' })
        expect(navigation).not.toBeInTheDocument()
      })

      it('quand j’affiche la page alors je ne peux pas télécharger l’export CSV', async () => {
        // GIVEN
        jeSuisUnUtilisateur()

        vi.spyOn(repositoryInventaires, 'recupererLesInventairesRepository').mockResolvedValueOnce([
          inventaireModelFactory({
            id: 1,
            nomEtablissement: 'Hopital A$$00000001K',
            nomInventaire: 'mon inventaire A',
          }),
        ])

        // WHEN
        renderComponent(await PageInventaires({}))

        // THEN
        const lienExporterLesInventaires = screen.queryByRole('link', { name: 'Exporter les inventaires' })
        expect(lienExporterLesInventaires).not.toBeInTheDocument()
      })

      it('quand j’affiche la page alors j’ai le bouton pour comparer deux inventaires mais il est désactivé', async () => {
        // GIVEN
        jeSuisUnUtilisateur()

        vi.spyOn(repositoryInventaires, 'recupererLesInventairesRepository').mockResolvedValueOnce([inventaireModelFactory()])

        // WHEN
        renderComponent(await PageInventaires({}))

        // THEN
        const buttonComparerDeuxInventaires = screen.getByRole('button', { name: 'Comparer deux inventaires' })
        expect(buttonComparerDeuxInventaires).toBeDisabled()
      })

      it('quand j’affiche la page alors je peux cocher que les inventaires calculés', async () => {
        // GIVEN
        jeSuisUnUtilisateur()

        vi.spyOn(repositoryInventaires, 'recupererLesInventairesRepository').mockResolvedValueOnce([
          inventaireModelFactory({
            id: 1,
            nomInventaire: 'mon premier inventaire',
            statut: 'TRAITE',
          }),
          inventaireModelFactory({
            id: 2,
            nomInventaire: 'mon deuxième inventaire',
            statut: 'EN_ATTENTE',
          }),
        ])

        // WHEN
        renderComponent(await PageInventaires({}))

        // THEN
        const checkboxInventaire1 = screen.getByLabelText('mon premier inventaire')
        expect(checkboxInventaire1).toBeInTheDocument()
        const checkboxInventaire2 = screen.queryByLabelText('mon deuxième inventaire')
        expect(checkboxInventaire2).not.toBeInTheDocument()
      })

      it('quand je sélectionne un seul inventaire calculé pour comparaison alors le bouton pour comparer deux inventaires est toujours désactivé', async () => {
        // GIVEN
        jeSuisUnUtilisateur()

        vi.spyOn(repositoryInventaires, 'recupererLesInventairesRepository').mockResolvedValueOnce([
          inventaireModelFactory({
            statut: 'TRAITE',
          }),
        ])

        renderComponent(await PageInventaires({}))
        const checkboxInventaire1 = screen.getByLabelText('mon super inventaire')

        // WHEN
        fireEvent.click(checkboxInventaire1)

        // THEN
        const buttonComparerDeuxInventaires = screen.getByRole('button', { name: 'Comparer deux inventaires' })
        expect(buttonComparerDeuxInventaires).toBeDisabled()
      })

      it('quand je sélectionne deux inventaires calculés pour comparaison alors le bouton pour comparer deux inventaires est activé', async () => {
        // GIVEN
        const nomEtablissement = jeSuisUnUtilisateur()

        vi.spyOn(repositoryInventaires, 'recupererLesInventairesRepository').mockResolvedValueOnce([
          inventaireModelFactory({
            id: 1,
            nomEtablissement,
            nomInventaire: 'mon premier inventaire',
            statut: 'TRAITE',
          }),
          inventaireModelFactory({
            id: 2,
            nomEtablissement,
            nomInventaire: 'mon deuxième inventaire',
            statut: 'TRAITE',
          }),
          inventaireModelFactory({
            id: 3,
            nomEtablissement,
            nomInventaire: 'mon troisième inventaire',
            statut: 'TRAITE',
          }),
        ])

        renderComponent(await PageInventaires({}))

        // WHEN
        const checkboxInventaire1 = screen.getByLabelText('mon premier inventaire')
        fireEvent.click(checkboxInventaire1)
        const checkboxInventaire3 = screen.getByLabelText('mon troisième inventaire')
        fireEvent.click(checkboxInventaire3)

        // THEN
        const buttonComparerDeuxInventaires = screen.getByRole('button', { name: 'Comparer deux inventaires' })
        expect(buttonComparerDeuxInventaires).toBeEnabled()
      })

      it('quand je clique sur le bouton comparer deux inventaires alors je vais sur la page de comparaison', async () => {
        // GIVEN
        const nomEtablissement = jeSuisUnUtilisateur()

        vi.spyOn(repositoryInventaires, 'recupererLesInventairesRepository').mockResolvedValueOnce([
          inventaireModelFactory({
            id: 1,
            nomEtablissement,
            nomInventaire: 'mon premier inventaire',
            statut: 'TRAITE',
          }),
          inventaireModelFactory({
            id: 2,
            nomEtablissement,
            nomInventaire: 'mon deuxième inventaire',
            statut: 'TRAITE',
          }),
        ])
        vi.spyOn(navigation, 'useRouter').mockReturnValue(spyNextNavigation.useRouter)

        renderComponent(await PageInventaires({}))
        const checkboxInventaire1 = screen.getByLabelText('mon premier inventaire')
        fireEvent.click(checkboxInventaire1)
        const checkboxInventaire2 = screen.getByLabelText('mon deuxième inventaire')
        fireEvent.click(checkboxInventaire2)
        fireEvent.click(checkboxInventaire2)
        fireEvent.click(checkboxInventaire2)

        // WHEN
        const boutonComparerDeuxInventaires = screen.getByRole('button', { name: 'Comparer deux inventaires' })
        fireEvent.click(boutonComparerDeuxInventaires)

        // THEN
        expect(spyNextNavigation.useRouter.push).toHaveBeenCalledWith('http://localhost:3000/tableau-comparatif?inventaireReference=mon+premier+inventaire&inventaireCompare=mon+deuxi%C3%A8me+inventaire')
      })

      it('quand je clique pour supprimer un inventaire alors l’inventaire est supprimé et ne s’affiche plus', async () => {
        // GIVEN
        jeSuisUnUtilisateur()

        vi.spyOn(repositoryInventaires, 'recupererLesInventairesRepository').mockResolvedValueOnce([inventaireModelFactory()])
        vi.spyOn(navigation, 'useRouter').mockReturnValue(spyNextNavigation.useRouter)
        vi.spyOn(repositoryInventaires, 'supprimerUnInventaireRepository').mockResolvedValueOnce(new Date())

        renderComponent(await PageInventaires({}))

        const poubelle = screen.getByRole('button', { name: 'Supprimer l’inventaire' })
        fireEvent.click(poubelle)

        // WHEN
        const modale = screen.getByRole('dialog', { name: 'Supprimer l’inventaire' })
        const boutonSupprimer = within(modale).getByRole('button', { name: 'Supprimer l’inventaire' })
        fireEvent.click(boutonSupprimer)

        // THEN
        await waitFor(() => {
          expect(repositoryInventaires.supprimerUnInventaireRepository).toHaveBeenCalledWith('Hopital de Paris$$00000001K', 'mon super inventaire')
        })
        expect(spyNextNavigation.useRouter.push).toHaveBeenCalledWith('/inventaires')
        expect(spyNextNavigation.useRouter.refresh).toHaveBeenCalledWith()
        const titreModale = within(modale).queryByRole('heading', { level: 1, name: 'Supprimer l’inventaire' })
        expect(titreModale).not.toBeInTheDocument()
      })
    })
  })

  describe('en tant qu’admin', () => {
    describe('et aucun inventaire n’existe', () => {
      it('quand j’affiche la page alors j’affiche l’accueil et je ne peux pas en créer un', async () => {
        // GIVEN
        jeSuisUnAdmin()

        vi.spyOn(repositoryInventaires, 'recupererLesInventairesPaginesRepository').mockResolvedValueOnce([])

        // WHEN
        renderComponent(await PageInventaires({}))

        // THEN
        const titre = screen.getByRole('heading', { level: 2 })
        expect(titre.textContent).contains('Créez un inventaire de votre parc informatique')
        const lienCreerUnInventaire = screen.queryByRole('link', { name: 'Créer un inventaire' })
        expect(lienCreerUnInventaire).not.toBeInTheDocument()
      })
    })

    describe('et des inventaires existent', () => {
      it('quand j’affiche la page alors j’affiche tous les inventaires de tous les établissements', async () => {
        // GIVEN
        jeSuisUnAdmin()

        vi.spyOn(repositoryInventaires, 'recupererLesInventairesPaginesRepository').mockResolvedValueOnce([
          inventaireModelFactory({
            id: 1,
            nomEtablissement: 'Hopital A$$00000001K',
            nomInventaire: 'mon inventaire A',
          }),
          inventaireModelFactory({
            id: 2,
            nomEtablissement: 'Hopital B$$00000001J',
            nomInventaire: 'mon inventaire B',
          }),
        ])

        // WHEN
        renderComponent(await PageInventaires({}))

        // THEN
        const listeInventaires = screen.getByRole('table')
        const rowgroup = within(listeInventaires).getAllByRole('rowgroup')
        const tbodyRows = within(rowgroup[1]).getAllByRole('row')
        expect(tbodyRows).toHaveLength(2)

        const cellsRow1 = within(tbodyRows[0]).getAllByRole('cell')
        const lien1 = within(cellsRow1[0]).getByRole('link', { name: 'mon inventaire A' })
        expect(lien1).toHaveAttribute('href', '/indicateurs-cles?nomEtablissement=Hopital%20A$$00000001K&nomInventaire=mon%20inventaire%20A')
        expect(cellsRow1[1]).toHaveTextContent('Hopital A')

        const cellsRow2 = within(tbodyRows[1]).getAllByRole('cell')
        const lien2 = within(cellsRow2[0]).getByRole('link', { name: 'mon inventaire B' })
        expect(lien2).toHaveAttribute('href', '/indicateurs-cles?nomEtablissement=Hopital%20B$$00000001J&nomInventaire=mon%20inventaire%20B')
        expect(cellsRow2[1]).toHaveTextContent('Hopital B')
      })

      it('quand j’affiche la page alors j’affiche la pagination', async () => {
        // GIVEN
        jeSuisUnAdmin()

        vi.spyOn(repositoryInventaires, 'recupererLesInventairesPaginesRepository').mockResolvedValueOnce([
          inventaireModelFactory({
            id: 1,
            nomEtablissement: 'Hopital A$$00000001K',
            nomInventaire: 'mon inventaire A',
          }),
        ])
        vi.spyOn(repositoryInventaires, 'recupererLeTotalInventairesRepository').mockResolvedValueOnce(2)

        // WHEN
        renderComponent(await PageInventaires({}))

        // THEN
        const navigation = screen.getByRole('navigation', { name: 'Pagination' })
        const menu = within(navigation).getByRole('list')
        const menuItems = within(menu).getAllByRole('listitem')
        expect(menuItems).toHaveLength(3)
        const lienPagePrecedente = within(menuItems[0]).getByRole('link', { name: 'Page précédente' })
        expect(lienPagePrecedente).toHaveAttribute('href', '/inventaires')
        expect(menuItems[1]).toHaveTextContent('Page courante 1')
        expect(menuItems[1]).toHaveAttribute('aria-current', 'page')
        const lienPageSuivante = within(menuItems[2]).getByRole('link', { name: 'Page suivante' })
        expect(lienPageSuivante).toHaveAttribute('href', '/inventaires?page=0')
      })

      it('quand j’affiche la page alors je n’ai pas accès à la duplication', async () => {
        // GIVEN
        jeSuisUnAdmin()

        vi.spyOn(repositoryInventaires, 'recupererLesInventairesPaginesRepository').mockResolvedValueOnce([inventaireModelFactory()])
        vi.spyOn(repositoryInventaires, 'recupererLeTotalInventairesRepository').mockResolvedValueOnce(2)

        // WHEN
        renderComponent(await PageInventaires({}))

        // THEN
        const listeInventaires = screen.getByRole('table')
        const rowgroup = within(listeInventaires).getAllByRole('rowgroup')
        const tbodyRows = within(rowgroup[1]).getAllByRole('row')

        const cellsRow1 = within(tbodyRows[0]).getAllByRole('cell')
        const lienDupliquer = within(cellsRow1[4]).queryByRole('link', { name: 'Dupliquer l’inventaire' })
        expect(lienDupliquer).not.toBeInTheDocument()
      })

      it('quand j’affiche la page alors je n’ai pas accès à la comparaison de deux inventaires', async () => {
        // GIVEN
        jeSuisUnAdmin()

        vi.spyOn(repositoryInventaires, 'recupererLesInventairesRepository').mockResolvedValueOnce([inventaireModelFactory()])

        // WHEN
        renderComponent(await PageInventaires({}))

        // THEN
        const buttonComparerDeuxInventaires = screen.queryByRole('button', { name: 'Comparer deux inventaires' })
        expect(buttonComparerDeuxInventaires).not.toBeInTheDocument()
        const checkboxInventaire1 = screen.queryByLabelText('mon super inventaire')
        expect(checkboxInventaire1).not.toBeInTheDocument()
      })

      it('quand j’affiche la page alors je télécharge l’export CSV', async () => {
        // GIVEN
        jeSuisUnAdmin()

        vi.spyOn(repositoryInventaires, 'recupererLesInventairesPaginesRepository').mockResolvedValueOnce([
          inventaireModelFactory({
            id: 1,
            nomEtablissement: 'Hopital A$$00000001K',
            nomInventaire: 'mon inventaire A',
          }),
        ])
        vi.spyOn(repositoryInventaires, 'recupererLeTotalInventairesRepository').mockResolvedValueOnce(2)

        // WHEN
        renderComponent(await PageInventaires({}))

        // THEN
        const lienExporterLesInventaires = screen.getByRole('link', { name: 'Exporter les inventaires' })
        expect(lienExporterLesInventaires).toHaveAttribute('href', '/api/exporter-les-inventaires')
      })
    })
  })
})
