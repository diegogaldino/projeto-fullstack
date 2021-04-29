
export class Tag {
    constructor(
        private id: string,
        private name: string,
    ) { }

    getId() { return this.id }
    getName() { return this.name }

    setId(id: string) { this.id = id }
    setName(name: string) { this.name = name }
    
    static toTagModel(tag: any): Tag {
        return new Tag(tag.id, tag.name);
    }
}

export interface TagInputDTO {
    name: string;
}

