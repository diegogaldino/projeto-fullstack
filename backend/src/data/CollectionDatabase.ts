
import { Collection } from "../model/Collection";
import { BaseDatabase } from "./BaseDatabase";

export class CollectionDatabase extends BaseDatabase {

  public async createCollection(collection: Collection): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: collection.getId(),
          name: collection.getName(),
        })
        .into(this.tables.collections)
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  public async getAllCollections(): Promise<Collection> {
      const result = await this.getConnection()
      .select("*")
      .from(this.tables.collections)

    return Collection.toCollectionModel(result[0])
  }

}
