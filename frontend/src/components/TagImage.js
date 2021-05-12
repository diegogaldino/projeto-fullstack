import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/tag"


export const TagImage = (props) => {
    const showTags = () => {
        return (
            props.tags.map((tag) => {
                if (props.id === tag.image_id) {
                    return (
                        <Tag
                            size="md"
                            key={props.tag_id}
                            borderRadius="full"
                            variant="solid"
                            colorScheme="green"
                        >
                            <TagLabel>{tag.name}</TagLabel>
                            <TagCloseButton />
                        </Tag>
                    )
                }
            })
        )

    }
    return (
        <>
            {showTags()}
        </>
    )

}