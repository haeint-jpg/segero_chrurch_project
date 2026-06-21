import Link from 'next/link'
import { Play, Volume2, FileText, ChevronRight } from 'lucide-react'

export default function SermonSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-medium text-gray-900">이번 주 말씀</h2>
        <Link href="/sermons" className="flex items-center gap-1 text-xs text-gray-400 hover:text-brand-600">
          전체 보기 <ChevronRight size={13} />
        </Link>
      </div>

      {/* 메인 설교 카드 */}
      <Link href="/sermons/latest" className="block border border-gray-100 rounded-xl overflow-hidden hover:border-brand-200 transition-colors mb-3">
        <div className="h-32 bg-[#1a1230] flex items-center justify-center relative">
          <div className="w-12 h-12 rounded-full bg-brand-600/30 border border-brand-400 flex items-center justify-center">
            <Play size={20} className="text-brand-200 ml-1" />
          </div>
          <span className="absolute top-3 left-3 text-[10px] bg-brand-600 text-brand-50 rounded px-2 py-0.5">
            LIVE 녹화
          </span>
        </div>
        <div className="p-4">
          <span className="text-[10px] bg-brand-50 text-brand-600 rounded-full px-2 py-0.5 mb-2 inline-block">
            주일예배 · 2부
          </span>
          <h3 className="text-sm font-medium text-gray-900 leading-snug mb-1">
            "요셉처럼 — 어둠 속에서도 빛나는 다음세대"
          </h3>
          <p className="text-xs text-gray-400 mb-3">담임목사 홍길동 · 2025.06.15 · 창세기 39:1–23</p>
          <div className="flex gap-2">
            {[
              { icon: Play,       label: '영상' },
              { icon: Volume2,    label: '오디오' },
              { icon: FileText,   label: '설교문' },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <Icon size={11} /> {label}
              </button>
            ))}
          </div>
        </div>
      </Link>

      {/* Q.T. 카드 */}
      <Link
        href="/qt"
        className="block bg-gray-50 rounded-xl p-4 hover:bg-brand-50 transition-colors"
      >
        <p className="text-[10px] text-gray-400 mb-1">오늘의 Q.T.</p>
        <p className="text-sm font-medium text-gray-800">창세기 40:1 — 술 맡은 관원장과 요셉</p>
      </Link>
    </section>
  )
}
