import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { validate } from './validate'
import { history } from './history'
import { metrics } from './metrics'
import { verifyUserRole } from '@/http/middlewares/verifyUserRole'
import registerSchemaDefinition from './doc/register.schema'
import historySchemaDefinition from './doc/history.schema'
import metricsSchemaDefinition from './doc/metrics.schema'
import validateSchemaDefinition from './doc/validate.schema'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', { schema: historySchemaDefinition.history }, history)
  app.get('/check-ins/metrics', { schema: metricsSchemaDefinition.metrics }, metrics)

  app.post('/gyms/:gymId/check-ins',
    { schema: registerSchemaDefinition.register },
    create)

  app.patch(
    '/check-ins/:checkInId/validate',
    { schema: validateSchemaDefinition.validate, onRequest: verifyUserRole('ADMIN') },
    validate,
  )
}
