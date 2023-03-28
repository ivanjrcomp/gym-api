import { FastifyRequest, FastifyReply } from 'fastify'
import { z, ZodIssue } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })

  const parsedBody = registerBodySchema.safeParse(request.body)

  if (!parsedBody.success) {
    const messageErrorArray: Array<String> = []
    let messageError: String = ''

    const object: { [key: string]: string[] } = parsedBody.error.flatten(
      (issue: ZodIssue) => {
        return `${issue.message.toLowerCase()}`
      },
    ).fieldErrors

    for (const key in object) {
      messageErrorArray.push(`${key}: ${object[key].join(',')}`)
    }

    messageError = messageErrorArray.join('; ')

    return reply.status(400).send({
      message: messageError,
    })
  }

  try {
    const { name, email, password } = parsedBody.data

    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    return reply.status(500).send(err)
  }

  return reply.status(201).send({})
}
