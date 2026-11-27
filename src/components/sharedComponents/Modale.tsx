'use client'

import { MouseEvent, PropsWithChildren, ReactElement, SyntheticEvent, useId, useLayoutEffect, useRef } from 'react'

type ModaleProps = PropsWithChildren<Readonly<{
  fermerLaModale: () => void
  isOpen: boolean
  titre: string
  validerLaModale: () => void
}>>

export default function Modale({ children, fermerLaModale, isOpen, titre, validerLaModale }: ModaleProps): ReactElement {
  const dialog = useRef<HTMLDialogElement>(null)
  // One dialog per inventory row can sit in the page at once: the title id must be unique.
  const idTitre = useId()

  // showModal() puts the dialog in the top layer: focus is trapped inside, the rest of the page is inert,
  // and close() hands focus back to the element that opened it — but only while the dialog is still
  // attached. So the <dialog> stays mounted and is opened and closed here, never unmounted to close it:
  // React removes a node before it runs the cleanup of its effects, too late for close() to restore focus.
  // Closed, a <dialog> is display: none and out of the accessibility tree.
  useLayoutEffect(() => {
    const element = dialog.current
    if (element === null) {
      return
    }
    if (isOpen && !element.open) {
      element.showModal()
    } else if (!isOpen && element.open) {
      element.close()
    }
  }, [isOpen])

  // Escape: let React state decide, rather than the browser closing the dialog behind its back.
  const fermerAvecEchap = (event: SyntheticEvent<HTMLDialogElement>): void => {
    event.preventDefault()
    fermerLaModale()
  }

  // A click on the backdrop lands on the <dialog> itself, never on its content.
  const fermerEnCliquantDehors = (event: MouseEvent<HTMLDialogElement>): void => {
    if (event.target === event.currentTarget) {
      fermerLaModale()
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- Escape is handled by onCancel
    <dialog
      aria-labelledby={idTitre}
      className="modale"
      onCancel={fermerAvecEchap}
      onClick={fermerEnCliquantDehors}
      ref={dialog}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1
              className="modal-title"
              id={idTitre}
            >
              <svg
                aria-hidden
                className="svg-icon"
                focusable="false"
              >
                <use xlinkHref="/svg-icons/icon-sprite.svg#circle-alert" />
              </svg>
              {' '}
              {titre}
            </h1>
            <button
              className="btn btn--close btn--icon-only"
              onClick={fermerLaModale}
              type="button"
            >
              <svg
                aria-hidden
                className="svg-icon svg-close"
                focusable="false"
              >
                <use xlinkHref="svg-icons/icon-sprite.svg#close" />
              </svg>
              <span className="sr-only">
                Fermer :
                {' '}
                {titre}
              </span>
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="btn-group">
            <button
              className="btn btn--ghost btn--default"
              onClick={fermerLaModale}
              type="button"
            >
              Annuler
            </button>
            <button
              className="btn btn--plain btn--primary"
              onClick={validerLaModale}
              type="button"
            >
              {titre}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}
