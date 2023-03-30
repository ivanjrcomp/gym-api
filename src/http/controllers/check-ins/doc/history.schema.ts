export default {
  history: {
    summary: 'Check-ins History',
    description:
      'Register a user check-in at the specified gym (only one per day is acceptable). <br/><br/>***Warning:*** To properly execute this endpoint, you must send a Bearer Token of user that has ADMIN role. Click on the lock icon in the upper right corner of this definition to enter a valid JWT token before executing. If you do not have a valid token, authenticate to obtain one.',
    tags: ['Check-in'],
    query: {
      type: 'object',
      properties: {
        page: {
          type: 'number',
        },
      },
    },
    security: [{ Bearer: [] }],
    response: {
      200: {
        description: 'Succesful response',
        properties: {
          checkIns: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                validate_at: { type: 'string', format: 'date-time' },
                user_id: { type: 'string' },
                gym_id: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
}
