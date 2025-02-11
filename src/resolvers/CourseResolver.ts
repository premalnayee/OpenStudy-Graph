import { Course } from "../entities/Course";
import { Collection } from "../entities/Collection";
import { Resolver, Query, Mutation, Arg, ID, Int, Ctx } from "type-graphql";
import { CourseInput } from "../types/CourseInput";
import { AppDataSource } from "../data-source";

@Resolver()
export class CourseResolver {
  private courseRepo = AppDataSource.getRepository(Course);
  private collectionRepo = AppDataSource.getRepository(Collection);

  @Query(() => [Course])
  async courses(
    @Arg("limit", () => Int, { nullable: true }) limit: number,
    @Arg("sortOrder", { nullable: true }) sortOrder: "ASC" | "DESC" = "ASC"
  ): Promise<Course[]> {
    return this.courseRepo.find({
      take: limit,
      order: { title: sortOrder },
    });
  }

    @Query(() => Course, { nullable: true })
  async course(@Arg("id", () => ID) id: string): Promise<Course | undefined> {
    const courseId = parseInt(id, 10); // Convert the string id to a number
    const course = await this.courseRepo.findOne({ where: { id: courseId } });
    return course || undefined;
  }

  @Query(() => [Collection])
  async collections(): Promise<Collection[]> {
    return this.collectionRepo.find({ relations: ["courses"] });
  }

  @Query(() => Collection, { nullable: true })
  async collection(@Arg("id", () => ID) id: string): Promise<Collection | undefined> {
    const collectionId = parseInt(id, 10);
    const collection = await this.collectionRepo.findOne({ where: { id: collectionId }, relations: ["courses"] });
    return collection || undefined;
  }

  // Protected mutation; context will contain the authenticated user
  @Mutation(() => Course)
  async addCourse(
    @Arg("input") input: CourseInput,
    @Ctx() ctx: any
  ): Promise<Course> {
    // Ensure the user is authenticated (middleware or explicit check)
    if (!ctx.user) {
      throw new Error("Not authenticated");
    }
    const course = this.courseRepo.create(input);
    if (input.collectionId) {
      const collection = await this.collectionRepo.findOneBy({ id: input.collectionId });
      if (!collection) {
        throw new Error("Invalid collection");
      }
      course.collection = collection;
    }
    return this.courseRepo.save(course);
  }

  @Mutation(() => Course)
  async updateCourse(
    @Arg("id", () => ID) id: string,
    @Arg("input") input: CourseInput,
    @Ctx() ctx: any
  ): Promise<Course> {
    if (!ctx.user) {
      throw new Error("Not authenticated");
    }
    // Optionally check if ctx.user is allowed to update this course
    const courseId = parseInt(id, 10);
    let course = await this.courseRepo.findOneBy({ id: courseId });
    if (!course) {
      throw new Error("Course not found");
    }
    Object.assign(course, input);
    if (input.collectionId) {
      const collection = await this.collectionRepo.findOneBy({ id: input.collectionId });
      if (!collection) {
        throw new Error("Invalid collection");
      }
      course.collection = collection;
    }
    return this.courseRepo.save(course);
  }

  @Mutation(() => Boolean)
  async deleteCourse(
    @Arg("id", () => ID) id: string,
    @Ctx() ctx: any
  ): Promise<boolean> {
    if (!ctx.user) {
      throw new Error("Not authenticated");
    }
    // Optionally implement role-based logic here (admins vs. regular users)
    const result = await this.courseRepo.delete(id);
    return result.affected !== 0;
  }
}
