export default {
  create: {
    summary: 'Register Gym',
    description:
      'Register a new Gym. <br/><br/>***Warning:*** To properly execute this endpoint, you must send a Bearer Token of user that has ADMIN role. Click on the lock icon in the upper right corner of this definition to enter a valid JWT token before executing. If you do not have a valid token, authenticate to obtain one.',
    tags: ['Gyms'],
    security: [{ Bearer: [] }],
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        phone: { type: 'string' },
        latitude: {
          type: 'number',
        },
        longitude: {
          type: 'number',
        },
      },
    },
    response: {
      201: {
        description: 'Successfully created user',
        properties: {},
      },
      default: {
        description: 'Registration failure',
        properties: {
          message: { type: 'string' },
        },
        example: {
          message: 'E-mail already exists!',
        },
      },
    },
  },
}
