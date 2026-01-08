const Joi = require('joi');
const userController = require('../controllers/user.controller');
const { isAdmin } = require('../middlewares/role');

module.exports = (server) => {
  server.route([
    
    // LOGGA IN
    {
      method: 'POST',
      path: '/auth/login',
      handler: userController.loginUser,
      options: {
        auth: false,
        validate: {
          payload: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
          })
        }
      }
    },
    
    // METOD FÖR ATT KOLLA OM OCH VEM SOM ÄR INLOGGAD
    {
      method: 'GET',
      path: '/auth/me',
      handler: (request, h) => {
        return h.response({ user: request.auth.credentials }).code(200);
      }
    },

    // LOGGA UT
    {
      method: 'POST',
      path: '/auth/logout',
      handler: (request, h) => {
        return h
          .response({ message: 'Logged out' })
          .unstate('jwt') 
          .code(200);
      },
      options: {
        auth: false 
      }
    },

    // SKAPA USER (ENDAST ADMIN)
    {
      method: 'POST',
      path: '/users',
      handler: userController.createUser,
      options: {
        pre: [{ method: isAdmin }],
        validate: {
          payload: Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            role: Joi.string().valid('user', 'admin').default('user') 
          })
        }
      }
    },

    // HÄMTAR ALLA USERS
    {
      method: 'GET',
      path: '/users',
      handler: userController.getAllUsers
    },

    // HÄMTAR USER MED SPECIFIKT ID
    {
      method: 'GET',
      path: '/users/{id}',
      handler: userController.getUserById,
      options: {
        validate: {
          params: Joi.object({
            id: Joi.string().length(24).required()
          })
        }
      }
    },

    // TAR BORT USER MED SPECIFIKT ID (ENDAST ADMIN)
    {
      method: 'DELETE',
      path: '/users/{id}',
      handler: userController.deleteUser,
      options: {
        pre: [{ method: isAdmin }],
        validate: {
          params: Joi.object({
            id: Joi.string().length(24).required()
          })
        }
      }
    }

  ]);
};