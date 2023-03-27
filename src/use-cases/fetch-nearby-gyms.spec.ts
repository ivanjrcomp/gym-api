import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let searchGymRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch nearby Gyms Use Case', () => {
  beforeEach(async () => {
    searchGymRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(searchGymRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await searchGymRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -23.5417538,
      longitude: -46.6322704,
    })

    await searchGymRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -23.602072,
      longitude: -46.7236065,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.6010078,
      userLongitude: -46.7222281,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
