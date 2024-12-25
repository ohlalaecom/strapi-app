module.exports = [
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://oh-lala.co'], // Replace with your frontend URL
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
      headers: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'], // Allowed headers
      credentials: true, // Allow credentials if needed (e.g., cookies, Authorization header)
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::favicon',
  'strapi::public',
];
