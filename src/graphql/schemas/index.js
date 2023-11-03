import userSchema from '../schemas/user.schema.js';
import categorySchema from './category.schema.js';
import transactionSchema from './transaction.schema.js';

const requestSchema = `#graphql
    scalar Date

    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }
`;

export default [
    requestSchema, 
    userSchema, 
    categorySchema, 
    transactionSchema
];
