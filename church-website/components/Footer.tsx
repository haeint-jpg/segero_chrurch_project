import Link from 'next/link'
import { Flame, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-brand-50 flex items-center justify-center">
                <Flame size={14} className="text-brand-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">세계로교회</span>
            </div>
            <div className="flex items-start gap-1.5 text-xs text-gray-400 mb-1">
              <MapPin size={12} className="mt-0.5 shrink-0" />
              <span>경기도 평택시 탄현로 1번길 66</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Phone size={12} className="shrink-0" />
              <span>주일예배 오전 9시 · 11시</span>
            </div>
          </div>
          <div className="flex gap-6 text-xs text-gray-400">
            <Link href="/privacy"   className="hover:text-gray-700">개인정보처리방침</Link>
            <Link href="/terms"     className="hover:text-gray-700">이용약관</Link>
            <Link href="/about#map" className="hover:text-gray-700">찾아오시는 길</Link>
            <Link href="/admin"     className="hover:text-gray-700">관리자</Link>
          </div>
        </div>
        <p className="mt-6 text-xs text-gray-300">© 2025 세계로교회. All rights reserved.</p>
      </div>
    </footer>
  )
}
