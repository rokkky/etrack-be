export default `#graphql
    extend type Query {
        getUserCategories(userId: ID): [Category!]
    }

    type Category {
        id: ID!
        name: String!
        user: User!
        type: String!
    }
`;