import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQueryParamsSchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymQueryParamsSchema.parse(request.query)

  const CreateGymUseCase = makeSearchGymsUseCase()

  const { gyms } = await CreateGymUseCase.execute({
    query: q,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
