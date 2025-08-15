import { NextRequest, NextResponse } from 'next/server'
import { createURLCheck, pingURL, getCurrentUser } from '@/lib/database'
import { supabase } from '@/lib/supabase'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const urlId = params.id

    // Get the URL details
    const { data: urlData, error: urlError } = await supabase
      .from('urls')
      .select('*')
      .eq('id', urlId)
      .eq('user_id', user.id)
      .single()

    if (urlError || !urlData) {
      return NextResponse.json(
        { error: 'URL not found' },
        { status: 404 }
      )
    }

    // Ping the URL
    const pingResult = await pingURL(urlData.url)

    // Save the check result
    const checkData = await createURLCheck({
      url_id: urlId,
      status_code: pingResult.statusCode,
      response_time_ms: pingResult.responseTime,
      is_success: pingResult.success,
      error_message: pingResult.error
    })

    return NextResponse.json({
      check: checkData,
      result: pingResult
    })
  } catch (error) {
    console.error('Error checking URL:', error)
    return NextResponse.json(
      { error: 'Failed to check URL' },
      { status: 500 }
    )
  }
}