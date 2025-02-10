import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  // Do not expose the password field in GraphQL output.
  @Column()
  password!: string;

  @Field()
  @Column({ default: "USER" })
  role!: string;
}
