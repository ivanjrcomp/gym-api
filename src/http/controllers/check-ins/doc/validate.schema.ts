export default {
  validate: {
    summary: "Validate user's Check-in",
    description:
      "Validate a user's check-in (only Admin users can do this).. <br/><br/>***Warning:*** To properly execute this endpoint, you must send a Bearer Token of user that has ADMIN role. Click on the lock icon in the upper right corner of this definition to enter a valid JWT token before executing. If you do not have a valid token, authenticate to obtain one.",
    tags: ['Check-in'],
    params: {
      type: 'object',
      properties: {
        checkInId: {
          type: 'string',
          format: 'uuid',
        },
      },
    },
    security: [{ Bearer: [] }],
    response: {
      204: {
        description: 'Succesful response',
        properties: {},
      },
    },
  },
}
