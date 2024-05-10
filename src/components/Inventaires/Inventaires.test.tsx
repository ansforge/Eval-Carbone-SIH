import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import * as navigation from 'next/navigation'

import PageInventaires from '../../app/(connecte)/page'
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
        renderComponent(await PageInventaires())

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
        renderComponent(await PageInventaires())

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

      it('quand je clique pour supprimer un inventaire alors l’inventaire est supprimé et ne s’affiche plus', async () => {
        // GIVEN
        jeSuisUnUtilisateur()

        vi.spyOn(repositoryInventaires, 'recupererLesInventairesRepository').mockResolvedValueOnce([inventaireModelFactory()])
        vi.spyOn(navigation, 'useRouter')
          .mockReturnValueOnce(spyNextNavigation.useRouter)
          .mockReturnValueOnce(spyNextNavigation.useRouter)
        vi.spyOn(repositoryInventaires, 'supprimerUnInventaireRepository').mockResolvedValueOnce(new Date())

        renderComponent(await PageInventaires())

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
        expect(spyNextNavigation.useRouter.push).toHaveBeenCalledWith('/')
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

        vi.spyOn(repositoryInventaires, 'recupererLesInventairesRepository').mockResolvedValueOnce([])

        // WHEN
        renderComponent(await PageInventaires())

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

        vi.spyOn(repositoryInventaires, 'recupererLesInventairesRepository').mockResolvedValueOnce([
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
        renderComponent(await PageInventaires())

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

      it('quand j’affiche la page alors je n’ai pas accès à la duplication', async () => {
        // GIVEN
        jeSuisUnAdmin()

        vi.spyOn(repositoryInventaires, 'recupererLesInventairesRepository').mockResolvedValueOnce([
          inventaireModelFactory({
            id: 1,
            nomEtablissement: 'Hopital A$$00000001K',
            nomInventaire: 'mon inventaire A',
          }),
        ])

        // WHEN
        renderComponent(await PageInventaires())

        // THEN
        const listeInventaires = screen.getByRole('table')
        const rowgroup = within(listeInventaires).getAllByRole('rowgroup')
        const tbodyRows = within(rowgroup[1]).getAllByRole('row')

        const cellsRow1 = within(tbodyRows[0]).getAllByRole('cell')
        const lienDupliquer = within(cellsRow1[4]).queryByRole('link', { name: 'Dupliquer l’inventaire' })
        expect(lienDupliquer).not.toBeInTheDocument()
      })
    })
  })
})
