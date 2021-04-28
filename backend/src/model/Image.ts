export class Image {
    constructor(
        private id: string,
        private subtitle: string,
        private author: string,
        private file: string
    ) { }

    public getId(): string { return this.id }
    public getSubtitle(): string { return this.subtitle }
    public getAuthor(): string { return this.author }
    public getFile(): string { return this.file }

    public setSubtitle(subtitle: string) { this.subtitle = subtitle }
    public setAuthor(author: string) { this.author = author }
    public setFile(file: string) { this.file = file }

    public static toImage(data?: any): Image | undefined {
        return (data && new Image(
            data.id,
            data.subtitle,
            data.author,
            data.file
        ))
    }
}

export interface ImageInputDTO {
    subtitle: string,
    author: string,
    file: string
}