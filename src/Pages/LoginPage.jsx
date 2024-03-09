import { Box, Button, Center, Container, FormControl, FormErrorMessage, Input, Text} from "@chakra-ui/react"
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
import { emailValidate, passwordValidate } from "../Components/FormValidation"
import { Link, useNavigate } from "react-router-dom"
import { UseUserContext } from "../Service/Dbmethods/UseUserContext"




function LoginPage() {


  

    const {register,handleSubmit,formState: { errors, isSubmitting }}=useForm()
    
    const toast=useToast()
    
    
    // --------------------------firebase setup-----------------------------------
   
    const {Signin}=UseUserContext()
    const navigate=useNavigate()
    
    const onsubmit=async (data)=>
    {
      try
      {
        await Signin(data.email,data.password)
        navigate("/home")
         
        
      }
    catch(err)
    {
        console.log(err)
        toast({
            title: err.name,
            description: err.code,
            status: 'error',
            duration: 9000, 
            position:"top-right",
            isClosable: true,
        }) 
       
      }
      
      
    }




  return (
 <>
    <Container>

    <Box maxWidth={"300px"} maxH={"fit-content"} mt={"200px"}
              border={"2px solid"} borderRadius={"20px"}
              padding={"30px"}
              ml={{base:'20px',md:"120px"}}
              > 

              <Box>
                <Center 
                // color={" #9F7AEA"}
                fontSize={"x-large"}
                fontWeight={"bolder"}
                
                >

                <h1>Log In</h1>

                </Center>

              </Box>
              <Box bgColor={" #9F7AEA"} 
              h={"10px"}
              w={"60px"}
              ml={"90px"}
              mt={"10px"}
              borderRadius={"20px"}
              
              >

              </Box>

                <Box>
                                      <form onSubmit={handleSubmit(onsubmit)}>
                          
                          {/* ---------------Email--------------- */}
                      <Box mt={"10px"}>
                        <FormControl isInvalid={errors.email}>

                        {/* <FormLabel htmlFor='Email'>Email</FormLabel> */}

                        <Input autoComplete="on"
                        type="email" 
                        borderRadius={'10px'}
                        placeholder={"Email"}
                        padding={"10px"}
                        {...register('email',emailValidate)}
                        />

                        <FormErrorMessage>
                        { errors.email && errors.email.message}
                        </FormErrorMessage>

                        </FormControl>
                      </Box>
                      {/* ---------------------------pasword----------------- */}
                      <Box mt={"10px"}>
                      <FormControl isInvalid={errors.password}>

                      {/* <FormLabel>Password</FormLabel> */}

                      <Input autoComplete="on"
                      type="password"
                      borderRadius={'10px'}
                      placeholder={"Password"}
                      padding={"10px"}
                      {...register('password',passwordValidate)}
                      
                      />

                      <FormErrorMessage>
                      { errors.password && errors.password.message}

                      </FormErrorMessage>

                      </FormControl>

                      </Box>

                      <Box w={"full"} mt={"10px"}>
                      <Button 
                      colorScheme='teal' 
                      bg={" #9F7AEA"} 
                      width={"full"}
                      type="Submit"
                      isLoading={isSubmitting}
                      loadingText={"Logging In"}
                      
                      >Log In</Button>
                      </Box>
                      
                      </form>
       
                </Box>
                
          </Box>

          <Box maxWidth={"300px"} maxH={"fit-content"} mt={"10px"}
              border={"2px solid"} borderRadius={"10px"}
              padding={"10px"}
              ml={{base:'20px',md:"120px"}}
              >
              <Text>Do not have an account ? <Link to="/signup" color="#9F7AEA">SignUp</Link></Text>
                
                 </Box>
         
           
    </Container>
    </>

  )
}

export default LoginPage