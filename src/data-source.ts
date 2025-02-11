import "reflect-metadata";
import { DataSource } from "typeorm";
import { Course } from "./entities/Course";
import { Collection } from "./entities/Collection";
import { User } from "./entities/User";
import dotenv from "dotenv";

dotenv.config();

// connect to render database
export const AppDataSource = new DataSource({
  url: process.env.DATABASE_URL,
  // port:3306,
  type: "postgres",
  synchronize: false, // Use migrations instead of auto-syncing in production
  logging: false,
  entities: [Course, Collection, User],
  migrations: ["src/migrations/*.ts"],
  ssl: {
    rejectUnauthorized: false,
  }
});
