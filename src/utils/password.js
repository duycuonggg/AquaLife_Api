import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  const hashed = await bcrypt.hash(plainPassword, salt)
  return hashed
}

export const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword)
}
