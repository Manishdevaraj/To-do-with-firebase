import { Box, HStack, Text, useToast } from "@chakra-ui/react"
import PropType from "prop-types";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteDocument } from "../Service/Dbmethods/Deletdoc";

function Posts({post}) {
  const {text,date,id}=post;

  const formattedText = text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
      {/* <br/> */}
    </React.Fragment>
  ));
  
  const toast=useToast();

  const deletdoc=()=>
  {
     deleteDocument(id);
     toast({
      title: 'Success!',
      description: "List is deleted",
      status: 'success',
      position:"top-right",
      duration: 9000,
      isClosable: true,
    })
  }
  return (
    <>
    
    <Box border={"2px solid teal"} mt={"10px"}
      padding={"10px"}
      borderRadius={"20px"}
      color={" #9F7AEA"}
    >
          
          
              <Text> {formatDistanceToNow(date)} ago</Text>
              <HStack justifyContent={"end"}>
              <Box><FaRegTrashAlt color="teal" onClick={deletdoc} /></Box>
              </HStack>

         

          <Box>
            <h1>{formattedText}</h1>
          </Box>
          


            </Box>
    
    
    </>
  )
}

Posts.propTypes=
{
  post:PropType.any.isRequired
}

export default Posts