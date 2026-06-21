'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Plus, Pencil, Trash2, LogOut, X, Save } from 'lucide-react'

// ────────────────────────────────────────────────────
// 타입 정의
// ────────────────────────────────────────────────────
type Notice = {
  id: string
  tag: string
  text: string
  created_at: string
}

type Sermon = {
  id: string
  title: string
  preacher: string
  scripture: string
  category: string
  youtube_url: string | null
  sermon_date: string
}

type NextGen = {
  id: string
  dept: 'children' | 'youth' | 'young'
  title: string
  subtitle: string
  badge: string
  href: string
  sort_order: number
}

type Tab = 'notice' | 'sermon' | 'nextgen'

// ────────────────────────────────────────────────────
// 관리자 페이지
// ────────────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('notice')
  const [adminEmail, setAdminEmail] = useState('')
  const [checking, setChecking] = useState(true)

  // 로그인 & 관리자 여부 확인
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/login'); return }
      setAdminEmail(user.email ?? '')
      setChecking(false)
    })
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">확인 중...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900">관리자 페이지</p>
          <p className="text-xs text-gray-400">{adminEmail}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors"
        >
          <LogOut size={13} /> 로그아웃
        </button>
      </div>

      {/* 탭 */}
      <div className="bg-white border-b border-gray-100 px-6 flex gap-6">
        {([
          ['notice',  '공지사항'],
          ['sermon',  '설교'],
          ['nextgen', '다음세대'],
        ] as [Tab, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`py-3 text-sm border-b-2 transition-colors ${
              tab === key
                ? 'border-brand-600 text-brand-600 font-medium'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {tab === 'notice'  && <NoticeAdmin />}
        {tab === 'sermon'  && <SermonAdmin />}
        {tab === 'nextgen' && <NextGenAdmin />}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────
// 공지사항 관리
// ────────────────────────────────────────────────────
function NoticeAdmin() {
  const [items, setItems]   = useState<Notice[]>([])
  const [form, setForm]     = useState<Partial<Notice> | null>(null)
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    const { data } = await supabase.from('notices').select('*').order('created_at', { ascending: false })
    setItems(data ?? [])
  }, [])

  useEffect(() => { load() }, [load])

  async function save() {
    if (!form?.text) return
    setLoading(true)
    if (form.id) {
      await supabase.from('notices').update({ tag: form.tag ?? '공지', text: form.text }).eq('id', form.id)
    } else {
      await supabase.from('notices').insert({ tag: form.tag ?? '공지', text: form.text })
    }
    setLoading(false)
    setForm(null)
    load()
  }

  async function remove(id: string) {
    if (!confirm('삭제하시겠습니까?')) return
    await supabase.from('notices').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-900">공지사항 목록</h2>
        <button
          onClick={() => setForm({ tag: '공지', text: '' })}
          className="flex items-center gap-1.5 text-xs bg-brand-600 text-white px-3 py-1.5 rounded-lg hover:bg-brand-700 transition-colors"
        >
          <Plus size={12} /> 새 공지 작성
        </button>
      </div>

      {/* 작성/수정 폼 */}
      {form && (
        <div className="bg-white border border-brand-200 rounded-xl p-5 mb-4 flex flex-col gap-3">
          <div className="flex gap-3">
            <select
              value={form.tag ?? '공지'}
              onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-brand-400"
            >
              <option>공지</option>
              <option>새소식</option>
              <option>긴급</option>
            </select>
            <input
              type="text"
              value={form.text ?? ''}
              onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
              placeholder="공지 내용을 입력하세요"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-brand-400"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setForm(null)} className="flex items-center gap-1 text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
              <X size={12} /> 취소
            </button>
            <button onClick={save} disabled={loading} className="flex items-center gap-1 text-xs px-3 py-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-60">
              <Save size={12} /> {loading ? '저장 중...' : '저장'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {items.length === 0 && (
          <p className="text-center text-xs text-gray-400 py-8">공지사항이 없습니다.</p>
        )}
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-b-0">
            <span className="text-[10px] bg-brand-50 text-brand-600 rounded-full px-2 py-0.5 shrink-0">{item.tag}</span>
            <span className="flex-1 text-sm text-gray-800 truncate">{item.text}</span>
            <span className="text-xs text-gray-300 shrink-0">{item.created_at.slice(5, 10).replace('-', '.')}</span>
            <button onClick={() => setForm(item)} className="text-gray-300 hover:text-brand-500 transition-colors"><Pencil size={13} /></button>
            <button onClick={() => remove(item.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────
// 설교 관리
// ────────────────────────────────────────────────────
const SERMON_CATEGORIES = ['주일예배 1부', '주일예배 2부', '수요예배', '새벽예배', '청년예배', '청소년예배', '어린이예배']

const EMPTY_SERMON: Omit<Sermon, 'id'> = {
  title: '', preacher: '', scripture: '', category: '주일예배 2부', youtube_url: '', sermon_date: new Date().toISOString().slice(0, 10),
}

function SermonAdmin() {
  const [items, setItems]   = useState<Sermon[]>([])
  const [form, setForm]     = useState<Partial<Sermon> | null>(null)
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    const { data } = await supabase.from('sermons').select('*').order('sermon_date', { ascending: false })
    setItems(data ?? [])
  }, [])

  useEffect(() => { load() }, [load])

  async function save() {
    if (!form?.title || !form.preacher) return
    setLoading(true)
    const payload = {
      title: form.title, preacher: form.preacher, scripture: form.scripture ?? '',
      category: form.category ?? '주일예배 2부', youtube_url: form.youtube_url || null,
      sermon_date: form.sermon_date ?? new Date().toISOString().slice(0, 10),
    }
    if (form.id) {
      await supabase.from('sermons').update(payload).eq('id', form.id)
    } else {
      await supabase.from('sermons').insert(payload)
    }
    setLoading(false)
    setForm(null)
    load()
  }

  async function remove(id: string) {
    if (!confirm('삭제하시겠습니까?')) return
    await supabase.from('sermons').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-900">설교 목록</h2>
        <button
          onClick={() => setForm({ ...EMPTY_SERMON })}
          className="flex items-center gap-1.5 text-xs bg-brand-600 text-white px-3 py-1.5 rounded-lg hover:bg-brand-700 transition-colors"
        >
          <Plus size={12} /> 새 설교 등록
        </button>
      </div>

      {form && (
        <div className="bg-white border border-brand-200 rounded-xl p-5 mb-4 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">설교 제목 *</label>
              <input
                value={form.title ?? ''}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="예: 요셉처럼 빛나라"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">설교자 *</label>
              <input
                value={form.preacher ?? ''}
                onChange={e => setForm(f => ({ ...f, preacher: e.target.value }))}
                placeholder="예: 김철수 목사"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">본문 성경</label>
              <input
                value={form.scripture ?? ''}
                onChange={e => setForm(f => ({ ...f, scripture: e.target.value }))}
                placeholder="예: 창세기 39:1-23"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">예배 구분</label>
              <select
                value={form.category ?? '주일예배 2부'}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400"
              >
                {SERMON_CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">설교 날짜</label>
              <input
                type="date"
                value={form.sermon_date ?? ''}
                onChange={e => setForm(f => ({ ...f, sermon_date: e.target.value }))}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">YouTube URL</label>
              <input
                value={form.youtube_url ?? ''}
                onChange={e => setForm(f => ({ ...f, youtube_url: e.target.value }))}
                placeholder="https://youtube.com/watch?v=..."
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setForm(null)} className="flex items-center gap-1 text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
              <X size={12} /> 취소
            </button>
            <button onClick={save} disabled={loading} className="flex items-center gap-1 text-xs px-3 py-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-60">
              <Save size={12} /> {loading ? '저장 중...' : '저장'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {items.length === 0 && (
          <p className="text-center text-xs text-gray-400 py-8">등록된 설교가 없습니다.</p>
        )}
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-b-0">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
              <p className="text-xs text-gray-400">{item.preacher} · {item.sermon_date} · {item.category}</p>
            </div>
            {item.youtube_url && (
              <a href={item.youtube_url} target="_blank" rel="noreferrer" className="text-[10px] text-brand-600 bg-brand-50 rounded px-2 py-0.5 shrink-0">YouTube</a>
            )}
            <button onClick={() => setForm(item)} className="text-gray-300 hover:text-brand-500 transition-colors"><Pencil size={13} /></button>
            <button onClick={() => remove(item.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────
// 다음세대 일정 관리
// ────────────────────────────────────────────────────
const DEPT_LABELS: Record<string, string> = { children: '어린이부', youth: '청소년부', young: '청년부' }

const EMPTY_NEXTGEN: Omit<NextGen, 'id'> = {
  dept: 'children', title: '', subtitle: '', badge: '', href: '', sort_order: 0,
}

function NextGenAdmin() {
  const [items, setItems]   = useState<NextGen[]>([])
  const [form, setForm]     = useState<Partial<NextGen> | null>(null)
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    const { data } = await supabase.from('nextgen_items').select('*').order('dept').order('sort_order')
    setItems(data ?? [])
  }, [])

  useEffect(() => { load() }, [load])

  async function save() {
    if (!form?.title) return
    setLoading(true)
    const payload = {
      dept: form.dept ?? 'children', title: form.title, subtitle: form.subtitle ?? '',
      badge: form.badge ?? '', href: form.href ?? '', sort_order: form.sort_order ?? 0,
    }
    if (form.id) {
      await supabase.from('nextgen_items').update(payload).eq('id', form.id)
    } else {
      await supabase.from('nextgen_items').insert(payload)
    }
    setLoading(false)
    setForm(null)
    load()
  }

  async function remove(id: string) {
    if (!confirm('삭제하시겠습니까?')) return
    await supabase.from('nextgen_items').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-900">다음세대 일정</h2>
        <button
          onClick={() => setForm({ ...EMPTY_NEXTGEN })}
          className="flex items-center gap-1.5 text-xs bg-brand-600 text-white px-3 py-1.5 rounded-lg hover:bg-brand-700 transition-colors"
        >
          <Plus size={12} /> 새 일정 등록
        </button>
      </div>

      {form && (
        <div className="bg-white border border-brand-200 rounded-xl p-5 mb-4 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">부서</label>
              <select
                value={form.dept ?? 'children'}
                onChange={e => setForm(f => ({ ...f, dept: e.target.value as NextGen['dept'] }))}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400"
              >
                <option value="children">어린이부</option>
                <option value="youth">청소년부</option>
                <option value="young">청년부</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">배지 텍스트</label>
              <input
                value={form.badge ?? ''}
                onChange={e => setForm(f => ({ ...f, badge: e.target.value }))}
                placeholder="예: D-32, 신청하기"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400"
              />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label className="text-xs text-gray-500">제목 *</label>
              <input
                value={form.title ?? ''}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="예: 2025 여름 성경학교"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400"
              />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <label className="text-xs text-gray-500">부제</label>
              <input
                value={form.subtitle ?? ''}
                onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))}
                placeholder="예: 7월 21-25일 · 신청 접수 중"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">링크 경로</label>
              <input
                value={form.href ?? ''}
                onChange={e => setForm(f => ({ ...f, href: e.target.value }))}
                placeholder="/next-gen/children/camp"
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">정렬 순서 (숫자)</label>
              <input
                type="number"
                value={form.sort_order ?? 0}
                onChange={e => setForm(f => ({ ...f, sort_order: Number(e.target.value) }))}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setForm(null)} className="flex items-center gap-1 text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
              <X size={12} /> 취소
            </button>
            <button onClick={save} disabled={loading} className="flex items-center gap-1 text-xs px-3 py-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-60">
              <Save size={12} /> {loading ? '저장 중...' : '저장'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {items.length === 0 && (
          <p className="text-center text-xs text-gray-400 py-8">등록된 일정이 없습니다.</p>
        )}
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-b-0">
            <span className="text-[10px] bg-gray-100 text-gray-500 rounded-full px-2 py-0.5 shrink-0">{DEPT_LABELS[item.dept]}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
              <p className="text-xs text-gray-400">{item.subtitle}</p>
            </div>
            <span className="text-[10px] text-brand-600 bg-brand-50 rounded px-2 py-0.5 shrink-0">{item.badge}</span>
            <button onClick={() => setForm(item)} className="text-gray-300 hover:text-brand-500 transition-colors"><Pencil size={13} /></button>
            <button onClick={() => remove(item.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
          </div>
        ))}
      </div>
    </div>
  )
}
