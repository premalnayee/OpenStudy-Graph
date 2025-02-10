import { Resolver, Query, Arg, Int } from "type-graphql";
import { Collection } from "../entities/Collection";
import { getRepository } from "typeorm";

@Resolver()
export class CollectionResolver {
  private collectionRepository = getRepository(Collection);

  @Query(() => [Collection])
  async collections(): Promise<Collection[]> {
    return this.collectionRepository.find({ relations: ["courses"] });
  }

  @Query(() => Collection, { nullable: true })
  async collection(@Arg("id", () => Int) id: number): Promise<Collection | undefined> {
    const result = await this.collectionRepository.findOne({ where: { id }, relations: ["courses"] });
    return result || undefined; // if result is null, returns undefined
  }
}