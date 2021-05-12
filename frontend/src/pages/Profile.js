import { Image } from "@chakra-ui/image"
import { Flex, Text } from "@chakra-ui/layout"

import axios from "axios"
import { useEffect, useState } from "react"
import { Header } from "../components/Header"
import { PostCard } from "../components/PostCard"
import { TagImage } from "../components/TagImage"
import { useProtectedPage } from "../hooks/useProtectedPage"
import { baseURL, config } from "../parameters"

export const Profile = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState([])
    const [images, setImages] = useState([])
    const [collections, setCollections] = useState([])
    const [tags, setTags] = useState([])
    useProtectedPage()

    useEffect(() => {
        getProfile()
        getCollections()
        getTags()
        getImages()

    }, [])

    const getProfile = async () => {
        setIsLoading(true)
        const id = localStorage.getItem("user")
        try {
            const response = await axios.get(`${baseURL}/user/${id}`, config)
            setUser(response.data)

            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getImages = async () => {
        setIsLoading(true)
        const id = localStorage.getItem("user")
        try {
            const response = await axios.get(`${baseURL}/image/author/${id}`, config)
            setImages(response.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

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
            const id = localStorage.getItem("user")
            const response = await axios.get(`${baseURL}/image/tag/user/${id}`, config)
            setTags(response.data)
        } catch (error) {
            console.log(error)
        }
    }


    const showImages = () => {
        return (
            images && images.map((image) => {
                return (
                    <>
                        <Text fontSize="xl">{image.subtitle}</Text>
                        <Image src={image.file} />
                        {collections.map((c) => {
                            if (c.id === image.collection)
                                return <p>{c.name}</p>
                        })}
                        <TagImage id={image.id}  tags={tags}/>


                    </>
                )
            })

        )
    }

    return (
        <>
            <Header />
            <Flex w="100%" >
                <Flex bg="#22B8F6" w="25%"></Flex>
                <Flex
                    m="0 auto"
                    w="50%"
                    minWidth="400px"
                    align="center"
                    direction="column"

                >
                    <Text fontSize="xl">{user.name}</Text>
                    <Text fontSize="xl">{user.nickname}</Text>
                    {showImages()}


                </Flex>
                <Flex bg="#82E6B2" w="25%"></Flex>
            </Flex>
        </>
    )
}