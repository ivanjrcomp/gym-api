import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate.controller'
import { profile } from './profile.controller'
import { register } from './register.controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh.controller'
import registerDefinition from './doc/register.schema'
import authenticateSchemaDefinition from './doc/authenticate.schema'
import profileSchemaDefinition from './doc/profile.schema'
import refreshSchemaDefinition from './doc/refresh.schema'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', { schema: registerDefinition.register }, register)

  app.post(
    '/sessions',
    { schema: authenticateSchemaDefinition.sessions },
    authenticate,
  )

  app.patch(
    '/token/refresh',
    { schema: refreshSchemaDefinition.refresh },
    refresh,
  )

  /* ** Authenticated ** */
  app.get(
    '/me',
    { schema: profileSchemaDefinition.profile, onRequest: [verifyJWT] },
    profile,
  )
}
