import { Container } from "@chakra-ui/react"
import PostList from "../Components/PostList"
import { Onlyuserpost } from "../Service/Dbmethods/Addpost"
import { UseUserContext } from "../Service/Dbmethods/UseUserContext"
import Createlist from "../Components/Createlist"

function HomePage() {
     
    const {user}=UseUserContext()
      
    if(!user) return null;
    const {posts,loading,error}=Onlyuserpost({id:user?.uid})
     
    if(loading)return <div>Loading.....</div>
    if(error)throw error

  return (
    <>

        

   <Container maxW={"container.lg"} mt={"10px"}>


      <Createlist/>


      <PostList posts={posts}/>





    
   </Container>
    
    
    
    
    </>
  )
}

export default HomePage