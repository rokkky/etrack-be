import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import schemas from './graphql/schemas/index.js';
import resolvers from './graphql/resolvers/index.js';
import { connectDB } from './database.js';
import { verifyToken } from './services/auth.service.js';

dotenv.config();

const { PORT, DB_URL } = process.env;

connectDB(DB_URL).then(async () => {
  const app = express();
  const httpServer = http.createServer(app);

  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(
    '/graphql',
    cors(),
    bodyParser.json({ limit: '50mb' }),
    expressMiddleware(server, {
      context: async ({ req }) => {
        try {
          const token = req.headers.authorization.split(' ')[1] || '';
          const user = await verifyToken(token);
          return { user };
        } catch (e) {
          return {}        
        }
      },
    })
  );
  const port = PORT || '4000';
  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}`);
});
