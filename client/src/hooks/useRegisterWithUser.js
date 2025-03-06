import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../Firebase/firebase"; // Import the initialized Firebase app

const useRegisterWithUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (email, password) => {
    const auth = getAuth(app); // Correctly initialize the auth object
    setLoading(true);
    setError(null); // Reset any previous errors
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User successfully registered:", userCredential.user);
      setLoading(false);
      localStorage.setItem("user", JSON.stringify(userCredential.user)); // Store the user data in local storage
      return userCredential.user; // Return the registered user object
    } catch (error) {
      console.error("Error during registration:", error.code, error.message);
      setLoading(false);
      setError(error.message); // Set the error state to show in the UI
      throw error; // Rethrow the error to handle it in the calling function if necessary
    }
  };

  return { register, loading, error };
};

export default useRegisterWithUser;