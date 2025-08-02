import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/config";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [catering, setCatering] = useState([]);
  // sign in with password and mail
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //logging in to user
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // signInWithGoogle
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //logging out
  const logOut = () => {
    return signOut(auth);
  };
  // forgot password
  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // verify email
  const verifyEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };
  // updating info
  const updateProfileInfo = (updatedInfo) => {
    return updateProfile(auth.currentUser, updatedInfo);
  };
  //detecting any change using observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unSubscribe();
    };
  }, []);
  const information = {
    createUser,
    signInWithGoogle,
    user,
    setUser,
    login,
    logOut,
    updateProfileInfo,
    verifyEmail,
    forgotPassword,
    admin,
    setCatering,
    catering,
  };

  // admin control
  useEffect(() => {
    const fetchAdminEmails = async () => {
      try {
        const response = await fetch("https://quick-foods-server.vercel.app/adminEmails");
        const data = await response.json();
        // setEmails(data);
        const isAdmin = data?.some(
          (emailEntry) => emailEntry.email === user?.email
        );
        setAdmin(isAdmin);
      } catch (error) {
        "Error fetching admin emails:", error;
        setAdmin(false);
      }
    };

    fetchAdminEmails();
  }, [user, setAdmin]);
  return (
    <AuthContext.Provider value={information}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
