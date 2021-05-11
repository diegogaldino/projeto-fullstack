import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { AiOutlineComment, AiOutlineDislike, AiOutlineLike } from "react-icons/ai"

export const PostCard = (props) => {


    return (
        <Box
            mb={5}
            w="90%"
            p={6}
            borderWidth={1}
            borderRadius={9}
            maxWidth="700px"
            boxShadow="5px 5px 5px rgba(0,0,0,0.05)"
            key={props.isPostlist ? props.keyPostList : props.clickDetail ? props.keyClickDetail : props.keyPostComment}
        >
            <Flex color="grey" >
                <Text fontSize="x-small">{new Date(props.post.date).toLocaleDateString()}</Text>
                <Text ml={1} fontSize="x-small">{new Date(props.post.date).getHours()}:{new Date(props.post.date).getMinutes()}</Text>
            </Flex>
            <Heading onClick={() => { return props.clickDetail ? false : props.goToDetailPost(props.post.id) }} mb={4} cursor="pointer">{props.post.title}</Heading>
            <Text >{props.post.subtitle}</Text>
            <Text onClick={() => { return props.clickDetail ? false : props.goToDetailPost(props.post.id) }} fontSize="xl" cursor="pointer">{props.post.text}</Text>
            {/* <Flex mt={3} justify="space-between">
                <Flex alignItems="center">
                    <Box p={1}
                        onClick={() => {
                            props.post.userVoteDirection===0?props.putVote(props.post.id, -1):props.putVote(props.post.id, 0)
                        }}
                        _hover={{
                            bg: "teal.100",
                        }}
                        borderRadius="5px"
                        cursor="pointer"
                    >
                        <AiOutlineDislike
                            size="20px"
                            color={props.post.userVoteDirection === -1 ? "red" : null}
                        />
                    </Box>
                    <Text>{props.post.votesCount}</Text>
                    <Box
                        p={1}
                        onClick={() => {
                            props.post.userVoteDirection===0?props.putVote(props.post.id, 1):props.putVote(props.post.id, 0)
                        }}
                        _hover={{
                            bg: "teal.100",
                        }}
                        borderRadius="5px"
                        cursor="pointer"
                    >
                        <AiOutlineLike
                            size="20px"
                            color={props.post.userVoteDirection === 1 ? "blue" : null}
                        />
                    </Box>
                </Flex>
                <Flex alignItems="center" onClick={() => { return props.clickDetail ? false : props.goToDetailPost(props.post.id) }} cursor="pointer">
                    <AiOutlineComment size="20px" />
                    <Text px={1}>{props.post.commentsCount} comments</Text>
                </Flex>
            </Flex> */}
        </Box>
    )
}