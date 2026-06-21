import HeroSlider from '@/components/HeroSlider'
import QuickLinks from '@/components/QuickLinks'
import SermonSection from '@/components/SermonSection'
import NextGenSection from '@/components/NextGenSection'
import NoticeSection from '@/components/NoticeSection'
import AppBanner from '@/components/AppBanner'

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <QuickLinks />
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
        <SermonSection />
        <div className="flex flex-col gap-8">
          <NextGenSection />
          <NoticeSection />
        </div>
      </div>
      <AppBanner />
    </>
  )
}
