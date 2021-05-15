import React from "react"
import { Button } from "@chakra-ui/button"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { useDisclosure } from "@chakra-ui/hooks"
import { Input } from "@chakra-ui/input"
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal"
import useForm from "../hooks/useForm"
import axios from "axios"
import { baseURL, config } from "../parameters"
import { useToast } from "@chakra-ui/toast"

export function ModalCollection(props) {
  const [form, onChange, clear] = useForm({ name: "" })
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()
  const finalRef = React.useRef()

  const postCollection = async (event, form, clear) => {
    event.preventDefault()
    console.log(form)
    try {
        await axios.post(`${baseURL}/collection/create`, form, config)
        toast({
            title: "collection published.",
            description: "Your collection was published",
            status: "success",
            duration: 5000,
            isClosable: true,
        })
        clear()

    } catch (error) {
        toast({
            title: "An error occurred.",
            description: "Unable to publish your collection .",
            status: "error",
            duration: 9000,
            isClosable: true,
        })
    }
}

  return (
    <>
      <Button mt={3}ml={2} size="sm" bg="teal.500" onClick={onOpen}>+</Button>
      {/* <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button> */}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Collection</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Collection</FormLabel>
              <Input ref={initialRef} value={form.name} name={"name"} onChange={onChange} type="text" variant="outline" placeholder="Collection name" isRequired />

            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit" onClick={(event)=>{
              postCollection(event,form,clear)
              // const aux = props.collections
              // aux.push({"name":form.name})
              // props.setCollections(aux)
              onClose()

              }}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}