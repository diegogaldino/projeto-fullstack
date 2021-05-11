import { Box, Button, Heading, Input, Spinner, Textarea } from "@chakra-ui/react"
import useForm from "../hooks/useForm"

const PostForm = (props) =>{
    const [form, onChange, clear] = useForm({ text: "", title: "" })

    return(
        <Box
        m={5}
        w="90%"
        p={6}
        borderWidth={1}
        borderRadius={9}
        maxWidth="700px"
        boxShadow="5px 5px 5px rgba(0,0,0,0.05)"

    >
        <form onSubmit={(event)=>props.postPost(event,form,clear)}>
            <Heading>What are you thinking now?</Heading>
            <Input mt={2} value={form.title} name={"title"} onChange={onChange} type="text" variant="outline" placeholder="Enter your Title" isRequired />
            <Textarea mt={2} value={form.text} name={"text"} onChange={onChange} placeholder="Write here what you are thinking about." isRequired />
            <Button leftIcon={props.isLoadingPublish?<Spinner size="sm"/>:null} mt={2} size="lg" bg="teal.500" type="submit">Publish</Button>
        </form>

    </Box>
    )
}
export default PostForm