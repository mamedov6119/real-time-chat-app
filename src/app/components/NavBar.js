import React, { useState } from "react";
import {auth} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";

const NavBar = () => {
    const [user] = useAuthState(auth);
    const githubSignIn = () => {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider);
    };

    const signOut = () => {
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
                    Sign In with GitHub
                </button>
            )}
        </nav>
    );
};
export default NavBar;