export default {
  refresh: {
    summary: 'Refresh',
    description:
      'Get a new Access and Refresh Tokens.' +
      ' <br/><br/>**__Warning__**: To properly execute this endpoint, you must send a Cookie with Refresh Token. ' +
      'Click on the lock icon in the upper right corner of this definition to enter a valid JWT Refresh token ' +
      'before executing. If you do not have a valid Refresh token, authenticate to obtain one.' +
      ' <br/><br/>**__Note__**: Until this release, Swagger-UI was not sending cookies during requests,' +
      " even if you set the 'withCredentials: true ' of Swagger UI config. Therefore, if it does not run through the interface, I suggest copying the curl command and executing it in your terminal if you want to test this endpoint.",
    tags: ['Users'],
    security: [{ cookieAuth: [] }],
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
  },
}
