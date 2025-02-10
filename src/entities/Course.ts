import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { Collection } from "./Collection";

@ObjectType()
@Entity()
export class Course {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column("int")
  duration!: number; // duration in minutes (or adjust as needed)

  @Field()
  @Column()
  outcome!: string;

  @Field(() => Collection, { nullable: true })
  @ManyToOne(() => Collection, collection => collection.courses, { nullable: true })
  collection!: Collection;
}
