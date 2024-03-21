'use client'

import { PropsWithChildren, ReactElement, useState } from 'react'

type AccordeonProps = PropsWithChildren<Readonly<{
  idSection: string
  idAccordion: string
  label: string
}>>

export default function Accordeon({ children, idSection, idAccordion, label }: AccordeonProps): ReactElement {
  const [isToggle, setIsToggle] = useState<boolean>(false)

  const toggle = () => {
    setIsToggle(!isToggle)
  }

  return (
    <div
      aria-multiselectable="false"
      className="js-accordion o-accordion"
      data-accordion-multiselectable="none"
      data-accordion-prefix-classes="o"
      data-hashaccordion-id={idAccordion}
      id={idSection}
      role="tablist"
    >
      <div className="o-accordion__title">
        <button
          aria-controls={`accordion${idSection}_panel1`}
          aria-expanded={isToggle}
          className="js-accordion__header o-accordion__header"
          data-hashaccordion-id={idAccordion}
          id={`accordion${idSection}_tab1`}
          onClick={toggle}
          role="tab"
          type="button"
        >
          {label}
          <svg
            aria-hidden
            className="svg-icon svg-angle-down"
            focusable="false"
          >
            <use xlinkHref="/svg-icons/icon-sprite.svg#angle-down" />
          </svg>
        </button>
      </div>
      <div
        aria-hidden={!isToggle}
        aria-labelledby={`accordion${idSection}_tab1`}
        className="wysiwyg js-accordion__panel o-accordion__panel pt-3"
        data-hashaccordion-id={idAccordion}
        id={`accordion${idSection}_panel1`}
        role="tabpanel"
      >
        {children}
      </div>
    </div>
  )
}
