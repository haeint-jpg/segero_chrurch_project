'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Flame } from 'lucide-react'

const topLinks = [
  { label: '말씀함께',    href: '/word' },
  { label: '제자훈련',    href: '/training' },
  { label: '예수동행일기', href: '/qt' },
  { label: '온라인행정',  href: '/admin' },
  { label: '헌금정보',    href: '/offering' },
  { label: '자료실',      href: '/resources' },
]

const mainLinks = [
  { label: '소개',     href: '/about' },
  { label: '말씀',     href: '/sermons' },
  { label: '소식',     href: '/notices' },
  { label: '다음세대', href: '/next-gen' },
  { label: '선교봉사', href: '/mission' },
  { label: '공동체',   href: '/community' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 border-b border-gray-100 text-xs text-gray-400">
        <div className="flex gap-4">
          <Link href="/login"  className="hover:text-gray-700 transition-colors">로그인</Link>
          <Link href="/signup" className="hover:text-gray-700 transition-colors">회원가입</Link>
        </div>
        <nav className="flex gap-5">
          {topLinks.map(l => (
            <Link key={l.href} href={l.href} className="hover:text-brand-600 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center justify-between px-6 h-14">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center">
            <Flame size={18} className="text-brand-600" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-medium text-gray-900">세계로교회</p>
            <p className="text-[10px] text-gray-400">평택시 탄현로 1번길 66</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {mainLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-gray-500 hover:text-brand-600 transition-colors pb-0.5 border-b-2 border-transparent hover:border-brand-600"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center text-white"
          aria-label="메뉴"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          {mainLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm text-gray-700 border-b border-gray-50 hover:bg-brand-50"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-4 px-6 py-3">
            <Link href="/login"  className="text-xs text-gray-400">로그인</Link>
            <Link href="/signup" className="text-xs text-gray-400">회원가입</Link>
          </div>
        </div>
      )}
    </header>
  )
}
