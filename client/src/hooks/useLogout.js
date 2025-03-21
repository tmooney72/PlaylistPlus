import { getAuth, signOut } from "firebase/auth";

const useLogout = async () => {
  try {
    // Call the backend logout endpoint
    const response = await fetch('https://desirable-emotion-production.up.railway.app/api/logout', {
      method: 'POST',
      credentials: 'include', // Important for sending cookies
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    // Continue with your existing logout logic (Firebase, local state clearing, etc.)
    // ... existing logout code ...

  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
 localStorage.clear();
 const auth = await getAuth();
 console.log('bob');
signOut(auth).then(() => {
    localStorage.clear();
}).catch((error) => {
  // An error happened.
});

}

export default useLogout