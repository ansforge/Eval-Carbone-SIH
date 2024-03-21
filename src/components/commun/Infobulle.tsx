'use client'

import { Tooltip } from '@reach/tooltip'
import { ReactElement } from 'react'

type InfoBulleProps = Readonly<{
  label: string
}>

export default function InfoBulle({ label }: InfoBulleProps): ReactElement {
  return (
    <>
      {' '}
      <Tooltip
        label={label}
        style={{
          backgroundColor: 'var(--primary,#1d71b8)',
          borderRadius: '1.4rem',
          color: '#fff',
          lineBreak: 'loose',
          padding: '2rem',
          position: 'absolute',
          whiteSpace: 'normal',
          width: '28rem',
        }}
      >
        <button
          data-toggle="tooltip"
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
      </Tooltip>
    </>
  )
}
