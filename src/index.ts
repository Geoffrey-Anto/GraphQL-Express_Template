import "reflect-metadata";
import express from "express";
const cookieParser = require("cookie-parser");
require("dotenv").config();
import { DataSource } from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { HelloResolver } from "./resolvers/HelloResolver";

const main = async () => {
  const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: ["src/enitity/*.ts"],
  });

  await AppDataSource.initialize();

  const app = express();

  app.use(cookieParser());

  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const server = new ApolloServer({
    schema: schema,
    context: ({ req, res }) => ({ req, res }),
    persistedQueries: false,
    cache: "bounded",
  });

  await server.start();

  server.applyMiddleware({
    app,
    cors: {
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    },
  });

  app.listen(process.env.PORT || 4000, () => {
    console.log("Server started on http://localhost:4000 🚀 ");
  });
};

main();
