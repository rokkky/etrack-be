export default `#graphql
    extend type Query {
        getUser(id: ID): User!
    }
    extend type Mutation {
        logIn(input: LogInInput): Token!
        signUp(input: SignUpInput): Boolean!
        refreshToken(token: String): Token!
        changeUsername(id: ID!, username: String!): User!
    }

    type Token {
        accessToken: String!
        refreshToken: String!
    }

    type User {
        id: ID!
        username: String
        email: String!
        password: String!
        registrationDate: Date!
    }

    input SignUpInput {
        username: String
        email: String!
        password: String!
    }

    input LogInInput {
        email: String!
        password: String!
    }
`;