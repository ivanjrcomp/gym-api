export default {
  register: {
    summary: 'Register',
    description: 'Register Users',
    tags: ['Users'],
    body: {
      type: 'object',
      properties: {
        name: { type: 'string', default: 'User name' },
        email: { type: 'string' },
        password: {
          type: 'string',
        },
      },
    },
    response: {
      201: {
        description: 'Successfully created user',
        properties: {},
      },
      409: {
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
