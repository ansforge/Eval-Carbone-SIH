import { Metadata } from 'next'
import { ReactElement } from 'react'

import Accessibilite from '../../../components/Accessibilite/Accessibilite'

const title = 'Accessibilité'
export const metadata: Metadata = {
  title,
}

export default function Page(): ReactElement {
  return (
    <Accessibilite />
  )
}
