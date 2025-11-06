import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { authModel } from '~/models/authModel'
import { env } from '~/config/environment'

const login = async (email, password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const employees = await authModel.findByEmail(email)
    if (!employees) throw new Error('Email not found')

    const isMatch = await bcrypt.compare(password, employees.password)
    if (!isMatch) throw new Error('Incorrect password')

    const token = jwt.sign(
      { id: employees._id, role: employees.role, email: employees.email },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN || '7d' }
    )

    return {
      message: 'Login successful',
      token,
      employee: {
        id: employees._id,
        name: employees.name,
        email: employees.email,
        role: employees.role
      }
    }
  } catch (error) { throw error }
}

export const authService = {
  login
}
