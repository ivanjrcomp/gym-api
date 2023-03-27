import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { CheckInUseCase } from './checkin'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase
let gymsRepository: InMemoryGymsRepository

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gymId-01',
      title: 'Any gym',
      description: '',
      phone: '',
      latitude: -23.6010078,
      longitude: -46.7222281,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gymId-01',
      userId: 'userId-01',
      userLatitude: -23.6010078,
      userLongitude: -46.7222281,
    })

    await expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 2, 21, 15, 0, 0))

    await sut.execute({
      gymId: 'gymId-01',
      userId: 'userId-01',
      userLatitude: -23.6010078,
      userLongitude: -46.7222281,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gymId-01',
        userId: 'userId-01',
        userLatitude: -23.6010078,
        userLongitude: -46.7222281,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 2, 20, 15, 0, 0))

    await sut.execute({
      gymId: 'gymId-01',
      userId: 'userId-01',
      userLatitude: -23.6010078,
      userLongitude: -46.7222281,
    })

    vi.setSystemTime(new Date(2023, 2, 21, 15, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gymId-01',
      userId: 'userId-01',
      userLatitude: -23.6010078,
      userLongitude: -46.7222281,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gymId-02',
      title: 'Any gym 2',
      description: '',
      phone: '',
      latitude: new Decimal(-23.9932685),
      longitude: new Decimal(-46.2590463),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gymId-02',
        userId: 'userId-01',
        userLatitude: -23.6010078,
        userLongitude: -46.7222281,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
