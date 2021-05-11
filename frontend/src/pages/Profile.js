import { Image } from "@chakra-ui/image"
import { Flex, HStack, Text } from "@chakra-ui/layout"
import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/tag"
import axios from "axios"
import { useEffect, useLayoutEffect, useState } from "react"
import { Header } from "../components/Header"
import { PostCard } from "../components/PostCard"
import { TagImage } from "../components/TagImage"
import { useProtectedPage } from "../hooks/useProtectedPage"
import { baseURL, config } from "../parameters"

export const Profile = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState([])
    const [images, setImages] = useState([])
    useProtectedPage()

    useLayoutEffect(() => {
        getProfile()
        getImages()
    }, [])

    const getProfile = async () => {
        setIsLoading(true)
        const id = localStorage.getItem("user")
        console.log(id)
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
        console.log(id)
        try {
            const response = await axios.get(`${baseURL}/image/author/${id}`, config)
            console.log("images", response.data)
            setImages(response.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const showImages = () => {
        
        return (
            images && images.map((image) => {
                return (
                    <>
                        <Text fontSize="xl">{image.id}</Text>
                        <Text fontSize="xl">{image.subtitle}</Text>
                        <Text fontSize="xl">{image.collection}</Text>
                        <Image src={image.file} />

                        <TagImage id={image.id} key="md"/>

                        
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