import { Box, Button, Checkbox, Flex, Heading, Input, Select, Spinner, Textarea, useToast } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useLayoutEffect, useState } from "react"
import useForm from "../hooks/useForm"
import { baseURL, config } from "../parameters"
import { ModalCollection } from "./ModalCollection"
import SelectReact from 'react-select'
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const PostForm = (props) => {
    const [form, onChange, clear] = useForm({ subtitle: "", file: "" })
    const [collections, setCollections] = useState([])
    const [tags, setTags] = useState([])
    const [selectTags, setSelectTags] = useState([])
    const [collection, setCollection] = useState("")
    const [form1, onChange1, clear1] = useForm({ name: "" })
    const toast = useToast()

    useEffect(() => {
        getCollections()
        getTags()
    }, [tags])

    const getCollections = async () => {
        try {
            const response = await axios.get(`${baseURL}/collection/all`, config)
            setCollections(response.data.collections)
        } catch (error) {
            console.log(error)
        }
    }

    const getTags = async () => {
        try {
            const response = await axios.get(`${baseURL}/tag/all`, config)
            setTags(response.data.tags)
        } catch (error) {
            console.log(error)
        }
    }
    // const getTags = async () => {
    //     try {
    //         const id = localStorage.getItem("user")
    //         const response = await axios.get(`${baseURL}/image/tag/user/${id}`, config)

    //         let tags = response.data.map((tag)=>{
    //             return({
    //                 value:tag.tag_id,
    //                 label:tag.name
    //             })
    //         })

    //         setTags(tags)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useLayoutEffect(() => {
        getSelect()
        getTags()
    }, [collections])

    const postTag = async (event, form, clear) => {
        event.preventDefault()
        if (form.name === "") {
            try {
                await axios.post(`${baseURL}/tag/create`, form, config)
                toast({
                    title: "tag published.",
                    description: "Your tag was published",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
                clear()

            } catch (error) {
                toast({
                    title: "An error occurred.",
                    description: "Unable to publish your tag .",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }
        } else {
            toast({
                title: "An error occurred.",
                description: "Unable to publish your tag .",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    }

    const getSelect = () => {
        return (
            <>
                <Select mt={2} placeholder="Collections" onChange={changeCollectionName}>
                    {collections && collections.map(collection => {
                        return (
                            <option key={collection.name} value={collection.id} >
                                {collection.name}
                            </option>
                        )
                    })}
                </Select>

            </>
        )
    }

    const changeCollectionName = event => {
        const id = event.target.value
        setCollection(id)
    }
    const changeSelectTags = (value) => {
        console.log(value)
        const findTag = selectTags && selectTags.findIndex(tag => tag === value)
        console.log(findTag)
        if (findTag === -1) {
            const aux = selectTags
            aux.push(value)
            setSelectTags(aux)
        } else {
            const newArray = selectTags && selectTags.filter(tag => tag !== value)
            setSelectTags(newArray)
        }
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
            <form onSubmit={(event) => props.postPost(event, form, clear, collection,selectTags)}>
                <Heading>Publish an image</Heading>
                <Input mt={2} value={form.subtitle} name={"subtitle"} onChange={onChange} type="text" variant="outline" placeholder="Enter your subtitle" isRequired />
                <Input mt={2} value={form.file} name={"file"} onChange={onChange} type="text" variant="outline" placeholder="Enter your image URL " isRequired />
                <Flex>
                    {getSelect()}
                    <ModalCollection collections={collections} setCollections={setCollections} getCollections={getCollections} />
                </Flex>
                {/* <Box mt={2}>
                    <SelectReact options={tags}  components={animatedComponents} isMulti />
                </Box> */}
                <Flex>
                    <Input mt={2} value={form.name} name={"name"} onChange={onChange1} type="text" variant="outline" placeholder="Tag name" />
                    <Button mt={3} ml={2} size="sm" bg="teal.500" onClick={(event) => postTag(event, form1, clear)}>+</Button>
                </Flex>
                <Flex>
                    {tags.map(tag => {
                        return (<Checkbox mt={2} ml={2} value={tag.id} onChange={() => changeSelectTags(tag.id)}>{tag.name}</Checkbox>)
                    })}
                </Flex>
                <Button leftIcon={props.isLoadingPublish ? <Spinner size="sm" /> : null} mt={2} size="lg" bg="teal.500" type="submit">Publish</Button>
            </form>

        </Box>
    )
}
export default PostForm