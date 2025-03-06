import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../Firebase/firebase"; // Import the initialized Firebase app

const useSignInWithUser = () => {
  const [loadingUser, setLoading] = useState(false);
  const [errorUser, setError] = useState(null);

  const loginUser = async (email, password) => {
    const auth = getAuth(app); // Correctly initialize the auth object
    setLoading(true);
    setError(null); // Reset any previous errors
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User successfully logged in:", userCredential.user);
      setLoading(false);
      localStorage.setItem("user", JSON.stringify(userCredential.user)); // Store the user data in local storage
      return userCredential.user; // Return the registered user object
    } catch (error) {
      console.error("Error during login:", error.code, error.message);
      setLoading(false);
      setError(error.message); // Set the error state to show in the UI
      throw error; // Rethrow the error to handle it in the calling function if necessary
    }
  };

  return { loginUser, loadingUser, errorUser };
};

export default useSignInWithUser;