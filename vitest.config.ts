import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      include: [
        'src/app/(connecte)/modifier-un-referentiel/**/*',
        'src/components/ModifierUnReferentiel/**/*',
        'src/app/(connecte)/creer-une-simulation/*',
        'src/components/CreerUneSimulation/**/*',
        'src/app/(connecte)/page.tsx',
        'src/components/Inventaires/**/*',
        'src/app/(deconnecte)/connexion/**/*',
        'src/components/Connexion/**/*',
        'src/components/commun/EnTete.tsx',
      ],
      provider: 'istanbul',
      skipFull: true,
    },
    environment: 'jsdom',
    globals: true,
    sequence: { shuffle: true },
    setupFiles: ['vitest.setup.ts'],
    unstubEnvs: true,
    unstubGlobals: true,
  },
})
