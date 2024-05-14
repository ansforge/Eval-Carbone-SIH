import { fireEvent, screen, waitFor } from '@testing-library/react'
import * as navigation from 'next/navigation'

import PageDupliquerUnInventaire from '../../app/(connecte)/(utilisateur)/dupliquer-un-inventaire/page'
import * as repositoryInventaires from '../../repositories/inventairesRepository'
import { FrozenDate, inventaireModelFactory, jeSuisUnAdmin, jeSuisUnUtilisateur, renderComponent, spyNextNavigation } from '../../testShared'

describe('page créer une simulation', () => {
  describe('en tant qu’utilisateur', () => {
    it('quand j’affiche la page alors j’ai le nom de l’inventaire prérempli avec comme suffixe le mot duplication et la date', async () => {
      // GIVEN
      jeSuisUnUtilisateur()
      vi.stubGlobal('Date', FrozenDate)

      // WHEN
      renderComponent(await PageDupliquerUnInventaire(queryParams()))

      // THEN
      const champNomInventaire = screen.getByLabelText('Nom de l’inventaire (minimum 4 caractères)')
      expect(champNomInventaire).toHaveValue('Centre hospitalier - duplication 15/04/1996 03:24:00')

      const boutonDupliquer = screen.getByRole('button', { name: 'Dupliquer' })
      expect(boutonDupliquer).toBeEnabled()
    })

    it('quand j’écris un nom d’inventaire inférieur à 4 caractères alors je ne peux pas créer la duplication', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      renderComponent(await PageDupliquerUnInventaire(queryParams()))

      // WHEN
      const champNomInventaire = screen.getByLabelText('Nom de l’inventaire (minimum 4 caractères)')
      fireEvent.change(champNomInventaire, { target: { value: '???' } })

      // THEN
      const boutonDupliquer = screen.getByRole('button', { name: 'Dupliquer' })
      expect(boutonDupliquer).toBeDisabled()
    })

    it('quand je valide le formulaire avec un nom d’inventaire qui existe déjà alors j’ai un message d’erreur', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      vi.spyOn(repositoryInventaires, 'recupererUnInventaireRepository').mockResolvedValueOnce(inventaireModelFactory())

      renderComponent(await PageDupliquerUnInventaire(queryParams()))

      const champNomInventaire = screen.getByLabelText('Nom de l’inventaire (minimum 4 caractères)')
      fireEvent.change(champNomInventaire, { target: { value: 'nom inventaire dejà exitant' } })

      // WHEN
      const boutonDupliquer = screen.getByRole('button', { name: 'Dupliquer' })
      fireEvent.click(boutonDupliquer)

      // THEN
      const champNomInventaireMaj = await screen.findByLabelText('Nom de l’inventaire (minimum 4 caractères)')
      expect(champNomInventaireMaj).toHaveAttribute('aria-describedby', 'formInputError-error')
      expect(champNomInventaireMaj).toHaveAttribute('aria-invalid', 'true')

      const textErreur = await screen.findByText('Cet inventaire existe déjà. Modifiez le nom de l’inventaire pour continuer.', { selector: 'p' })
      expect(textErreur).toBeInTheDocument()

      expect(repositoryInventaires.recupererUnInventaireRepository).toHaveBeenCalledWith('Hopital de Paris$$00000001K', 'nom inventaire dejà exitant')
    })

    it('quand je valide le formulaire avec un nom d’inventaire qui n’existe pas alors la duplication s’effectue et je reviens à ma liste d’inventaire', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      vi.spyOn(navigation, 'useRouter')
        .mockReturnValueOnce(spyNextNavigation.useRouter)
        .mockReturnValueOnce(spyNextNavigation.useRouter)
      vi.spyOn(repositoryInventaires, 'recupererUnInventaireRepository').mockResolvedValueOnce(null)
      vi.spyOn(repositoryInventaires, 'dupliquerUnInventaireRepository').mockResolvedValueOnce()

      renderComponent(await PageDupliquerUnInventaire(queryParams()))

      const champNomInventaire = screen.getByLabelText('Nom de l’inventaire (minimum 4 caractères)')
      fireEvent.change(champNomInventaire, { target: { value: 'nom inventaire correct' } })
      const boutonDupliquer = screen.getByRole('button', { name: 'Dupliquer' })

      // WHEN
      fireEvent.click(boutonDupliquer)

      // THEN
      await waitFor(() => {
        expect(repositoryInventaires.dupliquerUnInventaireRepository).toHaveBeenCalledWith('Hopital de Paris$$00000001K', 'Centre hospitalier', 'nom inventaire correct')
      })
      expect(spyNextNavigation.useRouter.push).toHaveBeenCalledWith('/inventaires')
      expect(spyNextNavigation.useRouter.refresh).toHaveBeenCalledWith()
    })
  })

  describe('en tant qu’admin', () => {
    it('quand j’affiche la page alors je n’y ai pas accès', async () => {
      // GIVEN
      jeSuisUnAdmin()

      // WHEN
      const page = async () => renderComponent(await PageDupliquerUnInventaire(queryParams()))

      // THEN
      await expect(page).rejects.toThrow('NEXT_NOT_FOUND')
    })
  })

  it('quand il n’y a pas de nom d’inventaire dans l’url alors je n’y ai pas accès', async () => {
    // GIVEN
    const queryParams = {}

    // WHEN
    const page = async () => renderComponent(await PageDupliquerUnInventaire(queryParams))

    // THEN
    await expect(page).rejects.toThrow('NEXT_NOT_FOUND')
  })
})

function queryParams(): { searchParams: { nomInventaire: string } } {
  return {
    searchParams: {
      nomInventaire: 'Centre hospitalier',
    },
  }
}
