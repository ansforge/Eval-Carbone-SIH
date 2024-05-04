import { fireEvent, screen, within } from '@testing-library/react'
import * as nextAuth from 'next-auth/react'

import EnTete from './EnTete'
import { renderComponent } from '../../testShared'

describe('en-tête', () => {
  describe('en étant connecté', () => {
    describe('en tant qu’utilisateur', () => {
      it('quand j’affiche une page quelconque alors je ne vois que 3 liens', () => {
        // GIVEN
        const session = {
          isAdmin: false,
          nomEtablissement: 'fakeNom$$fakeNumeroFiness',
        }

        // WHEN
        renderComponent(<EnTete session={session} />)

        // THEN
        const header = screen.getByRole('banner')
        const navigation = within(header).getByRole('navigation', { name: 'Menu principal' })
        const list = within(navigation).getByRole('list')
        const listItems = within(list).getAllByRole('listitem')
        expect(listItems).toHaveLength(3)
        expect(listItems[0]).toHaveTextContent('Inventaires')
        expect(listItems[1]).toHaveTextContent('FAQ')

        const boutonSeDeconnecter = within(listItems[2]).getByRole('button', { name: 'Se déconnecter' })
        expect(boutonSeDeconnecter).toBeInTheDocument()
      })

      it('quand je clique sur se déconnecter alors je me déconnecte', () => {
        // GIVEN
        vi.spyOn(nextAuth, 'signOut').mockResolvedValueOnce({ url: '' })
        const session = {
          isAdmin: false,
          nomEtablissement: 'fakeNom$$fakeNumeroFiness',
        }
        renderComponent(<EnTete session={session} />)
        const boutonSeDeconnecter = screen.getByRole('button', { name: 'Se déconnecter' })

        // WHEN
        fireEvent.click(boutonSeDeconnecter)

        // THEN
        expect(nextAuth.signOut).toHaveBeenCalledOnce()
      })
    })

    describe('en tant qu’admin', () => {
      it('quand j’affiche une page quelconque alors je vois en plus le lien référentiels', () => {
        // GIVEN
        const session = {
          isAdmin: true,
          nomEtablissement: 'fakeNom$$admin',
        }

        // WHEN
        renderComponent(<EnTete session={session} />)

        // THEN
        const listItems = screen.getAllByRole('listitem')
        expect(listItems).toHaveLength(4)
        expect(listItems[2]).toHaveTextContent('Référentiels')
      })
    })
  })

  describe('en étant déconnecté', () => {
    it('quand j’affiche une page quelconque alors je n’ai pas accès à la déconnexion', () => {
      // WHEN
      renderComponent(<EnTete />)

      // THEN
      const listItems = screen.getAllByRole('listitem')
      expect(listItems).toHaveLength(2)

      const boutonSeDeconnecter = screen.queryByRole('button', { name: 'Se déconnecter' })
      expect(boutonSeDeconnecter).not.toBeInTheDocument()
    })
  })
})
