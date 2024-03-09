import { createContext, useEffect, useState } from "react"
import PropType from "prop-types"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../Service/Firebaseconfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
// import { IsUsernameExist } from "./UsernameExist";
import { useNavigate } from "react-router-dom";


export const Usercontext=createContext()


export function Usercontextprovoider({children})
{
    const toast=useToast()

    const currentDate = new Date();

    const [user,setuser]=useState("")
    const [userdata,setuserdata]=useState("")
     
    const navigate=useNavigate()

    async function Signin(email,password)
    {

        try
        {

            await signInWithEmailAndPassword(auth,email,password)

            navigate('/home')

            toast({
              title: 'Logged In',
              description: "SuccesFully Logged In",
              status: 'success',
              duration: 9000,
              position:"top-right",
              isClosable: true,
            })
        }
        catch(err)
        {
            if (err.code == "auth/invalid-credential") 
            {
                toast({
                    title: 'Authentication Error',
                    description: "Invalid Password or Email",
                    status: 'error',
                    duration: 9000,
                    position:"top-right",
                    isClosable: true,
                  })
                   
            }
            else
        {
            {
                toast({
                    title: 'Unknown Error',
                    description: "Please try after sometime",
                    status: 'error',
                    duration: 9000,
                    position:"top-right",
                    isClosable: true,
                  })
                    alert(err)

            console.log(err)
            console.log(err.name)
            console.log(err.code)
            }
        }
        }
        
    }

    async function Signup(uname,email,password)
    {
        
        
            try
            {
                const res= await createUserWithEmailAndPassword(auth, email, password)
    
            await setDoc(doc(db,"Users",res.user.uid),
            {
                id:res.user.uid,
                avatar:"",
                username:uname,
                email:email,
                date:currentDate.toLocaleString(),

                Followers:[],

                VFollow:[],


            });
    
    
            toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 9000,
                position:"top-right",
                isClosable: true,
              })
    
            }
            catch(err)
            {

                // alert(err)
                if(err.code=='auth/email-already-in-use')
                {
                    toast({
                        title: 'Email Error',
                        description: "Email is alredy Registered",
                        status: 'error',
                        duration: 9000,
                        position:"top-right",
                        isClosable: true,
                      })

                }
                
                  else
                  {
                      toast({
                          title: 'Unknown Error',
                          description: "Please try after sometime",
                          status: 'error',
                          duration: 9000,
                          position:"top-right",
                          isClosable: true,
                        })
                          alert(err)

                  console.log(err)
                  }
            }

        

        

    }
    function Logout()
    {
        console.log('loggig out')
        return signOut(auth)
    }

    useEffect(()=>
 {
     const unsubscribe=onAuthStateChanged(auth, async (currentUser)=>
     {
         setuser(currentUser);
         const ref=doc(db,"Users",currentUser.uid);
         const docsnap= await getDoc(ref)
         setuserdata(docsnap.data())
        
     })
     return ()=>
     {
         unsubscribe();
     }

 },[])

    return <Usercontext.Provider value={{Signin,Signup,user,userdata,Logout}}>{children}</Usercontext.Provider>
}


Usercontextprovoider.propTypes=
{
    children:PropType.node.isRequired
}