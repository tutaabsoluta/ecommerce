import mongoose from "mongoose";



const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
    trim: true,
    maxlength: [100, 'The name have to be lower than 1000 characters']
  },
  description: {
    type: String,
    required: [true, 'The description is required'],
    maxlength: [1000, 'The description have to be lower than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'The price is required'],
    min: [0, 'The price cant be negative']
  },
  imageUrl: {
    type: String,
    required: [true, 'The image URL is required']
  }
}, { timestamps: true });

export const ProductModel = mongoose.model('Product', productSchema);