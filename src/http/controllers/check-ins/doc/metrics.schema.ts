export default {
  metrics: {
    summary: 'Get count of user check-ins',
    description:
      'The number or quantity of check-ins made by the user. <br/><br/>***Warning:*** To properly execute this endpoint, you must send a Bearer Token of user that has ADMIN role. Click on the lock icon in the upper right corner of this definition to enter a valid JWT token before executing. If you do not have a valid token, authenticate to obtain one.',
    tags: ['Check-in'],
    security: [{ Bearer: [] }],
    response: {
      200: {
        description: 'Succesful response',
        properties: {
          checkInsCount: { type: 'number' },
        },
      },
    },
  },
}
