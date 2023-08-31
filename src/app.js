import dotenv from "dotenv";
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import schemas from './graphql/schemas/index.js';
import resolvers from './graphql/resolvers/index.js';
import { connectDB } from './database.js';
import path from "path";

dotenv.config({path: path.__dirname + '/./../../.env'}); 

const { PORT, DB_URL } = process.env;

connectDB(DB_URL).then(async () => {
  const app = express();
  const httpServer = http.createServer(app);

  // app.use('/graphql', authenticatedToken); //Проверка JWT-токена

  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use('/graphql', bodyParser.json({ limit: '50mb' }), expressMiddleware(server));

  await new Promise((resolve) => httpServer.listen({ port: PORT || '4000' }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT || '4000'}`);
});
