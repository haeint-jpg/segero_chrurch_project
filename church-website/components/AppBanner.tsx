import { Apple, Play } from 'lucide-react'

export default function AppBanner() {
  return (
    <section className="bg-[#1a1230] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <div>
          <p className="text-xs text-brand-400 mb-1">언제 어디서나 교회와 함께</p>
          <p className="text-lg font-medium text-white">앱으로 설교 · Q.T. · 기도를 이어가세요</p>
        </div>
        <div className="flex gap-3">
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#2d1f5e] border border-brand-600 rounded-lg text-sm text-brand-200 hover:bg-brand-600/40 transition-colors"
          >
            <Apple size={16} /> App Store
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#2d1f5e] border border-brand-600 rounded-lg text-sm text-brand-200 hover:bg-brand-600/40 transition-colors"
          >
            <Play size={14} /> Google Play
          </a>
        </div>
      </div>
    </section>
  )
}
