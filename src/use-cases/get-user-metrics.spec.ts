import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInRepository)
  })

  it('should be able to get check-in counts from metrics', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'userId-01',
    })

    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'userId-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'userId-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
