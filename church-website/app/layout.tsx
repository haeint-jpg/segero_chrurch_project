import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: '세계로교회',
  description: '하나님의 말씀으로 다음 세대를 일으킵니다 · 경기도 평택시 탄현로 1번길 66',
  openGraph: {
    title: '세계로교회',
    description: '어린이·청소년·청년이 함께 예배하고 성장하는 공동체 · 평택시 세계로교회',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
