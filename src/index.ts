import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createSchema } from "./schema";
import dotenv from "dotenv";
import { authMiddleware } from "./middleware/auth";
import { AppDataSource } from "./data-source";

// Load environment variables early
dotenv.config();

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

(async () => {
  // Establish database connection using TypeORM.
  await AppDataSource.initialize().catch((error) => console.error("DataSource initialization error:", error));
  
  // Build the GraphQL schema using our resolvers.
  const schema = await createSchema();

  // Create and start the Apollo Server with environment-based context.
  const server = new ApolloServer({ 
    schema,
    context: ({ req }) => ({ user: req.user })
  });
  await server.start();

  const app = express();
  app.use(authMiddleware);
  server.applyMiddleware({ app });

  // Use environment variable for PORT (default to 4000 if undefined)
  const port = process.env.PORT || 4000;
  app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}${server.graphqlPath}`)
  );
})();