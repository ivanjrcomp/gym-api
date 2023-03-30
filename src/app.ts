import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { ZodError } from 'zod'
import { env } from './env'
import { checkInsRoutes } from './http/controllers/check-ins/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { usersRoutes } from './http/controllers/users/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: { cookieName: 'refreshToken', signed: false },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(fastifySwagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Gym API',
      description:
        'Efficient, maintainable, and reliable gym software backend utilizing SOLID principles and advanced technologies.',
      version: '1.0.0',
      contact: { name: 'Ivan Coimbra' },
    },
    externalDocs: {
      url: 'https://github.com/ivanjrcomp/gym-api',
      description: 'More info here!',
    },
    components: {
      securitySchemes: {
        Bearer: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Bearer Token',
        },
        cookieAuth: {
          type: 'apiKey',
          name: 'refreshToken',
          in: 'cookie',
        },
      },
    },
  },
  stripBasePath: true,
})

// const buffer = fs.readFileSync('favicon.png', 'base64')

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  /* theme: {
    favicon: [
      {
        filename: 'favicon.png',
        rel: 'icon',
        sizes: '16x16',
        type: 'image/png',
        content: Buffer.from(buffer, 'base64'),
      },
    ],
  }, */
  uiConfig: {
    deepLinking: true,
    layout: 'BaseLayout',
    showExtensions: true,
    displayRequestDuration: true,
    docExpansion: 'list',
    withCredentials: true,
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, _request, _reply) => {
    return swaggerObject
  },
  transformSpecificationClone: false,
})

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we can log to a tool like Datadog/NewRelic or another observability tool
  }

  return reply.status(500).send({
    message: 'Internal server error!',
  })
})
