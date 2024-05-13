import { screen, within } from '@testing-library/react'

import AccesRapide from './AccesRapide'
import { renderComponent } from '../../testShared'

describe('composant accès rapide', () => {
  it('quand j’affiche n’importe quel écran alors j’affiche le menu d’accès rapide pour des raisons d’accessibilité', () => {
    // WHEN
    renderComponent(<AccesRapide />)

    // THEN
    const navigation = screen.getByRole('navigation', { name: 'Accès rapides' })
    const menu = within(navigation).getByRole('list')
    const menuItems = within(menu).getAllByRole('listitem')
    expect(menuItems).toHaveLength(2)
    expect(menuItems[0]).toHaveTextContent('Aller au contenu')
    expect(menuItems[1]).toHaveTextContent('Aller à la navigation')
  })
})
