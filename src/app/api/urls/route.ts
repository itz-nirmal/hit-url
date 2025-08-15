import { NextRequest, NextResponse } from 'next/server'
import { createURL, getUserURLs, getCurrentUser } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const urls = await getUserURLs(user.id)
    return NextResponse.json({ urls })
  } catch (error) {
    console.error('Error fetching URLs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch URLs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { url, name, description, interval_minutes } = body

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    const newURL = await createURL({
      user_id: user.id,
      url,
      name,
      description,
      interval_minutes: interval_minutes || 5
    })

    return NextResponse.json({ url: newURL }, { status: 201 })
  } catch (error) {
    console.error('Error creating URL:', error)
    return NextResponse.json(
      { error: 'Failed to create URL' },
      { status: 500 }
    )
  }
}