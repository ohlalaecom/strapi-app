const path = require('path');

// module.exports = ({ env }) => ({
//   connection: {
//     client: 'sqlite',
//     connection: {
//       filename: path.join(__dirname, '..', env('DATABASE_FILENAME', 'db/data.db')),
//     },
//     useNullAsDefault: true,
//   },
// });

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'your-render-host'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'your-database-name'),
      user: env('DATABASE_USERNAME', 'your-username'),
      password: env('DATABASE_PASSWORD', 'your-password'),
      ssl: { rejectUnauthorized: false }, // Required for Render
    },
    debug: false,
  },
});

