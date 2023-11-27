import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../../services/auth.service.js';
import Category from '../../models/category.model.js';

export default {
  Query: {
    getUserCategories: combineResolvers(isAuthenticated, async (_, { userId }) => {
      try {
        const categories = await Category.find({ user: userId });
        return categories;
      } catch (e) {
        return e;
      }
    }),
  },
  Mutation: {
    createCategory: combineResolvers(isAuthenticated, async (_, { input }) => {
      try {
        const category = await Category.create(input);
        return category;
      } catch (e) {
        return e;
      }
    }),
  }
};
