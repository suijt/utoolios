import type { Config } from 'tailwindcss'
import { tailwindPreset } from '../../packages/config/src/tailwind-preset'

const config: Config = {
  presets: [tailwindPreset as Config],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
}

export default config
