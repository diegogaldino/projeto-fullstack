import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {

//   private static USER_TABLE = "Project_users";

  public async createUser(user: User): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          password: user.getPassword(),
          nickname:user.getNickname()
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
      .where("email",email);

    return User.toUserModel(result[0]);
  }

}
