'use client'
import { useState, useEffect, type ElementType } from 'react'
import Link from 'next/link'
import { Star, Zap, Flame } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Item = { id: string; title: string; subtitle: string; badge: string; href: string }
type Dept = 'children' | 'youth' | 'young'

const TABS: { key: Dept; label: string; icon: ElementType; badgeStyle: string }[] = [
  { key: 'children', label: '어린이부', icon: Star,  badgeStyle: 'bg-brand-50 text-brand-600' },
  { key: 'youth',    label: '청소년부', icon: Zap,   badgeStyle: 'bg-teal-50 text-teal-600' },
  { key: 'young',    label: '청년부',   icon: Flame, badgeStyle: 'bg-amber-50 text-amber-600' },
]

export default function NextGenPage() {
  const [active, setActive] = useState<Dept>('children')
  const [data, setData] = useState<Record<Dept, Item[]>>({ children: [], youth: [], young: [] })

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

  const tab = TABS.find(t => t.key === active)!
  const items = data[active]

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-xl font-medium text-gray-900 mb-6">다음세대</h1>

      <div className="flex border border-gray-100 rounded-lg overflow-hidden mb-6 max-w-sm">
        {TABS.map(t => {
          const Icon = t.icon
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors ${
                active === t.key ? 'bg-brand-600 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Icon size={14} /> {t.label}
            </button>
          )
        })}
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-gray-400">등록된 일정이 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map(item => (
            <Link
              key={item.id}
              href={item.href || '#'}
              className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.subtitle}</p>
              </div>
              <span className={`text-[11px] rounded-full px-3 py-1 shrink-0 ${tab.badgeStyle}`}>
                {item.badge}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
