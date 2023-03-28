import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate.controller'
import { profile } from './profile.controller'
import { register } from './register.controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh.controller'
import schemaDefinition from './doc/users.schemas'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', { schema: schemaDefinition.register }, register)

  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /* ** Authenticated ** */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
