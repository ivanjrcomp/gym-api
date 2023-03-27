import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to register', async () => {
    const gym2Register = {
      title: 'IT Gym',
      latitude: -23.5417538,
      longitude: -46.6322704,
    }

    const { gym } = await sut.execute(gym2Register)

    expect(gym.id).toEqual(expect.any(String))
  })
})
