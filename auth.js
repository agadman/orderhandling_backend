const Cookie = require('@hapi/cookie');
const { server } = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
require('dotenv').config();

module.exports = {
    register: async (server) => {
        await server.register([Cookie, Jwt]);

        server.auth.strategy('session', 'cookie', {
            cookie: {
                name: 'jwt',
                password: process.env.COOKIE_PASSWORD,
                isSecure: false, // ÄNDRA TILL true INFÖR PROD
                ttl: 24 * 60 * 60 * 1000, // 24h
                isSameSite: 'Lax', // ÄNDRA TILL None INFÖR PROD
                clearInvalid: true,
                isHttpOnly: true,
            },
            validate: async (request, session) => {
                try {
                    const token = session;

                    if (!token) {
                        return { isValid: false };  
                    }
                    const artifacts = Jwt.token.decode(token);

                    try {
                        Jwt.token.verify(artifacts, {
                            key: process.env.JWT_SECRET,
                            algorithms: ['HS256']
                        });

                        return {
                            isValid: true,
                            credentials: artifacts.decoded.payload
                        };
                    } catch (err) {
                        console.error('Token verification failed:', err);
                        return { isValid: false };
                    }
                } catch (err) {
                    console.error('Error during session validation:', err);
                    return { isValid: false };
                }
            }  
        });
        
        // Sätter session som standardstrategi
        server.auth.default('session'); 
    }
};