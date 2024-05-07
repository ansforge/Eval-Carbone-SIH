import { inventaireModel } from '@prisma/client'
import { fireEvent, screen } from '@testing-library/react'
import * as navigation from 'next/navigation'

import PageModifierLeNomInventaire from '../../app/(connecte)/modifier-le-nom-inventaire/page'
import * as repository from '../../gateways/inventairesRepository'
import { jeSuisUnUtilisateur, renderComponent } from '../../testShared'

describe('page modifier le nom de linventaire', () => {
  describe('en tant qu’utilisateur', () => {
    it('quand j’affiche la page alors j’ai le nom de l’inventaire prérempli et je ne peux pas valider le formulaire', () => {
      // GIVEN
      jeSuisUnUtilisateur()

      // WHEN
      renderComponent(PageModifierLeNomInventaire(queryParams()))

      // THEN
      const champNomInventaire = screen.getByLabelText('Nom de l’inventaire (minimum 4 caractères)')
      expect(champNomInventaire).toHaveValue('Centre hospitalier')

      const boutonModifier = screen.getByRole('button', { name: 'Modifier' })
      expect(boutonModifier).toBeDisabled()
    })

    it('quand j’écris un nom d’inventaire inférieur à 4 caractères alors je ne peux pas créer la simulation', () => {
      // GIVEN
      jeSuisUnUtilisateur()
      renderComponent(PageModifierLeNomInventaire(queryParams()))
      const champNomInventaire = screen.getByLabelText('Nom de l’inventaire (minimum 4 caractères)')

      // WHEN
      fireEvent.change(champNomInventaire, { target: { value: '???' } })

      // THEN
      const boutonModifier = screen.getByRole('button', { name: 'Modifier' })
      expect(boutonModifier).toBeDisabled()
    })

    it('quand je valide le formulaire avec un nom d’inventaire qui existe déjà alors j’ai un message d’erreur', async () => {
      // GIVEN
      vi.spyOn(repository, 'recupererUnInventaireRepository').mockResolvedValueOnce({} as inventaireModel)
      jeSuisUnUtilisateur()
      renderComponent(PageModifierLeNomInventaire(queryParams()))
      const champNomInventaire = screen.getByLabelText('Nom de l’inventaire (minimum 4 caractères)')
      fireEvent.change(champNomInventaire, { target: { value: 'nom inventaire dejà exitant' } })
      const boutonModifier = screen.getByRole('button', { name: 'Modifier' })

      // WHEN
      fireEvent.click(boutonModifier)

      // THEN
      const champNomInventaireMaj = await screen.findByLabelText('Nom de l’inventaire (minimum 4 caractères)')
      expect(champNomInventaireMaj).toHaveAttribute('aria-describedby', 'formInputError-error')
      expect(champNomInventaireMaj).toHaveAttribute('aria-invalid', 'true')

      const textErreur = await screen.findByText('Cet inventaire existe déjà. Modifiez le nom de l’inventaire pour continuer.', { selector: 'p' })
      expect(textErreur).toBeInTheDocument()
    })

    it('quand je valide le formulaire avec un nom d’inventaire qui n’existe pas alors je reviens en arrière', () => {
      // GIVEN
      vi.spyOn(repository, 'recupererUnInventaireRepository').mockResolvedValueOnce(null)
      vi.spyOn(repository, 'modifierLeNomInventaireRepository').mockResolvedValueOnce()
      jeSuisUnUtilisateur()
      renderComponent(PageModifierLeNomInventaire(queryParams()))

      const champNomInventaire = screen.getByLabelText('Nom de l’inventaire (minimum 4 caractères)')
      fireEvent.change(champNomInventaire, { target: { value: 'nom inventaire correct' } })
      const boutonModifier = screen.getByRole('button', { name: 'Modifier' })

      // WHEN
      fireEvent.click(boutonModifier)

      // THEN
      expect(navigation.useRouter).toHaveBeenCalledWith()
      // expect(navigation.useRouter.back).toHaveBeenCalledWith()
    })
  })

  it('quand il n’y a pas de nom d’inventaire dans l’url alors je n’y ai pas accès', () => {
    // GIVEN
    const queryParams = {}

    // WHEN
    const page = () => renderComponent(PageModifierLeNomInventaire(queryParams))

    // THEN
    expect(page).toThrow('NEXT_NOT_FOUND')
  })
})

export function queryParams(): { searchParams: { nomEtablissement: string; nomInventaire: string } } {
  return {
    searchParams: {
      nomEtablissement: 'Hopital 1K',
      nomInventaire: 'Centre hospitalier',
    },
  }
}
