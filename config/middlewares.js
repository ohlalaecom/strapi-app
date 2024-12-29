module.exports = [
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: '*', // Allow any website or URL
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
      headers: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'], // Allowed headers
      credentials: false, // Set to true only if needed
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::favicon',
  'strapi::public',
];