import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type Post = {
  id: string
  category: 'notice' | 'bulletin' | 'gallery' | 'prayer' | 'sermon'
  title: string
  content: string | null
  image_url: string | null
  source: 'band' | 'admin'
  created_at: string
}
