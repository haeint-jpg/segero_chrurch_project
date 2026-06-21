import { Flame, MapPin, Phone, Clock } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-xl font-medium text-gray-900 mb-8">교회 소개</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-gray-100 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              <Flame size={16} className="text-brand-600" />
            </div>
            <h2 className="text-sm font-medium text-gray-900">세계로교회</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            하나님의 말씀으로 다음 세대를 일으키는 교회입니다.<br />
            어린이·청소년·청년이 함께 예배하고 성장하는 공동체입니다.
          </p>
        </div>

        <div className="border border-gray-100 rounded-xl p-6 flex flex-col gap-4">
          <h2 className="text-sm font-medium text-gray-900">오시는 길</h2>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin size={15} className="mt-0.5 shrink-0 text-gray-400" />
            경기도 평택시 탄현로 1번길 66
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={15} className="shrink-0 text-gray-400" />
            주일예배 오전 9시 · 11시
          </div>
        </div>
      </div>

      <div className="mt-6 border border-gray-100 rounded-xl overflow-hidden">
        <iframe
          src="https://maps.google.com/maps?q=경기도+평택시+탄현로+1번길+66&output=embed"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="세계로교회 위치"
        />
      </div>
    </div>
  )
}
