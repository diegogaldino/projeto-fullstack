import {Box, Flex, Heading, Text} from '@chakra-ui/react'
import { Header } from '../components/Header'
import { Login } from './Login'

export const Home = () => {
    return (
        <>
            <Header />
            <Flex w="100vw" h="90vh" flexWrap="wrap" justify="center">
                <Flex
                    w="50%"
                    minWidth="400px"
                    align="center"
                    justify="center"
                    bgGradient="linear(to-l,#7BE4AC, #22B8F6)"
                >
                    <Box
                        m={5}
                        w="90%"
                        p={6}
                        borderLeftWidth={3}
                        maxWidth="600px"
                        boxShadow="5px 5px 5px rgba(0,0,0,0.3)"
                        color="white"
                    >
                        <Heading fontSize="6xl">A social network to explore the world!</Heading>
                        <Text mt={4} fontSize="2xl">You show what you are thinking, and see what is happening now, with great subjects, good people. All in one place!</Text>
                        <Text as="i" mt={4} fontSize="2xl" >Connect and find out. </Text>
                    </Box>
                </Flex>

                <Flex
                    w="50%"
                    justify="center"
                    minWidth="400px"
                    pt={5}
                >
                    <Login visibleLogin={"login"}/>
                </Flex>
            </Flex>
        </>
    )
}