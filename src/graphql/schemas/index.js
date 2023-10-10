import userSchema from '../schemas/user.schema.js';

const requestSchema = `#graphql
    scalar Date

    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }
`

export default [requestSchema, userSchema];
