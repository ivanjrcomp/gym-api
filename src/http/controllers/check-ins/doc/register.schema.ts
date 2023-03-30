export default {
  register: {
    summary: 'Register Check-in',
    description:
      'Register a user check-in at the specified gym (only one per day is acceptable). <br/><br/>***Warning:*** To properly execute this endpoint, you must send a Bearer Token of user that has ADMIN role. Click on the lock icon in the upper right corner of this definition to enter a valid JWT token before executing. If you do not have a valid token, authenticate to obtain one.',
    tags: ['Check-in'],
    params: {
      type: 'object',
      properties: {
        gymId: {
          type: 'string',
          format: 'uuid',
        },
      },
    },
    body: {
      type: 'object',
      properties: {
        latitude: { type: 'number' },
        longitude: { type: 'number' },
      },
    },
    security: [{ Bearer: [] }],
    response: {
      201: {
        description: 'Succesful response',
        properties: {},
      },
    },
  },
}
