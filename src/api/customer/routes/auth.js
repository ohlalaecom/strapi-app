module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/auth',
        handler: 'auth.login',
        config: {
          auth: false,
        },
      },
    ],
  };
  