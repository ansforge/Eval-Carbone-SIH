import { Metadata } from 'next'
import { ReactElement } from 'react'

import EcoConception from '../../../components/EcoConception/EcoConception'

const title = 'Éco-conception'
export const metadata: Metadata = {
  title,
}

export default function Page(): ReactElement {
  return (
    <EcoConception />
  )
}
