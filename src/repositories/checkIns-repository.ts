import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  findById(checkInId: string): Promise<CheckIn | null>

  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>

  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>

  CountByUserId(userID: string): Promise<number>

  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>

  save(checkIn: CheckIn): Promise<CheckIn>
}
