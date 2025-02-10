import "reflect-metadata";
import { DataSource } from "typeorm";
import { Course } from "./entities/Course";
import { Collection } from "./entities/Collection";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_DATABASE || "osc_coursehub",
  synchronize: false, // Use migrations instead of auto-syncing in production
  logging: false,
  entities: [Course, Collection, User],
  migrations: ["src/migrations/*.ts"]
});
