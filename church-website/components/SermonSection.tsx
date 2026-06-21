'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Play, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Sermon = {
  id: string
  title: string
  preacher: string
  scripture: string
  category: string
  youtube_url: string | null
  sermon_date: string
}

export default function SermonSection() {
  const [sermon, setSermon] = useState<Sermon | null>(null)

  useEffect(() => {
    supabase
      .from('sermons')
      .select('*')
      .order('sermon_date', { ascending: false })
      .limit(1)
      .single()
      .then(({ data }) => setSermon(data))
  }, [])

  if (!sermon) return null

  const youtubeId = sermon.youtube_url
    ? new URL(sermon.youtube_url).searchParams.get('v') ?? sermon.youtube_url.split('/').pop()
    : null

  const thumbUrl = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
    : null

  const dateStr = sermon.sermon_date
    ? `${sermon.sermon_date.slice(0, 4)}.${sermon.sermon_date.slice(5, 7)}.${sermon.sermon_date.slice(8, 10)}`
    : ''

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-medium text-gray-900">이번 주 말씀</h2>
        <Link href="/sermons" className="flex items-center gap-1 text-xs text-gray-400 hover:text-brand-600">
          전체 보기 <ChevronRight size={13} />
        </Link>
      </div>

      {/* 메인 설교 카드 */}
      {sermon.youtube_url ? (
        <a
          href={sermon.youtube_url}
          target="_blank"
          rel="noreferrer"
          className="block border border-gray-100 rounded-xl overflow-hidden hover:border-brand-200 transition-colors mb-3"
        >
          <div className="h-32 bg-[#1a1230] flex items-center justify-center relative overflow-hidden">
            {thumbUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={thumbUrl} alt={sermon.title} className="absolute inset-0 w-full h-full object-cover opacity-70" />
            )}
            <div className="relative z-10 w-12 h-12 rounded-full bg-brand-600/40 border border-brand-400 flex items-center justify-center">
              <Play size={20} className="text-brand-200 ml-1" />
            </div>
            <span className="absolute top-3 left-3 text-[10px] bg-brand-600 text-brand-50 rounded px-2 py-0.5 z-10">
              YouTube
            </span>
          </div>
          <SermonBody sermon={sermon} dateStr={dateStr} />
        </a>
      ) : (
        <div className="block border border-gray-100 rounded-xl overflow-hidden mb-3">
          <div className="h-32 bg-[#1a1230] flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-brand-600/30 border border-brand-400 flex items-center justify-center">
              <Play size={20} className="text-brand-200 ml-1" />
            </div>
          </div>
          <SermonBody sermon={sermon} dateStr={dateStr} />
        </div>
      )}
    </section>
  )
}

function SermonBody({ sermon, dateStr }: { sermon: Sermon; dateStr: string }) {
  return (
    <div className="p-4">
      <span className="text-[10px] bg-brand-50 text-brand-600 rounded-full px-2 py-0.5 mb-2 inline-block">
        {sermon.category}
      </span>
      <h3 className="text-sm font-medium text-gray-900 leading-snug mb-1">
        "{sermon.title}"
      </h3>
      <p className="text-xs text-gray-400">
        {sermon.preacher} · {dateStr}
        {sermon.scripture ? ` · ${sermon.scripture}` : ''}
      </p>
    </div>
  )
}
