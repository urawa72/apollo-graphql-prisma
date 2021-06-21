import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const typeDefs = gql`
  type Todo {
    id: Int!
    title: String
  }
  type Query {
    hello: String
    todo(id: Int): Todo
    todos(title: String): [Todo]
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    todo: async (_: any, { id }: { id: number }) => {
      return await prisma.todo.findUnique({ where: { id: id } });
    },
    todos: (_: any, { title }: { title: string }) => {
      return prisma.todo.findMany({ where: { title: { contains: title } } });
    },
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
