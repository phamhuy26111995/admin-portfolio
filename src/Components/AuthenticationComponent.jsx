import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from './recoil/state.js';
import { auth, provider } from '../firebaseConfig';
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';

const AuthenticationComponent = ({ children }) => {
  console.log(children)
  const [user, setUser] = useRecoilState(userState);
console.log(user)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [setUser]);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      setUser(result.user);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div>
      {user ? (
        <>
          {children}
        </>
      ) : (
        <button onClick={signInWithGoogle}>Login</button>
      )}
    </div>
  );
};

export default AuthenticationComponent;
