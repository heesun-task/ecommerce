import { User } from '@/generated/prisma'
import { prisma } from './prisma'

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: { email }
    })
  } catch (error) {
    console.error('Error getting user by email:', error)
    return null
  }
}

export async function getUserWithPasswordByEmail(email: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: { email },
      // Include password field for authentication
    })
  } catch (error) {
    console.error('Error getting user with password:', error)
    return null
  }
}

export async function createUser(email: string, password: string, name?: string): Promise<User> {
  return await prisma.user.create({
    data: {
      email,
      password,
      name,
    }
  })
}

export async function getUserById(id: string): Promise<Omit<User, 'password'> | null> {
  try {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password for security
      }
    })
  } catch (error) {
    console.error('Error getting user by id:', error)
    return null
  }
}