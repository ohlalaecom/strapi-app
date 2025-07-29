module.exports = [
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3000', 'https://jacobs-electronics.com'], // ✅ Use specific origins
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      headers: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
      credentials: true, // ✅ Set to true to allow cookies/auth headers
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::favicon',
  'strapi::public',
];
