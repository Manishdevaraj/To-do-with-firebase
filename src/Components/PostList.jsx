import { Box, Text } from '@chakra-ui/react'
import PropType from "prop-types"
import Posts from './Posts'

function PostList({posts}) 
{

  return (
    <>


  <Box py={4}>
        {posts?.length===0?<Text color={" #9F7AEA"}>No List yet!</Text>:
        posts?.map((post)=><Posts key={post.id} post={post}/>)}

    </Box>
    </>
  )
}
PostList.propTypes=
{
  posts:PropType.any.isRequired
}
export default PostList