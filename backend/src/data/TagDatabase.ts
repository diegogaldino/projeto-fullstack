import { Tag } from "../model/Tag";
import { BaseDatabase } from "./BaseDatabase";


export class TagDatabase extends BaseDatabase {

  public async createTag(tag: Tag): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: tag.getId(),
          name: tag.getName(),
        })
        .into(this.tables.tags)
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  public async getAllTags(): Promise<Tag> {
      const result = await this.getConnection()
      .select("*")
      .from(this.tables.tags)

    return Tag.toTagModel(result[0])
  }

}
