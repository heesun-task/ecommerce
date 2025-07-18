import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword, generateTokens } from '@/lib/auth'
import { isValidEmail } from '@/lib/validators'
import { getUserWithPasswordByEmail } from '@/lib/user'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required', code: 'MISSING_FIELDS' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format', code: 'INVALID_EMAIL' },
        { status: 400 }
      )
    }

    // Retrieve a user using an email
    const user = await getUserWithPasswordByEmail(email)

    if (!user || !(await verifyPassword(password, user.password))) {
      return NextResponse.json(
        { error: 'Invalid credentials', code: 'INVALID_CREDENTIALS' },
        { status: 401 }
      )
    }

    // create a token
    const { accessToken, refreshToken } = generateTokens(user.id, user.role)

    // save session to DB to manage the refresh token
    await prisma.session.create({
      data: {
        userId: user.id,
        accessToken,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7일
      }
    })

    // generate response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    })

    // set cookie
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60, // 15 min
    })

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response

  } catch (error) {
    console.error('Login Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    )
  }
}