import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebaseconfig";


export async function deleteDocument(documentId) {
    try {
        // Construct a reference to the document to be deleted
        const documentRef = doc(db, "Posts", documentId); // Replace "collectionName" with the name of your collection
  
        // Delete the document
        await deleteDoc(documentRef);
        console.log("Document successfully deleted!");
        
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
  }

