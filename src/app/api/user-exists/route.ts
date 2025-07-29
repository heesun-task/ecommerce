import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/user'
import { isValidEmail } from '@/lib/validators'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const user = await getUserByEmail(email)
    
    return NextResponse.json({ 
      exists: !!user,
      email: email
    })

  } catch (error) {
    console.error('User exists check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}