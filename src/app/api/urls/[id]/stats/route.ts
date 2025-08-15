import { NextRequest, NextResponse } from 'next/server'
import { getURLStats, getCurrentUser } from '@/lib/database'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const urlId = params.id
    const { searchParams } = new URL(request.url)
    const hours = parseInt(searchParams.get('hours') || '24')

    // Verify the URL belongs to the user
    const { data: urlData, error: urlError } = await supabase
      .from('urls')
      .select('id')
      .eq('id', urlId)
      .eq('user_id', user.id)
      .single()

    if (urlError || !urlData) {
      return NextResponse.json(
        { error: 'URL not found' },
        { status: 404 }
      )
    }

    const stats = await getURLStats(urlId, hours)
    return NextResponse.json({ stats })
  } catch (error) {
    console.error('Error fetching URL stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch URL stats' },
      { status: 500 }
    )
  }
}