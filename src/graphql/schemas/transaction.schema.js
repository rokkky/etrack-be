export default `#graphql
    extend type Query {
        getTransactions(input: GetTransactionsInput): TransactionsList!
    }

    extend type Mutation {
        createTransaction(input: CreateTransactionInput): Transaction!
    }

    type TransactionsList {
        transactions: [Transaction!]
        transactionsLength: Float!
    }

    type Transaction {
        id: ID!
        date: Date!
        amount: Float!
        description: String!
        type: String!
        category: Category!
    }

    input GetTransactionsInput {
        user: ID!
        type: String!
        filter: TransactionFilter!
    } 

    input CreateTransactionInput {
        date: Date!
        amount: Float!
        description: String!
        user: ID!
        type: String!
        category: ID!
    }

    input TransactionFilter {
        pageSize: Float!
        pageIndex: Float!
        period: String!
        searchReq: String
        sortOptions: TransactionSort!
    }

    input TransactionSort {
        active: String
        direction: String
    }
`;
