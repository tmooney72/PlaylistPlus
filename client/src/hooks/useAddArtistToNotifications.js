import {app, db} from "../Firebase/firebase";
import { collection, addDoc, setDoc, doc, arrayUnion, updateDoc } from "firebase/firestore"; 

const AddArtistToNotifications = async () => {
    try {
        const customDocId = "randi";
        const artists = 'Lil Baby'
      await updateDoc(doc(db, "user", customDocId), {
        artists: arrayUnion(artists),
        lastloggedint: Date.now()
      });
      console.log("Document written with ID: ",);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

export default AddArtistToNotifications