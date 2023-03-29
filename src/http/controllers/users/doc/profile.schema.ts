export default {
  profile: {
    summary: 'Profile',
    description:
      'Get a Profile of authenticated user. <br/><br/>***Warning:*** To properly execute this endpoint, you must send a Bearer Token. Click on the lock icon in the upper right corner of this definition to enter a valid JWT token before executing. If you do not have a valid token, authenticate to obtain one.',
    tags: ['Users'],
    security: [{ Bearer: [] }],
    response: {
      200: {
        description: 'Profile retrieved successfully',
        properties: {
          user: {
            type: 'object',
            properties: {
              id: {
                description: 'User id',
                type: 'string',
                format: 'uuid',
              },
              name: {
                description: 'User name',
                type: 'string',
                example: 'John Doe',
              },
              email: {
                description: 'User email',
                type: 'string',
                format: 'email',
              },
              role: {
                description: 'User email',
                type: 'string',
                enum: ['ADMIN', 'MEMBER'],
              },
              created_at: {
                description: 'User created date',
                type: 'string',
                format: 'date-time',
              },
              updated_at: {
                description: 'The last time the user was updated',
                type: 'string',
                format: 'date-time',
              },
            },
          },
        },
      },
      default: {
        description: 'Authentication failure',
        properties: {
          message: {
            type: 'string',
            description: 'Error message',
            example: 'Error message',
          },
        },
      },
    },
  },
}
