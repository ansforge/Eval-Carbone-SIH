import { screen } from '@testing-library/react'

import PageAccueil from '../../app/(both)/page'
import * as authentification from '../../authentification'
import { renderComponent } from '../../testShared'

describe('page d’accueil', () => {
  describe('en étant déconnecté', () => {
    it('quand j’affiche la page alors je peux me connecter', async () => {
      // GIVEN
      vi.spyOn(authentification, 'getProfilAtih').mockResolvedValueOnce({
        isAdmin: false,
        isConnected: false,
        nomEtablissement: '',
      })

      // WHEN
      renderComponent(await PageAccueil())

      // THEN
      const lienSeConnecter = screen.getByRole('link', { name: 'Se connecter' })
      expect(lienSeConnecter).toHaveAttribute('href', 'connexion')
    })
  })

  describe('en tant qu’utilisateur et connecté', () => {
    it('quand j’affiche la page alors je peux créer un inventaire', async () => {
      vi.spyOn(authentification, 'getProfilAtih').mockResolvedValueOnce({
        isAdmin: false,
        isConnected: true,
        nomEtablissement: 'HOPITAL 1K$$00000001K',
      })

      // WHEN
      renderComponent(await PageAccueil())

      // THEN
      const lienCreerUnInventaire = screen.getByRole('link', { name: 'Créer un inventaire' })
      expect(lienCreerUnInventaire).toHaveAttribute('href', 'creer-un-inventaire')
    })
  })

  describe('en tant qu’admin', () => {
    it('quand j’affiche la page alors je peux accéder aux inventaires', async () => {
      vi.spyOn(authentification, 'getProfilAtih').mockResolvedValueOnce({
        isAdmin: true,
        isConnected: true,
        nomEtablissement: 'HOPITAL 1K$$admin',
      })

      // WHEN
      renderComponent(await PageAccueil())

      // THEN
      const lienAccederAuxInventaires = screen.queryByRole('link', { name: 'Accéder aux inventaires' })
      expect(lienAccederAuxInventaires).toHaveAttribute('href', 'inventaires')
    })
  })
})
