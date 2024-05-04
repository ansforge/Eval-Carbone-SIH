import { inventaireModel } from '@prisma/client'
import { screen, within } from '@testing-library/react'

import PageInventaires from '../../app/(connecte)/page'
import * as inventairesRepository from '../../gateways/inventairesRepository'
import { jeSuisUnAdmin, jeSuisUnUtilisateur, renderComponent } from '../../testShared'

describe('page inventaires', () => {
  describe('en tant qu’utilisateur', () => {
    it('quand je n’ai pas d’inventaire alors j’affiche l’accueil et je peux en créer un', async () => {
      // GIVEN
      jeSuisUnUtilisateur()
      vi.spyOn(inventairesRepository, 'recupererLesInventairesRepository').mockResolvedValueOnce([])

      // WHEN
      renderComponent(await PageInventaires())

      // THEN
      const titre = screen.getByRole('heading', { level: 1 })
      expect(titre.textContent).contains('Inventaires')
      const liensCreerUnInventaire = screen.getAllByRole('link', { name: 'Créer un inventaire' })
      expect(liensCreerUnInventaire).toHaveLength(2)
      expect(liensCreerUnInventaire[0]).toHaveAttribute('href', 'creer-un-inventaire')
    })

    it('quand j’affiche la page alors j’affiche tous les inventaires qui m’appartiennent', async () => {
      // GIVEN
      const nomEtablissement = jeSuisUnUtilisateur()
      const date = new Date()
      const inventaireTraite: inventaireModel = {
        dateCreation: date,
        dateInventaire: date,
        dateMiseAJour: date,
        id: 1,
        nomEtablissement,
        nomInventaire: 'mon inventaire traité',
        statut: 'TRAITE',
      }
      const inventaireEnAttente: inventaireModel = {
        dateCreation: date,
        dateInventaire: date,
        dateMiseAJour: date,
        id: 2,
        nomEtablissement,
        nomInventaire: 'mon inventaire non calculé',
        statut: 'EN_ATTENTE',
      }
      vi.spyOn(inventairesRepository, 'recupererLesInventairesRepository').mockResolvedValueOnce([inventaireTraite, inventaireEnAttente])

      // WHEN
      renderComponent(await PageInventaires())

      // THEN
      const listeInventaires = screen.getByRole('table')
      const rowgroup = within(listeInventaires).getAllByRole('rowgroup')
      const tbodyRows = within(rowgroup[1]).getAllByRole('row')

      const cellsRow1 = within(tbodyRows[0]).getAllByRole('cell')
      const lien1 = within(cellsRow1[0]).getByRole('link', { name: 'mon inventaire traité' })
      expect(lien1).toHaveAttribute('href', '/indicateurs-cles?nomEtablissement=Centre%20Hospitalier%20de%20test$$fakeNumeroFiness&nomInventaire=mon%20inventaire%20trait%C3%A9')
      expect(cellsRow1[1]).toHaveTextContent('Centre Hospitalier de test')
      expect(cellsRow1[2]).toHaveTextContent(date.toLocaleDateString('fr-FR'))
      expect(cellsRow1[3]).toHaveTextContent('CALCULÉ')
      expect(cellsRow1[4]).toHaveTextContent('Supprimer un inventaire')

      const cellsRow2 = within(tbodyRows[1]).getAllByRole('cell')
      const lien2 = within(cellsRow2[0]).getByRole('link', { name: 'mon inventaire non calculé' })
      expect(lien2).toHaveAttribute('href', '/inventaire?nomEtablissement=Centre%20Hospitalier%20de%20test$$fakeNumeroFiness&nomInventaire=mon%20inventaire%20non%20calcul%C3%A9&statut=NON%20CALCUL%C3%89')
      expect(cellsRow2[1]).toHaveTextContent('Centre Hospitalier de test')
      expect(cellsRow2[2]).toHaveTextContent(date.toLocaleDateString('fr-FR'))
      expect(cellsRow2[3]).toHaveTextContent('NON CALCULÉ')
      expect(cellsRow2[4]).toHaveTextContent('Supprimer un inventaire')
    })
  })

  describe('en tant qu’admin', () => {
    it('quand je n’ai pas d’inventaire alors j’affiche l’accueil et je ne peux pas en créer un', async () => {
      // GIVEN
      jeSuisUnAdmin()
      vi.spyOn(inventairesRepository, 'recupererLesInventairesRepository').mockResolvedValueOnce([])

      // WHEN
      renderComponent(await PageInventaires())

      // THEN
      const titre = screen.getByRole('heading', { level: 2 })
      expect(titre.textContent).contains('Créez un inventaire de votre parc informatique')
      const lienCreerUnInventaire = screen.queryByRole('link', { name: 'Créer un inventaire' })
      expect(lienCreerUnInventaire).not.toBeInTheDocument()
    })
  })
})
