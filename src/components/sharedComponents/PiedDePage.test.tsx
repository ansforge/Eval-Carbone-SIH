import { screen, within } from '@testing-library/react'

import PiedDePage from './PiedDePage'
import { renderComponent } from '../../testShared'

describe('composant pied de page', () => {
  it('quand j’affiche n’importe quel écran alors j’affiche les liens de pied de page', () => {
    // WHEN
    renderComponent(<PiedDePage />)

    // THEN
    const piedDePage = screen.getByRole('contentinfo')
    const menu = within(piedDePage).getByRole('list')
    const menuItems = within(menu).getAllByRole('listitem')
    expect(menuItems).toHaveLength(5)

    const lienAccessibilite = within(menuItems[0]).getByRole('link', { name: 'Accessibilité : non conforme' })
    expect(lienAccessibilite).toHaveAttribute('href', '/accessibilite')
    const lienEcoConception = within(menuItems[1]).getByRole('link', { name: 'Éco-conception' })
    expect(lienEcoConception).toHaveAttribute('href', '/eco-conception')
    const lienMentionsLegales = within(menuItems[2]).getByRole('link', { name: 'Mentions légales' })
    expect(lienMentionsLegales).toHaveAttribute('href', '/mentions-legales')
    const lienCgu = within(menuItems[3]).getByRole('link', { name: 'CGU' })
    expect(lienCgu).toHaveAttribute('href', '/cgu')
    const lienNousContacter = within(menuItems[4]).getByRole('link', { name: 'Nous contacter' })
    expect(lienNousContacter).toHaveAttribute('href', 'mailto:eval-carbone-sih@esante.gouv.fr')
  })
})
