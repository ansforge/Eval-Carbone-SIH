import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      exclude: [
        'src/app/(connecte)/layout.tsx',
        'src/app/(deconnecte)/layout.tsx',
        'src/components/Accessibilite',
        'src/components/DonneesPersonnelles',
        'src/components/EcoConception',
        'src/components/Faq',
        'src/components/MentionsLegales',
        'src/components/NousContacter',
      ],
      include: [
        'src/app/(connecte)/**/*',
        'src/app/(deconnecte)/**/*',
        'src/components/**/*',
        'src/presenters/**/*',
      ],
      provider: 'istanbul',
      skipFull: true,
    },
    environment: 'jsdom',
    globals: true,
    restoreMocks: true,
    sequence: { shuffle: true },
    setupFiles: ['vitest.setup.ts'],
    unstubEnvs: true,
    unstubGlobals: true,
  },
})
