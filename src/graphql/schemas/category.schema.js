export default `#graphql
    extend type Query {
        getUserCategories(userId: ID): [Category!]
    }
    extend type Mutation {
        createCategory(input: CreateCategoryInput): Category!
    }

    input CreateCategoryInput {
        name: String!
        user: ID!
        type: String!
    }

    type Category {
        id: ID!
        name: String!
        user: ID!
        type: String!
    }
`;