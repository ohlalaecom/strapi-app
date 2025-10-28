module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'a5fd298bb86ffa71052481f9bb813cfd'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', '7e2db6234bda63d18e4468fefb622d6b'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'default-transfer-token-salt'),
    },
  },
});
