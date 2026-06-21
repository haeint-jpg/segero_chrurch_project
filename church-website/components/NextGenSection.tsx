'use client'
import { useState, useEffect, type ElementType } from 'react'
import Link from 'next/link'
import { Star, Zap, Flame, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Item = { id: string; title: string; subtitle: string; badge: string; href: string }
type Dept = 'children' | 'youth' | 'young'

const TAB_META: { key: Dept; label: string; icon: ElementType; badgeStyle: string }[] = [
  { key: 'children', label: '어린이부',  icon: Star,  badgeStyle: 'bg-brand-50 text-brand-600' },
  { key: 'youth',    label: '청소년부',  icon: Zap,   badgeStyle: 'bg-teal-50 text-teal-600' },
  { key: 'young',    label: '청년부',    icon: Flame, badgeStyle: 'bg-amber-50 text-amber-600' },
]

export default function NextGenSection() {
  const [active, setActive] = useState<Dept>('children')
  const [data, setData]     = useState<Record<Dept, Item[]>>({ children: [], youth: [], young: [] })

  useEffect(() => {
    supabase
      .from('nextgen_items')
      .select('id, dept, title, subtitle, badge, href')
      .order('sort_order')
      .then(({ data: rows }) => {
        if (!rows) return
        const grouped: Record<Dept, Item[]> = { children: [], youth: [], young: [] }
        rows.forEach(r => { grouped[r.dept as Dept]?.push(r) })
        setData(grouped)
      })
  }, [])

  const tab = TAB_META.find(t => t.key === active)!
  const items = data[active]

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-medium text-gray-900">다음세대</h2>
        <Link href="/next-gen" className="flex items-center gap-1 text-xs text-gray-400 hover:text-brand-600">
          전체 보기 <ChevronRight size={13} />
        </Link>
      </div>

      {/* 탭 */}
      <div className="flex border border-gray-100 rounded-lg overflow-hidden mb-3">
        {TAB_META.map(t => {
          const Icon = t.icon
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-colors ${
                active === t.key
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Icon size={13} />
              {t.label}
            </button>
          )
        })}
      </div>

      {/* 항목 목록 */}
      {items.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-4">등록된 일정이 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map(item => (
            <Link
              key={item.id}
              href={item.href || '#'}
              className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                <p className="text-xs text-gray-400">{item.subtitle}</p>
              </div>
              <span className={`text-[10px] rounded-full px-2 py-0.5 shrink-0 ${tab.badgeStyle}`}>
                {item.badge}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
