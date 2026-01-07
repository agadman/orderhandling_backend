const Joi = require('joi'); // Importerar Joi för validering
const productController = require('../controllers/product.controller');

// Definierar rutter för produkter
module.exports = (server) => {
  server.route([
    {
      method: 'GET',
      path: '/products',
      handler: productController.getAllProducts,
      options: { auth: false } // GÖR DEN PUBLIK TILLFÄLLIGT FÖR TESTNING
    },
    {
      method: 'GET',
      path: '/products/{id}',
      handler: productController.getProductById,
      options: {
        auth: false, // GÖR DEN PUBLIK TILLFÄLLIGT FÖR TESTNING
        validate: {
          params: Joi.object({
            id: Joi.string().length(24).required()
          })
        }
      }
    },
    {
      method: 'POST',
      path: '/products',
      handler: productController.createProduct,
      options: {
        validate: {
          payload: Joi.object({
            name: Joi.string().required(),
            price: Joi.number().min(0).required(),
            category: Joi.string().required(),
            inStock: Joi.number().min(0).required(),
            description: Joi.string().allow('', null)
          })
        }
      }
    },
    {
      method: 'PUT',
      path: '/products/{id}',
      handler: productController.updateProduct,
      options: {
        validate: {
          params: Joi.object({
            id: Joi.string().length(24).required()
          }),
          payload: Joi.object({
            name: Joi.string().required(),
            price: Joi.number().min(0).required(),
            category: Joi.string().required(),
            inStock: Joi.number().min(0).required(),
            description: Joi.string().allow('', null)
          })
        }
      }
    },
    {
      method: 'DELETE',
      path: '/products/{id}',
      handler: productController.deleteProduct,
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