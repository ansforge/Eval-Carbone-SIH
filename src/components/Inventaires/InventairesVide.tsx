import Link from 'next/link'
import { ReactElement } from 'react'

type InventairesVideProps = Readonly<{
  isAdmin: boolean
}>

export default function InventairesVide({ isAdmin }: InventairesVideProps): ReactElement {
  return (
    <div className="row justify-content-center">
      <div className="col-md-5 text-center">
        <h2 className="fw-bold">
          Créez un inventaire de votre parc informatique
        </h2>
        <p>
          Calculez l’empreinte environnementale de cet inventaire et identifiez les actions permettant de la réduire.
        </p>
        <svg
          aria-hidden
          height="200"
          viewBox="0 0 120 120"
          width="200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M77.823 46.405C77.823 28.508 63.315 14 45.418 14S13.013 28.508 13.013 46.405 27.52 78.81 45.418 78.81s32.405-14.508 32.405-32.405"
            fill="#F2F3F7"
          />
          <path
            d="M106.987 20.481v25.924a3.25 3.25 0 0 1-3.24 3.24h-3.24L89.164 60.988V49.646H68.1a3.25 3.25 0 0 1-3.24-3.24V20.48a3.25 3.25 0 0 1 3.24-3.24h35.646a3.25 3.25 0 0 1 3.24 3.24"
            fill="#FFF"
          />
          <path
            d="m59.595 89.342 7.616-15.23a3.23 3.23 0 0 1 2.883-1.783h32.34c.276 0 .535.146.68.39.163.242.163.533.05.793L91.676 96.455a3.24 3.24 0 0 1-2.9 1.798H55.138l3.24-6.48z"
            fill="#DEE0EA"
          />
          <path
            d="M51.899 82.05v9.722H40.557c0-2.722-2.203-4.86-4.926-4.86H22.734V82.05h-9.721v-6.48c0-7.162 5.8-12.962 12.962-12.962h1.62c1.377 3.872 5.298 6.48 9.721 6.48 4.424 0 8.345-2.608 9.722-6.48 7.161 0 12.962 5.8 12.962 12.962v6.48z"
            fill="#1D71B8"
          />
          <path
            d="M59.595 82.05v7.292l-1.215 2.43h-6.481v-9.721h5.055z"
            fill="#FFF"
          />
          <path
            d="m58.38 91.772-3.24 6.481H34.075a3.25 3.25 0 0 1-3.24-3.24v-3.24H58.38"
            fill="#DEE0EA"
          />
          <path
            d="M47.038 30.203s3.24 2.3 3.24 6.48-3.37 6.644-3.37 6.644 0-.017-.016-.05c-.243-.518-2.22-4.568-6.335-4.568-4.39 0-6.481 4.456-6.481 4.456-5.574-.908-5.752 5.476-3.24 6.48 0 0-3.241 0-3.241-8.1 0-9.625 11.212-9.722 12.962-9.722 5.055 0 6.481-1.62 6.481-1.62"
            fill="#C5C8DA"
          />
          <path
            d="M47.038 44.785v4.86a8.105 8.105 0 0 1-8.101 8.102 8.105 8.105 0 0 1-8.102-8.101c-2.51-1.005-2.333-7.389 3.24-6.481 0 0 2.091-4.456 6.482-4.456 4.115 0 6.092 4.05 6.335 4.569.016.032.016.049.016.049.082.47.13.956.13 1.458m-6.481 46.987h-9.722v3.24h-9.721a6.48 6.48 0 0 1-6.481-6.48V82.05h8.101v4.86h12.897c2.723 0 4.926 2.139 4.926 4.861"
            fill="#FFF"
          />
          <path
            d="M56.778 97.24h31.997a2.22 2.22 0 0 0 1.995-1.238l11.346-22.66H70.094a2.21 2.21 0 0 0-1.975 1.217zm31.997 2.026H55.14a1.013 1.013 0 0 1-.906-1.466l12.071-24.14c.699-1.42 2.187-2.343 3.79-2.343h32.34c.622 0 1.208.33 1.536.862a1.84 1.84 0 0 1 .098 1.787L92.581 96.908a4.24 4.24 0 0 1-3.806 2.358M38.937 58.76c-5.026 0-9.114-4.089-9.114-9.114a1.013 1.013 0 0 1 2.025 0 7.097 7.097 0 0 0 7.089 7.088 7.097 7.097 0 0 0 7.088-7.088v-4.861c0-.42-.037-.84-.115-1.285a1.012 1.012 0 1 1 1.996-.346 9.5 9.5 0 0 1 .145 1.63v4.862c0 5.025-4.089 9.113-9.114 9.113m-8.102 37.266h-9.721c-4.132 0-7.494-3.361-7.494-7.493V82.05a1.013 1.013 0 0 1 2.026 0v6.48A5.475 5.475 0 0 0 21.114 94h9.721a1.013 1.013 0 0 1 0 2.025"
            fill="#343852"
          />
          <path
            d="M40.557 92.785c-.56 0-1.013-.454-1.013-1.013 0-2.158-1.718-3.848-3.913-3.848H22.734a1.01 1.01 0 0 1-1.012-1.013v-4.86a1.013 1.013 0 0 1 2.025 0v3.848H35.63c3.275 0 5.939 2.634 5.939 5.873 0 .56-.454 1.013-1.013 1.013m16.398-9.722h-6.676a1.01 1.01 0 0 1-1.012-1.012V75.57a1.013 1.013 0 0 1 2.025 0v5.468h5.663a1.013 1.013 0 0 1 0 2.025"
            fill="#343852"
          />
          <path
            d="M53.278 83.063h6.676c.56 0 1.013-.453 1.013-1.012V75.57a1.013 1.013 0 0 0-2.026 0v5.468h-5.663a1.013 1.013 0 0 0 0 2.025"
            fill="#343852"
          />
          <path
            d="M24.354 83.063H13.013c-.56 0-1.013-.453-1.013-1.012V75.57c0-7.706 6.269-13.975 13.975-13.975h1.62c.428 0 .81.27.954.673 1.236 3.474 4.759 5.808 8.767 5.808 4.009 0 7.532-2.334 8.768-5.808.143-.403.526-.673.954-.673 7.706 0 13.975 6.269 13.975 13.975a1.013 1.013 0 0 1-2.026 0c0-6.362-4.996-11.578-11.27-11.93-1.72 3.893-5.804 6.461-10.4 6.461-4.604 0-8.694-2.576-10.41-6.48h-.932c-6.59 0-11.95 5.36-11.95 11.949v5.468h9.317V75.57a1.013 1.013 0 0 1 2.025 0v6.48c0 .56-.453 1.013-1.013 1.013m22.639-51.569c-.97.58-2.913 1.341-6.436 1.341-3.593 0-11.95.849-11.95 8.71 0 1.157.07 2.136.188 2.961.72-1.428 2.235-2.6 4.724-2.426.83-1.368 3.106-4.384 7.038-4.384 3.466 0 5.598 2.439 6.61 4.008.874-.95 2.099-2.697 2.099-5.02 0-2.626-1.453-4.398-2.273-5.19M30.836 50.658c-.436 0-4.254-.255-4.254-9.114 0-4.439 2.233-7.692 6.457-9.408 2.136-.867 4.735-1.326 7.518-1.326 4.178 0 5.593-1.165 5.73-1.29.335-.417.899-.454 1.337-.143.15.106 3.667 2.657 3.667 7.307 0 4.64-3.63 7.347-3.785 7.46a1.012 1.012 0 0 1-1.556-.49c-.392-.807-2.12-3.933-5.393-3.933-3.677 0-5.547 3.838-5.566 3.876a1.02 1.02 0 0 1-1.078.567c-2.509-.409-3.27.922-3.502 1.752-.317 1.142.072 2.498.8 2.79a1.013 1.013 0 0 1-.375 1.952M55.14 99.266H34.075a4.26 4.26 0 0 1-4.253-4.253v-3.24c0-.56.453-1.014 1.012-1.014H51.9a1.013 1.013 0 0 1 0 2.026H31.85v2.228a2.23 2.23 0 0 0 2.227 2.228H55.14a1.013 1.013 0 0 1 0 2.025"
            fill="#343852"
          />
          <path
            d="M50.886 90.911v-8.86a1.013 1.013 0 0 1 2.025 0v9.86c0 .56-.453.013-1.012.013-.56 0-1.013-.453-1.013-1.013m17.215-72.658a2.23 2.23 0 0 0-2.228 2.228v25.924c0 1.228 1 2.228 2.228 2.228h21.064c.559 0 1.012.453 1.012 1.013v8.897l9.613-9.614c.19-.19.448-.296.716-.296h3.24c1.23 0 2.229-1 2.229-2.228V20.481c0-1.228-1-2.228-2.228-2.228zM89.164 62a1.013 1.013 0 0 1-1.012-1.013V50.658h-20.05a4.26 4.26 0 0 1-4.254-4.253V20.481a4.26 4.26 0 0 1 4.253-4.253h35.646A4.26 4.26 0 0 1 108 20.48v25.924a4.26 4.26 0 0 1-4.253 4.253h-2.821L89.88 61.703a1 1 0 0 1-.717.297"
            fill="#343852"
          />
          <path
            d="M93.823 34.456H79.24a1.013 1.013 0 0 1 0-2.026h14.582a1.013 1.013 0 0 1 0 2.026"
            fill="#D20050"
          />
          <path
            d="M86.532 41.747c-.56 0-1.013-.454-1.013-1.013V26.152a1.013 1.013 0 0 1 2.025 0v14.582c0 .56-.453 1.013-1.012 1.013"
            fill="#D20050"
          />
        </svg>
        {
          !isAdmin && (
            <div>
              <Link
                className="btn btn--plain btn--primary"
                href="creer-un-inventaire"
              >
                Créer un inventaire
              </Link>
            </div>
          )
        }
      </div>
    </div>
  )
}
