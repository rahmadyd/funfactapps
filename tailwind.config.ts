import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        python: '#2f5fc0',
        toefl: '#b4531f',
        design: '#9a3fb0',
        japanese: '#b8324a',
        machinelearning: '#3d8b7a',
        react: '#0891b2',
        nodejs: '#15803d',
        sql: '#2563eb',
        nosql: '#0d9488',
        excel: '#047857',
        ielts: '#ea580c',
        affirmation: '#7c3aed',
        linux: '#d97706',
        git: '#ea580c',
        cicd: '#0284c7',
        docker: '#2563eb',
        tailwind: '#0d9488',
        publicspeaking: '#0369a1',
        confidence: '#e11d48',
        background: {
          light: '#f6f3ee',
          dark: '#1d1c1b',
        },
        card: {
          light: '#fffdf9',
          dark: '#262523',
        },
        text: {
          light: '#2f3338',
          dark: '#e6e2da',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease-in-out',
        'pulse-gentle': 'pulseGentle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: 'media',
}
export default config