
export class Collection {
    constructor(
        private id: string,
        private name: string,
    ) { }

    getId() { return this.id }
    getName() { return this.name }

    setId(id: string) { this.id = id }
    setName(name: string) { this.name = name }
    
    static toCollectionModel(collection: any): Collection {
        return new Collection(collection.id, collection.name);
    }
}

export interface CollectionInputDTO {
    name: string;
}

