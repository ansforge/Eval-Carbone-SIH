import { fireEvent, screen, waitFor } from '@testing-library/react'
import * as navigation from 'next/navigation'

import PageCreerUneSimulation from '../../app/(connecte)/(utilisateur)/creer-une-simulation/page'
import * as repositoryInventaires from '../../repositories/inventairesRepository'
import { FrozenDate, inventaireModelFactory, jeSuisUnAdmin, jeSuisUnUtilisateur, renderComponent, spyNextNavigation } from '../../testShared'

describe('page créer une simulation', () => {
  describe('en tant qu’utilisateur', () => {
    it('quand j’affiche la page alors j’ai le nom de l’inventaire prérempli avec comme suffixe le mot simulation et la date', async () => {
      // GIVEN
      jeSuisUnUtilisateur()
      vi.stubGlobal('Date', FrozenDate)

      // WHEN
      renderComponent(await PageCreerUneSimulation(queryParams()))

      // THEN
      const champNomInventaire = screen.getByLabelText('Nom de l’inventaire * (minimum 4 caractères)')
      expect(champNomInventaire).toHaveValue('Centre hospitalier - simulation 15/04/1996 03:24:00')

      const boutonContinuer = screen.getByRole('button', { name: 'Continuer' })
      expect(boutonContinuer).toBeEnabled()
    })

    it('quand j’affiche la page alors je ne peux pas dépasser -100 et 100 dans le champ nombre d’équipement en %', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      // WHEN
      renderComponent(await PageCreerUneSimulation(queryParams()))

      // THEN
      const champNombreEquipement = screen.getByLabelText('Nombre d’équipements en %')
      expect(champNombreEquipement).toHaveAttribute('max', '100')
      expect(champNombreEquipement).toHaveAttribute('min', '-100')
      expect(champNombreEquipement).toHaveAttribute('type', 'number')
      expect(champNombreEquipement).toHaveValue(0)
    })

    it('quand j’affiche la page alors je ne peux pas dépasser -20 et 20 dans le champ Durée de vie en années', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      // WHEN
      renderComponent(await PageCreerUneSimulation(queryParams()))

      // THEN
      const champDureeDeVie = screen.getByLabelText('Durée de vie en années')
      expect(champDureeDeVie).toHaveAttribute('max', '20')
      expect(champDureeDeVie).toHaveAttribute('min', '-20')
      expect(champDureeDeVie).toHaveAttribute('type', 'number')
      expect(champDureeDeVie).toHaveValue(0)
    })

    it('quand j’affiche la page alors je ne peux pas dépasser -24 et 24 dans le champ Heures d’utilisation par jour', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      // WHEN
      renderComponent(await PageCreerUneSimulation(queryParams()))

      // THEN
      const champHeuresUtilisation = screen.getByLabelText('Heures d’utilisation par jour')
      expect(champHeuresUtilisation).toHaveAttribute('max', '24')
      expect(champHeuresUtilisation).toHaveAttribute('min', '-24')
      expect(champHeuresUtilisation).toHaveAttribute('type', 'number')
      expect(champHeuresUtilisation).toHaveValue(0)
    })

    it('quand j’écris un nom d’inventaire inférieur à 4 caractères alors je ne peux pas créer la simulation', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      renderComponent(await PageCreerUneSimulation(queryParams()))

      // WHEN
      const champNomInventaire = screen.getByLabelText('Nom de l’inventaire * (minimum 4 caractères)')
      fireEvent.change(champNomInventaire, { target: { value: '???' } })

      // THEN
      const boutonContinuer = screen.getByRole('button', { name: 'Continuer' })
      expect(boutonContinuer).toBeDisabled()
    })

    it('quand je valide le formulaire avec un nom d’inventaire qui existe déjà alors j’ai un message d’erreur', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      vi.spyOn(repositoryInventaires, 'recupererUnInventaireRepository').mockResolvedValueOnce(inventaireModelFactory())

      renderComponent(await PageCreerUneSimulation(queryParams()))

      const champNomInventaire = screen.getByLabelText('Nom de l’inventaire * (minimum 4 caractères)')
      fireEvent.change(champNomInventaire, { target: { value: 'nom inventaire dejà exitant' } })

      // WHEN
      const boutonContinuer = screen.getByRole('button', { name: 'Continuer' })
      fireEvent.click(boutonContinuer)

      // THEN
      const champNomInventaireMaj = await screen.findByLabelText('Nom de l’inventaire * (minimum 4 caractères)')
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

      renderComponent(await PageCreerUneSimulation(queryParams()))

      const champNomInventaire = screen.getByLabelText('Nom de l’inventaire * (minimum 4 caractères)')
      fireEvent.change(champNomInventaire, { target: { value: 'nom inventaire correct' } })
      const boutonContinuer = screen.getByRole('button', { name: 'Continuer' })
      const champNombreEquipement = screen.getByLabelText('Nombre d’équipements en %')
      fireEvent.change(champNombreEquipement, { target: { value: 10 } })
      const champDureeDeVie = screen.getByLabelText('Durée de vie en années')
      fireEvent.change(champDureeDeVie, { target: { value: 10 } })
      const champHeuresUtilisation = screen.getByLabelText('Heures d’utilisation par jour')
      fireEvent.change(champHeuresUtilisation, { target: { value: 10 } })

      // WHEN
      fireEvent.click(boutonContinuer)

      // THEN
      await waitFor(() => {
        expect(spyNextNavigation.useRouter.push).toHaveBeenCalledWith('http://localhost:3000/inventaire?nomEtablissement=Hopital+de+Paris%24%2400000001K&nomInventaire=Centre+hospitalier&nouveauNomInventaire=nom+inventaire+correct&nombreEquipement=10&dureeDeVie=10&heureUtilisation=10&statut=CALCUL%C3%89')
      })
    })
  })

  describe('en tant qu’admin', () => {
    it('quand j’affiche la page alors je n’y ai pas accès', async () => {
      // GIVEN
      jeSuisUnAdmin()

      // WHEN
      const page = async () => renderComponent(await PageCreerUneSimulation(queryParams()))

      // THEN
      await expect(page).rejects.toThrow('NEXT_NOT_FOUND')
    })
  })

  it('quand il n’y a pas de nom d’inventaire dans l’url alors je n’y ai pas accès', async () => {
    // GIVEN
    const queryParams = {}

    // WHEN
    const page = async () => renderComponent(await PageCreerUneSimulation(queryParams))

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
