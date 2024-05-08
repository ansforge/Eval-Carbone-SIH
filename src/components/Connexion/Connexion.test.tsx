import { fireEvent, screen } from '@testing-library/react'
// import * as navigation from 'next/navigation'
// import * as nextAuth from 'next-auth'
import * as nextAuthReact from 'next-auth/react'

import PageConnexion from '../../app/(deconnecte)/connexion/page'
import * as authentification from '../../authentification'
import { renderComponent } from '../../testShared'

describe('page de connexion', () => {
  // describe('en étant connecté', () => {
  //   it('quand j’affiche une page quelconque alors je suis redirigé vers l’accueil', async () => {
  //     // GIVEN
  //     vi.spyOn(nextAuth, 'getServerSession').mockResolvedValueOnce({} as nextAuth.Session)
  //     vi.spyOn(navigation, 'redirect').mockImplementationOnce(vi.fn())

  //     // WHEN
  //     renderComponent(await PageConnexion())

  //     // THEN
  //     expect(navigation.redirect).toHaveBeenCalledWith('/')
  //   })
  // })

  describe('en étant déconnecté', () => {
    it('quand je clique sur me connecter alors je me connecte', async () => {
      // GIVEN
      vi.spyOn(authentification, 'checkIfConnected').mockImplementationOnce(vi.fn())
      // @ts-expect-error
      vi.spyOn(nextAuthReact, 'getProviders').mockResolvedValueOnce({
        pasrel: {
          callbackUrl: 'http://localhost:3000/api/auth/callback/pasrel',
          id: 'pasrel',
          name: 'Pasrel',
          signinUrl: 'http://localhost:3000/api/auth/signin/pasrel',
          type: 'oauth',
        },
      })
      vi.spyOn(nextAuthReact, 'signIn').mockImplementationOnce(vi.fn())
      renderComponent(await PageConnexion())
      const boutonSeConnecter = screen.getByRole('button', { name: 'Se connecter avec Plage' })

      // WHEN
      fireEvent.click(boutonSeConnecter)

      // THEN
      expect(nextAuthReact.signIn).toHaveBeenCalledWith('pasrel')
    })
  })
})
