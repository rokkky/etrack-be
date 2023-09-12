import userSchema from '../schemas/user.schema.js';

const requestSchema = `#graphql
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }
`

export default [requestSchema, userSchema];
