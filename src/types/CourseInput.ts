import { InputType, Field, Int } from "type-graphql";

@InputType()
export class CourseInput {
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => Int)
  duration!: number;

  @Field()
  outcome!: string;

  @Field(() => Int, { nullable: true })
  collectionId?: number;
}
