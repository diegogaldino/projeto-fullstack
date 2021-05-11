import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/tag"
import axios from "axios"
import { useEffect, useLayoutEffect, useState } from "react"
import { baseURL, config } from "../parameters"

export const TagImage =(props)=>{
    const [tags,setTags]=useState([])

    useLayoutEffect(()=>{
        getTags()
    },[])

    const getTags = async () => {
        try {
            const response = await axios.get(`${baseURL}/image/tag/${props.id}`, config)
            setTags(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const showTags = ()=>{
        console.log(tags)
        return(
            tags&&tags.map((tag)=>{
                return(
                    <Tag
                    size="md"
                    key={props.key}
                    borderRadius="full"
                    variant="solid"
                    colorScheme="green"
                    >
                        <TagLabel>{tag.name}</TagLabel>
                        <TagCloseButton />
                    </Tag>
                )
            })
        )
    }

    return(
        <>
        {
        showTags()
        }
        </>
    )

}