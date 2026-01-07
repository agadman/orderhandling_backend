const Cookie = require('@hapi/cookie');
const Jwt = require('@hapi/jwt');
require('dotenv').config();

module.exports = {
  register: async (server) => {
    await server.register([Cookie, Jwt]);

    server.auth.strategy('session', 'cookie', {
      cookie: {
        name: 'jwt',
        password: process.env.COOKIE_PASSWORD,
        isSecure: false, // KOM IHÅG ÄNDRA! true i prod (https)
        ttl: 24 * 60 * 60 * 1000,
        isSameSite: 'Lax', // KOM IHÅG ÄNDRA! None i prod + secure
        clearInvalid: true,
        isHttpOnly: true,
        path: '/',         
      },
      redirectTo: false,   
      validate: async (request, session) => {
        try {
          const token = session;
          if (!token) return { isValid: false };

          const artifacts = Jwt.token.decode(token);

          Jwt.token.verify(artifacts, {
            key: process.env.JWT_SECRET,
            algorithms: ['HS256']
          });

          return {
            isValid: true,
            credentials: artifacts.decoded.payload.user
          };
        } catch (err) {
          console.error('Session validation failed:', err);
          return { isValid: false };
        }
      }
    });

    server.auth.default('session');
  }
};