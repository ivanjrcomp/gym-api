import { LateCheckInValidationError } from '@/use-cases/errors/late-check-in-validation-error'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  try {
    await validateCheckInUseCase.execute({
      checkinId: checkInId,
    })
  } catch (err) {
    if (err instanceof LateCheckInValidationError) {
      return reply.status(400).send({ message: err.message })
    }

    return reply.status(500).send(err)
  }

  return reply.status(204).send()
}
