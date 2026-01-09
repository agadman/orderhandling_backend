const Product = require('../models/product.model');

exports.getAllProducts = async (request, h) => {
  try {
    return await Product.find()
      .populate('createdBy', 'username email role')
      .populate('updatedBy', 'username email role');
  } catch (error) {
    return h.response('Failed to fetch products: ' + error).code(500);
  }
};

exports.getProductById = async (request, h) => {
  try {
    const product = await Product.findById(request.params.id)
      .populate('createdBy', 'username email role')
      .populate('updatedBy', 'username email role');

    if (!product) return h.response({ message: 'Product not found' }).code(404);
    return product;
  } catch (error) {
    return h.response('Failed to fetch product: ' + error).code(500);
  }
};

exports.createProduct = async (request, h) => {
  try {
    const userId = request.auth?.credentials?.id

    const product = new Product({
      ...request.payload,
      createdBy: userId || null
    })

    const saved = await product.save()

    const populated = await Product.findById(saved._id)
      .populate('createdBy', 'username email role')
    return h.response(populated).code(201)
  } catch (error) {
    if (error.code === 11000) {
      return h.response({ message: 'Product already exists' }).code(400)
    }
    return h.response('Failed to create product: ' + error).code(500)
  }
}

exports.updateProduct = async (request, h) => {
  try {
    const userId = request.auth?.credentials?.id

    const product = await Product.findByIdAndUpdate(
      request.params.id,
      { ...request.payload, updatedBy: userId || null },
      { new: true, runValidators: true }
    )
      .populate('createdBy', 'username email role')
      .populate('updatedBy', 'username email role')
    if (!product) return h.response({ message: 'Product not found' }).code(404);
    return product;
  } catch (error) {
    return h.response('Failed to update product: ' + error).code(500);
  }
};

exports.deleteProduct = async (request, h) => {
  try {
    const product = await Product.findByIdAndDelete(request.params.id);
    if (!product) return h.response({ message: 'Product not found' }).code(404);
    return { message: 'Product deleted successfully' };
  } catch (error) {
    return h.response('Failed to delete product: ' + error).code(500);
  }
};