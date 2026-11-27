'use client'

import { ReactElement, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type InfoBulleProps = Readonly<{
  label: string
}>

type Position = Readonly<{
  left: number
  top: number
}>

// Gap between the trigger and the bubble, as @reach/tooltip placed it.
const ecart = 8

export default function InfoBulle({ label }: InfoBulleProps): ReactElement {
  const [position, setPosition] = useState<Position | null>(null)
  const [isMonte, setIsMonte] = useState(false)
  const declencheur = useRef<HTMLButtonElement>(null)
  const id = useId()

  // The bubble is rendered at the end of <body>, as @reach/tooltip did: it inherits no font from the heading,
  // label or table cell its trigger sits in, and no ancestor with overflow: hidden can clip it.
  // document only exists in the browser, so the portal waits for the first client render.
  useEffect(() => {
    setIsMonte(true)
  }, [])

  const afficher = (): void => {
    if (declencheur.current === null) {
      return
    }
    const rectangle = declencheur.current.getBoundingClientRect()
    setPosition({ left: rectangle.left + window.scrollX, top: rectangle.bottom + window.scrollY + ecart })
  }
  const masquer = (): void => {
    setPosition(null)
  }

  // WCAG 1.4.13: the tooltip must be dismissible with Escape, whether it was opened by hover or by focus.
  const isVisible = position !== null
  useEffect(() => {
    const masquerAvecEchap = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setPosition(null)
      }
    }
    if (isVisible) {
      document.addEventListener('keydown', masquerAvecEchap)
    }

    return () => {
      document.removeEventListener('keydown', masquerAvecEchap)
    }
  }, [isVisible])

  return (
    <>
      {' '}
      <button
        aria-describedby={id}
        data-toggle="tooltip"
        onBlur={masquer}
        onFocus={afficher}
        onMouseEnter={afficher}
        onMouseLeave={masquer}
        ref={declencheur}
        type="button"
      >
        <svg
          aria-hidden
          className="svg-icon svg-question-circle"
          focusable="false"
        >
          <use xlinkHref="/svg-icons/icon-sprite.svg#question-circle" />
        </svg>
        <span className="sr-only">
          Aide
        </span>
      </button>
      {isMonte ? createPortal(
        // Always in the DOM, hidden while closed: aria-describedby then resolves as soon as the button gets focus.
        <span
          className="infobulle"
          hidden={!isVisible}
          id={id}
          role="tooltip"
          style={position ?? undefined}
        >
          {label}
        </span>,
        document.body
      ) : null}
    </>
  )
}
