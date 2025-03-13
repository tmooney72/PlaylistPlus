import {app, db} from "../Firebase/firebase";
import { collection, addDoc, setDoc, doc, arrayUnion, updateDoc, getDoc } from "firebase/firestore";
import useAuthStore from "@/store/authStore"; 

const useAddArtistToNotifications = async (artist, id, user) => {
  console.log(user)
    try {
        const customDocId = user.uid;
        const artists = artist;
        const userDoc = doc(db, "user", customDocId);
        const userDocRef = await getDoc(userDoc);
        if (!userDocRef.exists()) {
          await setDoc(userDoc, {
            artists: arrayUnion(artist),
            lastloggedint: Date.now(),
            email: user.email
          })
        }
      await updateDoc(doc(db, "user", customDocId), {
        artists: arrayUnion(artists),
        lastloggedint: Date.now(),
        email: user.email
      });
      const artistRef = doc(db, 'artists', id);
      const artistDoc = await getDoc(artistRef);
      if (!artistDoc.exists()) {
        await setDoc(artistRef, {
          name: artist
        })
      } else {
        await updateDoc(artistRef, {
          name: artist
        })
      }
      console.log("Document written with ID: ",);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

export default useAddArtistToNotifications