import { fireEvent, screen, waitFor } from '@testing-library/react'
import * as navigation from 'next/navigation'

import PageModifierLeNomInventaire from '../../app/(connecte)/(both)/modifier-le-nom-inventaire/page'
import * as repositoryInventaires from '../../repositories/inventairesRepository'
import { inventaireModelFactory, jeSuisUnAdmin, jeSuisUnUtilisateur, nomEtablissementFake, renderComponent, spyNextNavigation } from '../../testShared'

describe('page modifier le nom de l’inventaire', () => {
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

      // WHEN
      const champNomInventaire = screen.getByLabelText('Nom de l’inventaire (minimum 4 caractères)')
      fireEvent.change(champNomInventaire, { target: { value: '???' } })

      // THEN
      const boutonModifier = screen.getByRole('button', { name: 'Modifier' })
      expect(boutonModifier).toBeDisabled()
    })

    it('quand je valide le formulaire avec un nom d’inventaire qui existe déjà alors j’ai un message d’erreur', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      vi.spyOn(repositoryInventaires, 'recupererUnInventaireRepository').mockResolvedValueOnce(inventaireModelFactory())

      renderComponent(PageModifierLeNomInventaire(queryParams()))

      const champNomInventaire = screen.getByLabelText('Nom de l’inventaire (minimum 4 caractères)')
      fireEvent.change(champNomInventaire, { target: { value: 'nom inventaire dejà exitant' } })

      // WHEN
      const boutonModifier = screen.getByRole('button', { name: 'Modifier' })
      fireEvent.click(boutonModifier)

      // THEN
      const champNomInventaireMaj = await screen.findByLabelText('Nom de l’inventaire (minimum 4 caractères)')
      expect(champNomInventaireMaj).toHaveAttribute('aria-describedby', 'formInputError-error')
      expect(champNomInventaireMaj).toHaveAttribute('aria-invalid', 'true')

      const textErreur = await screen.findByText('Cet inventaire existe déjà. Modifiez le nom de l’inventaire pour continuer.', { selector: 'p' })
      expect(textErreur).toBeInTheDocument()

      expect(repositoryInventaires.recupererUnInventaireRepository).toHaveBeenCalledWith('Hopital de Paris$$00000001K', 'nom inventaire dejà exitant')
    })

    it('quand je valide le formulaire avec un nom d’inventaire qui n’existe pas alors je reviens en arrière', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      vi.spyOn(navigation, 'useRouter')
        .mockReturnValueOnce(spyNextNavigation.useRouter)
        .mockReturnValueOnce(spyNextNavigation.useRouter)
      vi.spyOn(repositoryInventaires, 'recupererUnInventaireRepository').mockResolvedValueOnce(null)
      vi.spyOn(repositoryInventaires, 'modifierLeNomInventaireRepository').mockResolvedValueOnce()

      renderComponent(PageModifierLeNomInventaire(queryParams()))

      const champNomInventaire = screen.getByLabelText('Nom de l’inventaire (minimum 4 caractères)')
      fireEvent.change(champNomInventaire, { target: { value: 'nom inventaire correct' } })

      // WHEN
      const boutonModifier = screen.getByRole('button', { name: 'Modifier' })
      fireEvent.click(boutonModifier)

      // THEN
      await waitFor(() => {
        expect(repositoryInventaires.modifierLeNomInventaireRepository).toHaveBeenCalledWith('Hopital de Paris$$00000001K', 'Centre hospitalier', 'nom inventaire correct')
      })
      expect(spyNextNavigation.useRouter.push).toHaveBeenCalledWith('http://localhost:3000/indicateurs-cles?nomEtablissement=Hopital+de+Paris%24%2400000001K&nomInventaire=nom+inventaire+correct')
    })
  })

  describe('en tant qu’admin', () => {
    it('quand je valide le formulaire avec un nom d’inventaire qui existe déjà alors j’ai un message d’erreur', async () => {
      // GIVEN
      jeSuisUnAdmin()

      vi.spyOn(repositoryInventaires, 'recupererUnInventaireRepository').mockResolvedValueOnce(inventaireModelFactory())

      renderComponent(PageModifierLeNomInventaire(queryParams()))

      const champNomInventaire = screen.getByLabelText('Nom de l’inventaire (minimum 4 caractères)')
      fireEvent.change(champNomInventaire, { target: { value: 'nom inventaire dejà exitant' } })

      // WHEN
      const boutonModifier = screen.getByRole('button', { name: 'Modifier' })
      fireEvent.click(boutonModifier)

      // THEN
      const champNomInventaireMaj = await screen.findByLabelText('Nom de l’inventaire (minimum 4 caractères)')
      expect(champNomInventaireMaj).toHaveAttribute('aria-describedby', 'formInputError-error')
      expect(champNomInventaireMaj).toHaveAttribute('aria-invalid', 'true')

      const textErreur = await screen.findByText('Cet inventaire existe déjà. Modifiez le nom de l’inventaire pour continuer.', { selector: 'p' })
      expect(textErreur).toBeInTheDocument()

      expect(repositoryInventaires.recupererUnInventaireRepository).toHaveBeenCalledWith('Hopital de Paris$$00000001K', 'nom inventaire dejà exitant')
    })

    it('quand je valide le formulaire avec un nom d’inventaire qui n’existe pas alors je reviens en arrière', async () => {
      // GIVEN
      jeSuisUnAdmin()

      vi.spyOn(navigation, 'useRouter')
        .mockReturnValueOnce(spyNextNavigation.useRouter)
        .mockReturnValueOnce(spyNextNavigation.useRouter)
      vi.spyOn(repositoryInventaires, 'recupererUnInventaireRepository').mockResolvedValueOnce(null)
      vi.spyOn(repositoryInventaires, 'modifierLeNomInventaireRepository').mockResolvedValueOnce()

      renderComponent(PageModifierLeNomInventaire(queryParams()))

      const champNomInventaire = screen.getByLabelText('Nom de l’inventaire (minimum 4 caractères)')
      fireEvent.change(champNomInventaire, { target: { value: 'nom inventaire correct' } })

      // WHEN
      const boutonModifier = screen.getByRole('button', { name: 'Modifier' })
      fireEvent.click(boutonModifier)

      // THEN
      await waitFor(() => {
        expect(repositoryInventaires.modifierLeNomInventaireRepository).toHaveBeenCalledWith('Hopital de Paris$$00000001K', 'Centre hospitalier', 'nom inventaire correct')
      })
      expect(spyNextNavigation.useRouter.push).toHaveBeenCalledWith('http://localhost:3000/indicateurs-cles?nomEtablissement=Hopital+de+Paris%24%2400000001K&nomInventaire=nom+inventaire+correct')
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

function queryParams(): { searchParams: { nomEtablissement: string; nomInventaire: string } } {
  return {
    searchParams: {
      nomEtablissement: `${nomEtablissementFake}$$00000001K`,
      nomInventaire: 'Centre hospitalier',
    },
  }
}
