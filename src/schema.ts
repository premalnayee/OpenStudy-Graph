import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { CourseResolver } from "./resolvers/CourseResolver";
import { AuthResolver } from "./resolvers/AuthResolver";
import { CollectionResolver } from "./resolvers/CollectionResolver";

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [CourseResolver, AuthResolver, CollectionResolver],
    // Optionally, emit the SDL file to a location:
    emitSchemaFile: { path: "schema.gql", sortedSchema: false },
    validate: false,
  });
};
