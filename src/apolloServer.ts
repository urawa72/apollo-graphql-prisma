import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

export const startApolloServer = (): void => {
  const server = new ApolloServer({ typeDefs, resolvers });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 3333 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:3333${server.graphqlPath}`,
    );
  });
};
