import { NextRequest, NextResponse } from 'next/server'
import { hashPassword, generateTokens } from '@/lib/auth'
import { isValidEmail, isValidPassword } from '@/lib/validators'
import { getUserByEmail, createUser } from '@/lib/user'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json()

    // validate inputs
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

    if (!isValidPassword(password)) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters with letters and numbers', code: 'INVALID_PASSWORD' },
        { status: 400 }
      )
    }

    // check the email duplication
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists', code: 'EMAIL_EXISTS' },
        { status: 409 }
      )
    }

    // password hashing
    const hashedPassword = await hashPassword(password)

    // create a user
    const user = await createUser(email, hashedPassword, name)

    // generate a token
    const { accessToken, refreshToken } = generateTokens(user.id, user.role)

    await prisma.session.create({
      data: {
        userId: user.id,
        accessToken,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }
    })

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    })

    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60,
    })

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })

    return response

  } catch (error) {
    console.error('Signup Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    )
  }
}