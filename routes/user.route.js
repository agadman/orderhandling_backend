const Joi = require('joi');
const userController = require('../controllers/user.controller');
const { isAdmin } = require('../middlewares/role');

module.exports = (server) => {
  server.route([

   // LOGIN: ska vara publik
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

    // SKAPA USER: ska vara publik (just nu)
    {
      method: 'POST',
      path: '/users',
      handler: userController.createUser,
      options: {
        auth: false,
        validate: {
          payload: Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            role: Joi.string().valid('user', 'admin').default('user') // eller ta bort helt
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