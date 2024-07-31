import React, { useState } from "react";
import {auth} from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GithubAuthProvider, GoogleAuthProvider, signInWithRedirect, signInWithPopup } from "firebase/auth";

const NavBar = () => {
    const [user] = useAuthState(auth);
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };
    const signOut = () => {
        auth.signOut();
    };

    const githubSignIn = () => {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider);
    };

    const githubSignOut = () => {
        auth.signOut();
    };

    return (
        <nav className="nav-bar">
            <h1>React Chat</h1>
            {user ? (
                <button onClick={signOut} className="sign-out" type="button">
                    Sign Out
                </button>
            ) : (
                <button className="sign-in" onClick={githubSignIn}> 
                    Sign In with Google
                </button>
            )}
        </nav>
    );
};
export default NavBar;