const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "You must enter a product name."], 
    unique: true 
  },
  price: { 
    type: Number, 
    required: [true, "You must enter a price for the product."], 
    min: [0, "Price must be at least 0."] 
  },
  category: { 
    type: String, 
    required: [true, "You must enter a category for the product."]
  },
  inStock: { 
    type: Number, 
    required: [true, "You must enter the number of items in stock."], 
    min: [0, "The number of items in stock cannot be negative."] 
  },
  description: { 
    type: String 
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;