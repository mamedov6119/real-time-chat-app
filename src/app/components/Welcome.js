import React from "react";
import { GoogleAuthProvider, signInWithRedirect, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

const Welcome = () => {
    const githubSignIn = () => {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider);
    };

    const githubSignOut = () => {
        auth.signOut();
    };

    return (
        <main className="welcome">
            <h2>Welcome to React Chat.</h2>
            <p>Sign in with GitHub to chat.</p>
            <button className="sign-in" onClick={githubSignIn}>
                Sign In with GitHub
            </button>
        </main>
    );
};
export default Welcome;