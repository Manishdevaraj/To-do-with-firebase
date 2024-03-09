import { Box, Button, Container, HStack, Heading, Textarea, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import reactTextareaAutosize from "react-textarea-autosize"
import Addpost from '../Service/Dbmethods/Addpost';
import { UseUserContext } from "../Service/Dbmethods/UseUserContext"

function Createlist() 
{
  
    const {register,handleSubmit,reset}=useForm();
 
    const {isloading,addpost}=Addpost()
    
    const {user}= UseUserContext()
    
    const toast=useToast()
    const handelAddpost=(data)=>
    {

      if (user && user.uid) {
        // Access user ID and proceed with adding the post
        addpost({
          uid: user.uid,
          text: data.text,
        });
      } else {
        // Handle the case where user ID is not available (e.g., user not logged in)
        console.error("User ID is not available.");
        
        toast({
          title: 'Oops! there is an issue',
          description: "Please try after somtimes",
          status: 'error',
          duration: 1000,
          position:"top-right",
          isClosable: true,
        })
    
        // Optionally, you can show a message to the user or handle the situation accordingly.
      }
         
      
     reset()
    }
    
  return (
    <>
      

          <Container maxW={"container.lg"}>

                        <form onSubmit={handleSubmit(handelAddpost)}>


                                    
           <HStack>
             
             <Heading color={"teal"}>To Do List</Heading>
             <Button ml={"auto"} colorScheme='teal' type='submit'
            loadingText={"...."}
            isLoading={isloading}
             >Set</Button> 
           </HStack>

{/* ------------------------text area ------------------------------------ */}





            <Box>

                <Textarea
                  placeholder="Create a List...."
                  mt={{base:"5px",md:"10px"}}
                  resize={"none"}
                  as={reactTextareaAutosize}
                  {...register("text",{required:true})}
                />

            </Box>


            {/* ------------------------------List------------- */}






                        </form>



          </Container>
    </>
  );
}

export default Createlist;
