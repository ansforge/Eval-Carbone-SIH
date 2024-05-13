import { fireEvent, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import PageModifierUnReferentiel from '../../app/(connecte)/(admin)/modifier-un-referentiel/page'
import * as repositoryReferentiels from '../../repositories/referentielsRepository'
import { renderComponent, jeSuisUnAdmin, jeSuisUnUtilisateur, textMatcher } from '../../testShared'

describe('page modifier un référentiel', () => {
  describe('en tant qu’admin', () => {
    it('quand j’affiche la page alors j’y ai accès', async () => {
      // GIVEN
      jeSuisUnAdmin()

      // WHEN
      renderComponent(await PageModifierUnReferentiel())

      // THEN
      const titre = screen.getByRole('heading', { level: 1 })
      expect(titre).toHaveTextContent('Modifier un référentiel')
    })

    it('quand je n’ai pas rempli le formulaire alors je ne peux pas valider le formulaire', async () => {
      // GIVEN
      jeSuisUnAdmin()

      // WHEN
      renderComponent(await PageModifierUnReferentiel())

      // THEN
      const fichierCsv = screen.getByLabelText('Fichier CSV')
      expect(fichierCsv).toBeRequired()

      const boutonModifier = screen.getByRole('button', { name: 'Modifier' })
      expect(boutonModifier).toBeDisabled()
    })

    it('quand je valide le formulaire avec un fichier CSV alors une alerte de succes apparaît', async () => {
      // GIVEN
      jeSuisUnAdmin()

      vi.spyOn(repositoryReferentiels, 'modifierUnReferentielRepository').mockResolvedValueOnce()

      const { user } = renderComponent(await PageModifierUnReferentiel())

      const champFichierCsv = screen.getByText(textMatcher('Fichier CSV'), { selector: 'label' })
      const fichierReferentiel = new File(['cle;source;valeur\nPUEParDefaut;SSG;1.75\ndureeVieParDefaut;SSG;2'], 'hypotheses.csv', { type: 'text/csv' })
      await user.upload(champFichierCsv, fichierReferentiel)

      // WHEN
      const boutonModifier = await screen.findByRole('button', { name: 'Modifier' })
      fireEvent.submit(boutonModifier)

      // THEN
      expect(boutonModifier).toBeEnabled()

      const alerteTitreSucces = await screen.findByText('Référentiel mis à jour avec succès', { selector: 'h2' })
      expect(alerteTitreSucces).toBeInTheDocument()

      const alerteMessageSucces = screen.getByText('L’ancien référentiel a été mis à jour. Assurez-vous que d’autres référentiels ne nécessitent pas de mise à jour et que le parcours est fonctionnel.', { selector: 'p' })
      expect(alerteMessageSucces).toBeInTheDocument()

      const formData = new FormData()
      formData.append('fichierReferentiel', fichierReferentiel)
      expect(repositoryReferentiels.modifierUnReferentielRepository).toHaveBeenCalledWith(formData)
    })

    it('quand je valide le formulaire avec un mauvais fichier CSV alors une alerte d’erreur apparaît', async () => {
      // GIVEN
      jeSuisUnAdmin()

      const messageErreur = 'message d’erreur'
      vi.spyOn(repositoryReferentiels, 'modifierUnReferentielRepository').mockRejectedValueOnce(new Error(messageErreur))

      renderComponent(await PageModifierUnReferentiel())

      const champFichierCsv = screen.getByText(textMatcher('Fichier CSV'), { selector: 'label' })
      const fichierReferentiel = new File(['QuelqueChoseDeFaux'], 'hypotheses.csv', { type: 'text/csv' })
      await userEvent.upload(champFichierCsv, fichierReferentiel)

      // WHEN
      const boutonModifier = await screen.findByRole('button', { name: 'Modifier' })
      fireEvent.submit(boutonModifier)

      // THEN
      // const titre = screen.getByRole('heading', { level: 1, name: 'Modifier un référentiel' })
      // expect(titre).toBeInTheDocument()
      // const bouttonModifier = screen.getByRole('button', { name: 'Modifier un référentiel' })
      // fireEvent.click(bouttonModifier)

      const alerteTitreErreur = await screen.findByText('Une erreur est survenue', { selector: 'h2' })
      expect(alerteTitreErreur).toBeInTheDocument()

      const alerteMessageErreur = screen.getByText(messageErreur, { selector: 'pre' })
      expect(alerteMessageErreur).toBeInTheDocument()
    })
  })

  describe('en tant qu’utilisateur', () => {
    it('quand j’affiche la page alors je n’y ai pas accès', async () => {
      // GIVEN
      jeSuisUnUtilisateur()

      // WHEN
      const page = async () => renderComponent(await PageModifierUnReferentiel())

      // THEN
      await expect(page).rejects.toThrow('NEXT_NOT_FOUND')
    })
  })
})
