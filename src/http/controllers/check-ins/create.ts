import { MaxNumberOfCheckInsError } from '@/use-cases/errors/max-number-of-check-ins-error'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const checkInUseCase = makeCheckInUseCase()

  try {
    await checkInUseCase.execute({
      userId: request.user.sub,
      gymId,
      userLatitude: latitude,
      userLongitude: longitude,
    })

  } catch (err) {
    if (err instanceof MaxNumberOfCheckInsError) {
      return reply.status(409).send({ message: err.message })
    }

    return reply.status(500).send(err)
  }


  return reply.status(201).send()
}
