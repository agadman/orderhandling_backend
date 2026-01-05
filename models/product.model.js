const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Du måste ange ett namn på produkten."], unique: true },
  price: { type: Number, required: [true, "Du måste ange ett pris på produkten."], min: [0, "Priset måste vara minst 0."] },
  category: { type: String, required: [true, "Du måste ange en kategori för produkten."] },
  inStock: { type: Number, required: [true, "Du måste ange antal i lager."], min: [0, "Antal i lager kan inte vara negativt."] },
  description: { type: String }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;