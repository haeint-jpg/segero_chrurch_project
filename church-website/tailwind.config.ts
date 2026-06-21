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
        brand: {
          50:  '#EEEDFE',
          100: '#CECBF6',
          200: '#AFA9EC',
          400: '#7F77DD',
          600: '#534AB7',
          800: '#3C3489',
          900: '#26215C',
        },
        teal: {
          50:  '#E1F5EE',
          600: '#0F6E56',
        },
        amber: {
          50:  '#FAEEDA',
          600: '#854F0B',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Apple SD Gothic Neo', 'Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
