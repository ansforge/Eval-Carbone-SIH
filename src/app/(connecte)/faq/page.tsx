import { Metadata } from 'next'
import { ReactElement } from 'react'

import Faq from '../../../components/Faq/Faq'

const title = 'Foire aux questions'
export const metadata: Metadata = {
  title,
}

export default function Page(): ReactElement {
  return (
    <Faq />
  )
}
