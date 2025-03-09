import { getAuth, signOut } from "firebase/auth";

const useLogout = async () => {
 localStorage.clear();
 const auth = await getAuth();
 console.log('bob');
signOut(auth).then(() => {
    console.log(localStorage.getItem('user'));
}).catch((error) => {
  // An error happened.
});

}

export default useLogout