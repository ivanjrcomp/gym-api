export default {
  register: {
    summary: 'Register Users',
    description: 'Get list of all registered transactions',
    tags: ['Check-in'],
    cookies: {
      type: 'object',
      properties: {
        sessionId: {
          type: 'string',
          required: true,
          description:
            'This cookie includes the session ID, path, and expiration date. ' +
            '*It is generated during the first transaction registration and ' +
            'is used to maintain session state.',
        },
      },
    },
    response: {
      200: {
        description: 'Succesful response',
        properties: {
          transactions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  description: 'Transaction id',
                  type: 'string',
                  format: 'uuid',
                },
                title: { description: 'Transaction title', type: 'string' },
                amount: { description: 'Transaction amount', type: 'number' },
                created_at: {
                  description: 'Transaction created date',
                  type: 'string',
                  format: 'date',
                },
                session_id: {
                  description: 'Session ID',
                  type: 'string',
                  format: 'uuid',
                },
              },
            },
          },
        },
      },
    },
  },
}
