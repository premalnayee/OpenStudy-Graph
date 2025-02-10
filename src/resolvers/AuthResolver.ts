import { Resolver, Mutation, Arg, ObjectType, Field } from "type-graphql";
import { User } from "../entities/User";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

@ObjectType()
class AuthResponse {
  @Field()
  token!: string;

  @Field(() => User)
  user!: User;
}

@Resolver()
export class AuthResolver {
  private userRepository = getRepository(User);

  @Mutation(() => User)
  async register(
    @Arg("username") username: string,
    @Arg("password") password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      role: "USER"
    });
    return this.userRepository.save(user);
  }

  @Mutation(() => AuthResponse)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string
  ): Promise<AuthResponse> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new Error("User not found");
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Incorrect password");
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    return { token, user };
  }
}
