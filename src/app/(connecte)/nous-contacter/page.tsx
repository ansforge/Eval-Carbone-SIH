import { Metadata } from 'next'
import { ReactElement } from 'react'

import NousContacter from '../../../components/NousContacter/NousContacter'

const title = 'Nous contacter'
export const metadata: Metadata = {
  title,
}

export default function Page(): ReactElement {
  return (
    <NousContacter />
  )
}
