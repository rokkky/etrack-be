import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../../services/auth.service.js';
import Transaction from '../../models/transaction.model.js';
import { filterTransactions } from '../../utils/transactions-filter.js';

export default {
  Query: {
    getTransactions: combineResolvers(isAuthenticated, async (_, { input: { user, type, filter } }) => {
      const { sortOptions, searchReq, pageSize, pageIndex, period } = filter;
      let transactions = await Transaction.find({
        user,
        type,
        description: { $regex: searchReq, $options: 'i' },
      })
        .populate('category')
        .sort(sortOptions.direction ? [[sortOptions.active, sortOptions.direction]] : null);

      return filterTransactions(transactions, pageSize, pageIndex, period);
    }),
  },
  Mutation: {
    createTransaction: combineResolvers(isAuthenticated, async (_, { input }) => {
      try {
        const transaction = await Transaction.create(input);
        await transaction.populate('category');
        return transaction;
      } catch (e) {
        return e;
      }
    }),
  },
};
