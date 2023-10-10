import { GraphQLError } from 'graphql';

export function generateError(message, code, status) {
  const err = new GraphQLError(message, {
    extensions: {
      code: code,
      http: {
        status: status,
      },
    },
  });
  throw err;
}
