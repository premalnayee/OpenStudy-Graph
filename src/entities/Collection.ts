import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Course } from "./Course";

@ObjectType()
@Entity()
export class Collection {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field(() => [Course])
  @OneToMany(() => Course, course => course.collection)
  courses!: Course[];
}
