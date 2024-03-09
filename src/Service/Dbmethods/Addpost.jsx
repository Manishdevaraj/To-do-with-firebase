import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { db } from "../Firebaseconfig";
import { collection, doc, query, setDoc, where } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

export default function Addpost()
 {
      
    const [isloading,setisloading]=useState()
     
    const id=uuidv4();

    const toast=useToast()

    async function addpost(post)
    {
      setisloading(true);
     try
     {
        await setDoc(doc(db,"Posts",id),
        {
          ...post,
          id,
          date:Date.now(),
        //   cdate:currentDate.toLocaleString(),
        //   likes:[]
        })

  
        toast({
          title: 'Post',
          description: "SuccesFully posted",
          status: 'success',
          duration: 1000,
          position:"top-right",
          isClosable: true,
        })
        setisloading(false)
     }
     catch(err)
     {
        setisloading(false);
        alert(err)
     }

    }

    return {isloading,addpost}
}


import { useCollectionData} from "react-firebase-hooks/firestore";

export  function Onlyuserpost({id})
{

    const postsCollectionRef = collection(db, 'Posts');
  const q = query(postsCollectionRef,where("uid", "==", id));

  // Use the useCollectionData hook to listen to changes in the collection
  const [posts, loading, error] = useCollectionData(q);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return {posts,loading,error}

}

