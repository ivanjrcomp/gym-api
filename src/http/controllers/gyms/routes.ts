import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'
import { verifyUserRole } from '@/http/middlewares/verifyUserRole'
import createGymSchemaDefinition from './doc/create.schema'
import nearbyGymSchemaDefinition from './doc/nearby.schema'
import searchGymSchemaDefinition from './doc/search.schema'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', { schema: searchGymSchemaDefinition.search }, search)
  app.get('/gyms/nearby', { schema: nearbyGymSchemaDefinition.nearby }, nearby)

  app.post(
    '/gyms',
    {
      schema: createGymSchemaDefinition.create,
      onRequest: verifyUserRole('ADMIN'),
    },
    create,
  )
}
