import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let searchGymRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    searchGymRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(searchGymRepository)
  })

  it('should be able to search for gyms', async () => {
    await searchGymRepository.create({
      title: 'Any Gym 1',
      description: null,
      phone: null,
      latitude: -23.5417538,
      longitude: -46.6322704,
    })

    await searchGymRepository.create({
      title: 'Any Gym 2',
      description: null,
      phone: null,
      latitude: -23.5417538,
      longitude: -46.6322704,
    })

    const { gyms } = await sut.execute({
      query: 'Any Gym 2',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Any Gym 2' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await searchGymRepository.create({
        title: `Any Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.5417538,
        longitude: -46.6322704,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Any Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Any Gym 21' }),
      expect.objectContaining({ title: 'Any Gym 22' }),
    ])
  })
})
