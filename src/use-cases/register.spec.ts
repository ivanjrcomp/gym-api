import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { RegisterUseCase } from './register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const user2Register = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    }

    const { user } = await sut.execute(user2Register)

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const user2Register = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    }

    const { user } = await sut.execute(user2Register)

    const isPasswordCorrectlyHashed = await compare(
      user2Register.password,
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
