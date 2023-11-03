import { Schema, model } from 'mongoose';

const CategoryModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Category = model('Category', CategoryModel);
export default Category;
