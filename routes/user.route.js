const Joi = require('joi');
const userController = require('../controllers/user.controller');

module.exports = (server) => {
  server.route([

    // Login
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

    // Skapa user (bara admin som kan göra det)
    {
      method: 'POST',
      path: '/users',
      handler: userController.createUser,
      options: {
        auth: false, // TA BORT SEN - Detta är bara så att jag kan lägga in users under testning
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

    // Hämtar alla users
    {
      method: 'GET',
      path: '/users',
      handler: userController.getAllUsers
    },

    // Hämtar user med specifikt id
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

    // Tar bort user med specifikt id
    {
      method: 'DELETE',
      path: '/users/{id}',
      handler: userController.deleteUser,
      options: {
        validate: {
          params: Joi.object({
            id: Joi.string().length(24).required()
          })
        }
      }
    }

  ]);
};