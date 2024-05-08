import { Metadata } from 'next'
import Link from 'next/link'
import { ReactElement } from 'react'

import { getProfilAtih } from '../authentification'
import AccesRapide from '../components/commun/AccesRapide'
import EnTete from '../components/commun/EnTete'
import PiedDePage from '../components/commun/PiedDePage'

export const metadata: Metadata = {
  title: 'Page non trouvée',
}

export default async function NotFound(): Promise<ReactElement> {
  return (
    <>
      <AccesRapide />
      <EnTete profil={await getProfilAtih()} />
      <main
        className="main pt-4"
        id="main"
        tabIndex={-1}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1>
                Page non trouvée
              </h1>
              <h2>
                Erreur 404
              </h2>
              <p>
                La page que vous cherchez est introuvable.
                <br />
                Excusez-nous pour la gêne occasionnée.
                <br />
                <br />
                Dans ce cas, pour continuer votre visite vous pouvez visiter notre page d’accueil.
              </p>
              <Link
                className="btn btn--plain btn--primary"
                href="/"
              >
                Retourner à la page d’accueil
              </Link>
            </div>
            <div className="col-md-4">
              <svg
                aria-hidden
                height="200"
                viewBox="0 0 120 120"
                width="200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M114.269 44.031C114.269 24.684 98.585 9 79.238 9S44.207 24.684 44.207 44.031s15.684 35.031 35.03 35.031c19.348 0 35.032-15.684 35.032-35.031"
                  fill="#F2F3F7"
                />
                <path
                  d="M94.089 71.007v-40.6c0-.744-.61-1.353-1.353-1.353H22.363c-.744 0-1.353.609-1.353 1.353v40.6c0 .744.609 1.353 1.353 1.353h70.373c.744 0 1.353-.61 1.353-1.353m4.06-41.953V76.42H16.95V29.054a4.055 4.055 0 0 1 4.06-4.06h73.079a4.055 4.055 0 0 1 4.06 4.06"
                  fill="#fff"
                />
                <path
                  d="m62.963 84.54 4.06 13.533H48.077l4.059-13.533z"
                  fill="#969CBB"
                />
                <path
                  d="M70.635 68.769a3 3 0 0 1-.075-.295c-.996-4.951 17.467 5.818 17.467-.959a3.02 3.02 0 0 1 3.015-3.015c6.194 0-6.125-4.667-.675-10.117A3 3 0 0 1 92.5 53.5c.805 0 .932-2.07 1.5-1.5 0-1.5 0-7 .09-8.985V30.407c0-.744-.61-1.353-1.354-1.353H22.363c-.744 0-1.353.609-1.353 1.353v40.6c0 .744.61 1.353 1.353 1.353h49.16a49 49 0 0 1-.888-3.591"
                  fill="#EDEEF3"
                />
                <path
                  d="M72.912 76.42H16.95v4.06a4.055 4.055 0 0 0 4.06 4.06h56.685c-1.814-2.171-3.447-4.823-4.783-8.12"
                  fill="#1D71B8"
                />
                <path
                  d="M65.746 97.122H49.353l3.49-11.632h9.412zm28.343-73.079H21.01A5.016 5.016 0 0 0 16 29.054V80.48a5.016 5.016 0 0 0 5.01 5.01h29.849l-3.49 11.632h-6.06a.951.951 0 0 0 0 1.901h32.48a.951.951 0 0 0 0-1.9H67.73L64.24 85.49h12.594a.951.951 0 0 0 0-1.9H21.01a3.11 3.11 0 0 1-3.11-3.11v-3.11h54.413a.95.95 0 0 0 0-1.9H17.9V29.053a3.113 3.113 0 0 1 3.11-3.11h73.079a3.113 3.113 0 0 1 3.11 3.11V44.28a.95.95 0 0 0 1.9 0V29.054a5.016 5.016 0 0 0-5.01-5.01"
                  fill="#343852"
                />
                <path
                  d="M57.773 66.225a.95.95 0 0 0-.95-.95h-15.41a.951.951 0 0 0 0 1.9h15.41a.95.95 0 0 0 .95-.95m4.967-7.704a.95.95 0 0 0-.95-.95h-3.683a.95.95 0 1 0 0 1.9h3.683a.95.95 0 0 0 .95-.95m-10.103 0a.95.95 0 0 0-.95-.95H41.414a.95.95 0 1 0 0 1.9h10.273a.95.95 0 0 0 .95-.95m14.124-7.705a.95.95 0 0 0-.95-.95H52.97a.95.95 0 1 0 0 1.9h12.84a.95.95 0 0 0 .95-.95m12.102-7.704a.95.95 0 0 0-.95-.95h-17.28a.95.95 0 1 0 0 1.9h17.28a.95.95 0 0 0 .95-.95M47.5 50.816a.95.95 0 0 0-.95-.95h-5.136a.95.95 0 1 0 0 1.9h5.136a.95.95 0 0 0 .95-.95m7.705-7.704a.95.95 0 0 0-.951-.95h-12.84a.95.95 0 1 0 0 1.9h12.84a.95.95 0 0 0 .95-.95m17.027-6.755H41.414a.951.951 0 0 1 0-1.9h30.818a.951.951 0 0 1 0 1.9"
                  fill="#969CBB"
                />
                <path
                  d="M33.375 66.225a.95.95 0 0 0-.95-.95h-3.853a.95.95 0 0 0 0 1.9h3.853a.95.95 0 0 0 .95-.95m0-7.704a.95.95 0 0 0-.95-.95h-3.853a.95.95 0 1 0 0 1.9h3.853a.95.95 0 0 0 .95-.95m0-7.705a.95.95 0 0 0-.95-.95h-3.853a.95.95 0 1 0 0 1.9h3.853a.95.95 0 0 0 .95-.95m0-7.704a.95.95 0 0 0-.95-.95h-3.853a.95.95 0 1 0 0 1.9h3.853a.95.95 0 0 0 .95-.95m-.95-6.755h-3.853a.95.95 0 0 1 0-1.9h3.853a.95.95 0 0 1 0 1.9"
                  fill="#343852"
                />
                <circle
                  cx="90.296"
                  cy="66.496"
                  fill="#D20050"
                  r="22.462"
                  transform="rotate(45 90.296 66.496)"
                />
                <path
                  d="m95.628 66.282 5.531-5.53-4.425-4.425-5.531 5.53-4.425-4.424-1.105-1.106-4.425 4.425 1.105 1.106 4.425 4.424-5.531 5.532 4.425 4.424 5.53-5.53 5.532 5.53 4.425-4.424z"
                  fill="#fff"
                />
                <path
                  d="m101.974 70.998-4.716-4.715 4.716-4.716c.45-.45.45-1.18 0-1.63l-4.425-4.425c-.45-.45-1.18-.45-1.63 0l-4.715 4.716-4.716-4.716c-.45-.45-1.18-.45-1.63 0l-4.425 4.425c-.45.45-.45 1.18 0 1.63l4.716 4.716-4.716 4.715c-.45.45-.45 1.18 0 1.63l4.425 4.425c.45.45 1.18.45 1.63 0l4.716-4.716 4.715 4.716c.45.45 1.18.45 1.63 0l4.425-4.425c.45-.45.45-1.18 0-1.63m-5.24 3.611-4.716-4.716c-.45-.45-1.18-.45-1.63 0l-4.715 4.716-2.796-2.796 4.716-4.716c.45-.45.45-1.179 0-1.629l-4.716-4.716 2.796-2.796 4.716 4.716c.45.45 1.18.45 1.63 0l4.715-4.716 2.796 2.796-4.716 4.716c-.45.45-.45 1.18 0 1.63l4.716 4.715zm8.538-23.09c8.216 8.217 8.216 21.538 0 29.753-8.216 8.217-21.537 8.217-29.753 0-8.216-8.216-8.216-21.536 0-29.753 8.222-8.202 21.532-8.202 29.753 0m1.822-1.821c-9.222-9.222-24.174-9.222-33.396 0s-9.222 24.174 0 33.396 24.174 9.222 33.396 0 9.222-24.174 0-33.396"
                  fill="#343852"
                />
              </svg>
            </div>
          </div>
        </div>
      </main>
      <PiedDePage />
    </>
  )
}
