import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createSchema } from "./schema";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import { authMiddleware } from "./middleware/auth";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

dotenv.config();

(async () => {
  // Establish database connection using TypeORM.
  await createConnection();

  // Build the GraphQL schema using our resolvers.
  const schema = await createSchema();

  // Create and start the Apollo Server.
  const server = new ApolloServer({ schema,
    context: ({ req }) => ({ user: req.user })
   });
  await server.start();

  const app = express();
  app.use(authMiddleware);
  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;
  app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}${server.graphqlPath}`)
  );
})();
