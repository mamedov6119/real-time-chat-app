import React from "react";
import { GoogleAuthProvider, signInWithRedirect, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";

const Welcome = () => {
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    return (
        <main className="welcome">
            <h2>Welcome to React Chat.</h2>
            <p>Sign in with Google to chat with with your fellow React Developers.</p>
            <button className="sign-in" onClick={googleSignIn}>
                Sign In with Google
            </button>
        </main>
    );
};
export default Welcome;