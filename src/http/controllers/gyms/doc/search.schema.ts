export default {
  search: {
    summary: 'Search Gyms by Title',
    description:
      "Retrieve all gyms whose titles contain a query specified by the 'q' query parameter. If you want to consume paginated, just inform the page as well. <br/><br/>***Warning:*** To properly execute this endpoint, you must send a Bearer Token. Note that this endpoint does not check for the user's role. Click on the lock icon in the upper right corner of this definition to enter a valid JWT token before executing.If you do not have a valid token, authenticate to obtain one.",
    tags: ['Gyms'],
    security: [{ Bearer: [] }],
    query: {
      type: 'object',
      properties: {
        q: {
          type: 'string',
          description: 'query sentence',
        },
        page: {
          type: 'number',
        },
      },
    },
    response: {
      200: {
        description: 'Successfully execution',
        type: 'object',
        properties: {
          gyms: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
                phone: { type: 'string' },
                latitude: { type: 'string' },
                longitude: { type: 'string' },
              },
              required: [
                'id',
                'title',
                'description',
                'phone',
                'latitude',
                'longitude',
              ],
            },
          },
        },
      },
    },
  },
}
