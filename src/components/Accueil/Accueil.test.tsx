import { fireEvent, screen } from '@testing-library/react'
import * as nextAuth from 'next-auth/react'

import PageAccueil from '../../app/(both)/page'
import * as authentification from '../../authentification'
import { renderComponent, spyPasrel } from '../../testShared'

describe('page d’accueil', () => {
  describe('en étant déconnecté', () => {
    it('quand j’affiche la page alors je peux m’authentifier', async () => {
      // GIVEN
      vi.spyOn(authentification, 'getProfilAtih').mockResolvedValueOnce({
        isAdmin: false,
        isConnected: false,
        nomEtablissement: '',
      })
      // @ts-expect-error
      vi.spyOn(nextAuth, 'getProviders').mockResolvedValueOnce(spyPasrel)
      vi.spyOn(nextAuth, 'signIn').mockImplementationOnce(vi.fn())

      renderComponent(await PageAccueil())
      const boutonSeConnecter = screen.getByRole('button', { name: 'Se connecter' })

      // WHEN
      fireEvent.click(boutonSeConnecter)

      // THEN
      expect(nextAuth.signIn).toHaveBeenCalledWith('pasrel')
    })
  })

  describe('en tant qu’utilisateur et étant connecté', () => {
    it('quand j’affiche la page alors je peux créer un inventaire', async () => {
      vi.spyOn(authentification, 'getProfilAtih').mockResolvedValueOnce({
        isAdmin: false,
        isConnected: true,
        nomEtablissement: 'HOPITAL 1K$$00000001K',
      })

      // WHEN
      renderComponent(await PageAccueil())

      // THEN
      const lienAccederAuxInventaires = screen.queryByRole('link', { name: 'Accéder aux inventaires' })
      expect(lienAccederAuxInventaires).not.toBeInTheDocument()
      const lienCreerUnInventaire = screen.getByRole('link', { name: 'Créer un inventaire' })
      expect(lienCreerUnInventaire).toHaveAttribute('href', 'creer-un-inventaire')
    })
  })

  describe('en tant qu’admin et étant connecté', () => {
    it('quand j’affiche la page alors je peux accéder aux inventaires', async () => {
      vi.spyOn(authentification, 'getProfilAtih').mockResolvedValueOnce({
        isAdmin: true,
        isConnected: true,
        nomEtablissement: 'HOPITAL 1K$$admin',
      })

      // WHEN
      renderComponent(await PageAccueil())

      // THEN
      const lienAccederAuxInventaires = screen.getByRole('link', { name: 'Accéder aux inventaires' })
      expect(lienAccederAuxInventaires).toHaveAttribute('href', 'inventaires')
      const lienCreerUnInventaire = screen.queryByRole('link', { name: 'Créer un inventaire' })
      expect(lienCreerUnInventaire).not.toBeInTheDocument()
    })
  })
})
