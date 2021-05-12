import { Box, Button, Flex, Heading, Input, Select, Spinner, Textarea } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import useForm from "../hooks/useForm"
import { baseURL, config } from "../parameters"
import { ModalCollection } from "./ModalCollection"

const PostForm = (props) => {
    const [form, onChange, clear] = useForm({ text: "", title: "" })
    const [collections, setCollections] = useState([])
    const [collection, setCollection] = useState("")

    useEffect(() => {
        getCollections()
    })

    const getCollections = async () => {
        try {
            const response = await axios.get(`${baseURL}/user/collection`, config)
            setCollections(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const changeCollectionName = event => {
        const name = event.target.value
        setCollection(name)
    }

    return (
        <Box
            m={5}
            w="90%"
            p={6}
            borderWidth={1}
            borderRadius={9}
            maxWidth="700px"
            boxShadow="5px 5px 5px rgba(0,0,0,0.05)"

        >
            <form onSubmit={(event) => props.postPost(event, form, clear)}>
                <Heading>Publish an image</Heading>
                <Input mt={2} value={form.subtitle} name={"subtitle"} onChange={onChange} type="text" variant="outline" placeholder="Enter your subtitle" isRequired />
                <Input mt={2} value={form.file} name={"file"} onChange={onChange} type="text" variant="outline" placeholder="Enter your image URL " isRequired />
                <Flex>
                    <Select mt={2} placeholder="Collections" onChange={changeCollectionName}>
                        {collections && collections.map(collection => {
                            return (
                                <option key={collection.name} value={collection.name}>
                                    {collection.name}
                                </option>
                            );
                        })}
                    </Select>
                {ModalCollection()}
                </Flex>
                <Button leftIcon={props.isLoadingPublish ? <Spinner size="sm" /> : null} mt={2} size="lg" bg="teal.500" type="submit">Publish</Button>
            </form>

        </Box>
    )
}
export default PostForm