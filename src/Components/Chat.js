import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../fconfig";
export const Chat = ({ room }) => {
  const docRef = collection(db, "messages");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(docRef, where("room", "==", room), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      console.log(messages);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    try {
      await addDoc(docRef, {
        message: newMessage,
        user: auth.currentUser.displayName,
        createdAt: serverTimestamp(),
        room: room,
        array: [],
      });
    } catch (error) {
      console.log(error);
    }
    setNewMessage("");
  };
  const unsend = async (id) => {
    const deletedoc = doc(db, "messages", id);
    await deleteDoc(deletedoc);
  };
  //   const update = async (id) => {
  //     const docsel = doc(db, "messages", id);
  //     await updateDoc(docsel, {
  //       array: arrayUnion({ age: 20, name: "Fayyaz" }),
  //     });
  //   };
  return (
    <>
      <div style={{ display: "inline-grid" }}>
        {messages.map((doc) => {
          return (
            <div key={doc.id} style={{ display: "flex" }}>
              <p>{doc.user}:</p>
              <p>{doc.message}</p>
              {doc.user === auth.currentUser.displayName && (
                <button onClick={() => unsend(doc.id)}>Unsend</button>
              )}
            </div>
          );
        })}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Send Message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit">Send..</button>
        </form>
      </div>
    </>
  );
};
