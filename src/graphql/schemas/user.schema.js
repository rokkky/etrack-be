export default `#graphql
    extend type Mutation {
        logIn(input: LogInInput): Token!
        signUp(input: SignUpInput): Boolean!
    }

    type Token {
        accessToken: String!
        refreshToken: String!
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