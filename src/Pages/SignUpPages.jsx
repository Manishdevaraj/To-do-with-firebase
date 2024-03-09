import { Box, Button, Center, Container, FormControl, FormErrorMessage, Input, useToast} from "@chakra-ui/react"
import { useForm } from 'react-hook-form'
import { emailValidate, passwordValidate, usernameValidate } from "../Components/FormValidation"
import { UseUserContext } from "../Service/Dbmethods/UseUserContext";



function SignUpPages() {

    const {register,handleSubmit,formState: { errors, isSubmitting }}=useForm();

   const toast=useToast()

   const {Signup} =UseUserContext()
    const onsubmit=async(data)=>
    {
        
       try
       {
         await Signup(data.name,data.email,data.password)

        
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

<Container justifyContent={"center"} alignItems={"center"}>
          
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

            <h1>Sign Up</h1>

            </Center>

          </Box>
          {/* -------------uderline--------- */}
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

                    <Box mt={"10px"}>
                      <FormControl >


                      <Input autoComplete="on"
                      type="name" 
                      borderRadius={'10px'}
                      placeholder={"Username"}
                      padding={"10px"}
                      {...register('name',
                      {
                        ...usernameValidate,
                      })}
                      />

                      <FormErrorMessage>
                      {errors.name && errors.name.message}
                      </FormErrorMessage>
                    

                      </FormControl>
                    </Box>

                    
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
                    bg  ={" #9F7AEA"} 
                    width={"full"}
                    type="Submit"
                    isLoading={isSubmitting}
                    loadingText={"Creating..."}
                    
                    // onClick={onsignupclick}
                    >Sign Up</Button>
                    </Box>
                    </form>
    
            </Box>
          
      </Box>

      </Container>



    
    
    </>
  )
}

export default SignUpPages