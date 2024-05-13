import { fireEvent, screen, within } from '@testing-library/react'
import * as nextAuth from 'next-auth/react'

import EnTete from './EnTete'
import { ProfilAtih } from '../../authentification'
import { renderComponent, spyPasrel } from '../../testShared'

describe('en-tête', () => {
  describe('en étant connecté', () => {
    describe('en tant qu’utilisateur', () => {
      it('quand j’affiche une page quelconque alors je ne vois que 3 liens', () => {
        // WHEN
        renderComponent(<EnTete profil={jeSuisUnUtilisateur()} />)

        // THEN
        const header = screen.getByRole('banner')
        const navigation = within(header).getByRole('navigation', { name: 'Menu principal' })
        const menu = within(navigation).getByRole('list')
        const menuItems = within(menu).getAllByRole('listitem')
        expect(menuItems).toHaveLength(4)

        const lienAccueil = within(menuItems[0]).getByRole('link', { name: 'Accueil' })
        expect(lienAccueil).toHaveAttribute('href', '/')
        const lienInventaires = within(menuItems[1]).getByRole('link', { name: 'Inventaires' })
        expect(lienInventaires).toHaveAttribute('href', '/inventaires')
        const lienFaq = within(menuItems[2]).getByRole('link', { name: 'FAQ' })
        expect(lienFaq).toHaveAttribute('href', '/faq')

        const boutonSeDeconnecter = within(menuItems[3]).getByRole('button', { name: 'Se déconnecter' })
        expect(boutonSeDeconnecter).toBeInTheDocument()

        const lienSeConnecter = within(menu).queryByRole('link', { name: 'Se connecter' })
        expect(lienSeConnecter).not.toBeInTheDocument()
      })

      it('quand je clique sur se déconnecter alors je me déconnecte', () => {
        // GIVEN
        vi.spyOn(nextAuth, 'signOut').mockResolvedValueOnce({ url: '' })

        renderComponent(<EnTete profil={jeSuisUnUtilisateur()} />)

        // WHEN
        const boutonSeDeconnecter = screen.getByRole('button', { name: 'Se déconnecter' })
        fireEvent.click(boutonSeDeconnecter)

        // THEN
        expect(nextAuth.signOut).toHaveBeenCalledOnce()
      })
    })

    describe('en tant qu’admin', () => {
      it('quand j’affiche une page quelconque alors je vois en plus le lien référentiels', () => {
        // WHEN
        renderComponent(<EnTete profil={jeSuisAdmin()} />)

        // THEN
        const menuItems = screen.getAllByRole('listitem')
        expect(menuItems).toHaveLength(5)

        const lienReferentiels = within(menuItems[3]).getByRole('link', { name: 'Référentiels' })
        expect(lienReferentiels).toHaveAttribute('href', '/modifier-un-referentiel')
      })
    })
  })

  describe('en étant déconnecté', () => {
    it('quand j’affiche une page quelconque alors je peux m’authentifier', () => {
      // GIVEN
      vi.spyOn(nextAuth, 'signIn').mockImplementationOnce(vi.fn())

      renderComponent(
        <EnTete
          profil={jeSuiDeconnecte()}
          providers={spyPasrel}
        />
      )
      const menuItems = screen.getAllByRole('listitem')
      const boutonSeConnecter = within(menuItems[2]).getByRole('button', { name: 'Se connecter' })

      // WHEN
      fireEvent.click(boutonSeConnecter)

      // THEN
      expect(menuItems).toHaveLength(3)
      expect(nextAuth.signIn).toHaveBeenCalledWith('pasrel')
    })

    it('quand j’affiche une page quelconque alors je n’ai pas accès à la déconnexion', () => {
      // WHEN
      renderComponent(
        <EnTete
          profil={jeSuiDeconnecte()}
          providers={spyPasrel}
        />
      )

      // THEN
      const boutonSeDeconnecter = screen.queryByRole('button', { name: 'Se déconnecter' })
      expect(boutonSeDeconnecter).not.toBeInTheDocument()
    })

    it('quand j’affiche une page quelconque alors je n’ai pas accès au lien de mes inventaires', () => {
      // WHEN
      renderComponent(
        <EnTete
          profil={jeSuiDeconnecte()}
          providers={spyPasrel}
        />
      )

      // THEN
      const lienInventaires = screen.queryByRole('link', { name: 'Inventaires' })
      expect(lienInventaires).not.toBeInTheDocument()
    })
  })
})

function jeSuisUnUtilisateur(): ProfilAtih {
  return {
    isAdmin: false,
    isConnected: true,
    nomEtablissement: 'HOPITAL 1K$$00000001K',
  }
}

function jeSuisAdmin(): ProfilAtih {
  return {
    isAdmin: true,
    isConnected: true,
    nomEtablissement: 'HOPITAL 1K$$admin',
  }
}

function jeSuiDeconnecte(): ProfilAtih {
  return {
    isAdmin: false,
    isConnected: false,
    nomEtablissement: '',
  }
}
