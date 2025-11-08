import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { authModel } from '~/models/authModel'
import { env } from '~/config/environment'
import { usersModel } from '~/models/usersModel'
import { employeesService } from '~/services/employeesService.js'
import { customersService } from '~/services/customersService.js'

const login = async (email, password) => {
  // try to authenticate as an employee first, then fallback to public users
  // eslint-disable-next-line no-useless-catch
  try {
    const employees = await authModel.findByEmail(email)
    if (employees) {
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
    }

    // fallback: check public users collection
    const user = await usersModel.findByEmail(email)
    if (!user) throw new Error('Email not found')

    const isMatchUser = await bcrypt.compare(password, user.password)
    if (!isMatchUser) throw new Error('Incorrect password')

    const token = jwt.sign(
      { id: user._id, role: 'user', email: user.email },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN || '7d' }
    )

    return {
      message: 'Login successful',
      token,
      employee: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: 'user'
      }
    }
  } catch (error) { throw error }
}

const register = async (userPayload) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // if role present -> create employee, otherwise create customer
    if (userPayload.role) {
      // create employee (employeesService will hash password and validate)
      const createEmployees = await employeesService.createNew(userPayload)
      return { message: 'Employee account created', data: createEmployees }
    }

    // no role -> create customer
    const createCustomer = await customersService.createNew(userPayload)
    return { message: 'Customer account created', data: createCustomer }
  } catch (error) { throw error }
}

export const authService = {
  login,
  register
}
