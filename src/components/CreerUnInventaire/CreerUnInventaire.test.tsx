import { fireEvent, screen, waitFor } from '@testing-library/react'
import * as navigation from 'next/navigation'

import PageCreerUnInventaire from '../../app/(connecte)/(utilisateur)/creer-un-inventaire/page'
import * as repositoryInventaires from '../../gateways/inventairesRepository'
import { inventaireModelFactory, jeSuisUnAdmin, jeSuisUnUtilisateur, renderComponent, spyNextNavigation } from '../../testShared'

describe('page modifier le nom de l’inventaire', () => {
  describe('en tant qu’utilisateur', () => {
    it('quand j’affiche la page alors je ne peux pas valider le formulaire', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      // WHEN
      renderComponent(await PageCreerUnInventaire())

      // THEN
      const boutonContinuer = screen.getByRole('button', { name: 'Continuer' })
      expect(boutonContinuer).toBeDisabled()
    })

    it('quand j’écris un nom d’inventaire inférieur à 4 caractères alors je ne peux pas créer la simulation', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      renderComponent(await PageCreerUnInventaire())

      // WHEN
      const champNomInventaire = screen.getByLabelText('Nom de l’inventaire (minimum 4 caractères)')
      fireEvent.change(champNomInventaire, { target: { value: '???' } })

      // THEN
      const boutonContinuer = screen.getByRole('button', { name: 'Continuer' })
      expect(boutonContinuer).toBeDisabled()
    })

    it('quand je valide le formulaire avec un nom d’inventaire qui existe déjà alors j’ai un message d’erreur', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      vi.spyOn(repositoryInventaires, 'recupererUnInventaireRepository').mockResolvedValueOnce(inventaireModelFactory())

      renderComponent(await PageCreerUnInventaire())

      const champNomInventaire = screen.getByLabelText('Nom de l’inventaire (minimum 4 caractères)')
      fireEvent.change(champNomInventaire, { target: { value: 'nom inventaire dejà exitant' } })

      // WHEN
      const boutonContinuer = screen.getByRole('button', { name: 'Continuer' })
      fireEvent.click(boutonContinuer)

      // THEN
      const champNomInventaireMaj = await screen.findByLabelText('Nom de l’inventaire (minimum 4 caractères)')
      expect(champNomInventaireMaj).toHaveAttribute('aria-describedby', 'formInputError-error')
      expect(champNomInventaireMaj).toHaveAttribute('aria-invalid', 'true')

      const textErreur = await screen.findByText('Cet inventaire existe déjà. Modifiez le nom de l’inventaire pour continuer.', { selector: 'p' })
      expect(textErreur).toBeInTheDocument()

      expect(repositoryInventaires.recupererUnInventaireRepository).toHaveBeenCalledWith('Hopital de Paris$$00000001K', 'nom inventaire dejà exitant')
    })

    it('quand je valide le formulaire avec un nom d’inventaire qui n’existe pas alors je vais à la suite', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      vi.spyOn(navigation, 'useRouter')
        .mockReturnValueOnce(spyNextNavigation.useRouter)
        .mockReturnValueOnce(spyNextNavigation.useRouter)
      vi.spyOn(repositoryInventaires, 'recupererUnInventaireRepository').mockResolvedValueOnce(null)

      renderComponent(await PageCreerUnInventaire())

      const champNomInventaire = screen.getByLabelText('Nom de l’inventaire (minimum 4 caractères)')
      fireEvent.change(champNomInventaire, { target: { value: 'nom inventaire correct' } })

      // WHEN
      const boutonContinuer = screen.getByRole('button', { name: 'Continuer' })
      fireEvent.click(boutonContinuer)

      // THEN
      await waitFor(() => {
        expect(spyNextNavigation.useRouter.push).toHaveBeenCalledWith('http://localhost:3000/inventaire?nomEtablissement=Hopital+de+Paris%24%2400000001K&nomInventaire=nom+inventaire+correct')
      })
    })
  })

  describe('en tant qu’admin', () => {
    it('quand j’affiche la page alors je n’y ai pas accès', async () => {
      // GIVEN
      jeSuisUnAdmin()

      // WHEN
      const page = async () => renderComponent(await PageCreerUnInventaire())

      // THEN
      await expect(page).rejects.toThrow('NEXT_NOT_FOUND')
    })
  })
})
