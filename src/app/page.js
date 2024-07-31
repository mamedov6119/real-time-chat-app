"use client";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "./components/NavBar";
import Chat from "./components/Chat";
import Welcome from "./components/Welcome";

export default function Home() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <NavBar />
      {!user ? <Welcome /> : <><Chat /></>}
    </div>
  );
}