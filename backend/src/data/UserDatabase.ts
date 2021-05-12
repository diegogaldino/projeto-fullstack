import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {

  public async createUser(user: User): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          password: user.getPassword(),
          nickname: user.getNickname()
        })
        .into(this.tables.users)
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(this.tables.users)
      .where("email", email);

    return User.toUserModel(result[0]);
  }

  public async getUserByid(id: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(this.tables.users)
      .where("id", id);

    return User.toUserModel(result[0])
  }

  public async getUserByName(name: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(this.tables.users)
      .where("name", name)

    return User.toUserModel(result[0]);
  }
  public async getUserCollection(id: string): Promise<any> {
    const result = await this.getConnection()
    .raw(`
    SELECT Project_collections.name FROM Project_images
    JOIN Project_collections ON Project_collections.id = Project_images.collection
    WHERE Project_images.author = "${id}"
    group by Project_collections.name;
    `)
    
    return result[0]
  }
}
