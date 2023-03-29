export default {
  sessions: {
    summary: 'Authenticate',
    description: 'Authenticate a user.',
    tags: ['Users'],
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: {
          type: 'string',
        },
      },
    },
    response: {
      200: {
        description: 'Successfully created user',
        properties: {
          token: {
            type: 'string',
            format: 'jwt',
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiTUVNQkVSIiwic3ViIjoiYmNlNzllYjEtNWI0NS00NTgzLWFkYTUtODNmMWI5Mjg2MzhmIiwiaWF0IjoxNjgwMDUwNDgxLCJleHAiOjE2ODAwNTEwODF9.Oi34cXduNPhzzolzgVZtYis4jDGbDLM5qpKgH579YzA',
            description: 'JWT Access Token',
          },
        },
        produces: ['application/json'],
        headers: {
          'set-cookie': {
            name: 'refreshToken',
            type: 'string',
            format: 'jwt',
            description: 'JWT refresh token used to obtain new access tokens',
            pattern: 'sessionID=.*?; Path=/; HttpOnly; Secure; SameSite=Strict',
            example:
              'refreshToken=JWT token; Path=/; HttpOnly; Secure; SameSite=Strict;',
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
