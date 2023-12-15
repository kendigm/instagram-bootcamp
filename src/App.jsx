import React, { useEffect, useState } from "react";
import {ref as fileRef, getDownloadURL} from 'firebase/storage';
import { onChildAdded, push, ref, set, update } from "firebase/database";
import { realTimeDatabase , storage} from "./firebase";
import "./App.css";
import { uploadBytes } from "firebase/storage";

function App() {
  const [messages, setMessages] = useState([]);
  const [messageValue, setMessageValue] = useState("");
  const [fileUrl, setFileUrl] = useState('');
  const [likes, setLikes] = useState(0);


  useEffect(() => {
    const messagesRef = ref(realTimeDatabase, "messages");
    onChildAdded(messagesRef, (data) => {
      setMessages((messages) => [
        ...messages,
        { key: data.key, val: data.val() },
      ]);
    });
  }, []);

  // Note use of array fields syntax to avoid having to manually bind this method to the class
  const writeData = () => {
    const messageListRef = ref(realTimeDatabase, "messages");
    const newMessageRef = push(messageListRef);
    const currentTime = Date.now();

    set(newMessageRef, {
      messageValue: messageValue,
      date: currentTime,
      url: fileUrl,
      likes: likes
    });
  };
  const handleChange = (e) => {
    setMessageValue(e.target.value);
  };
  const handleUpload = (e) => {
    const filesRef = fileRef(storage, e.target.files[0].name);
    const file = e.target.files[0];

    uploadBytes(filesRef, file).then((snapshot) => (getDownloadURL(snapshot.ref))
    ).then(url => {
            setFileUrl(url);
    });
  }

  const handleLike = e => {
    console.log(e.target);
    setLikes(likes+1);
    // update(postRef, {likes: likes})
  }
  // Convert messages in state to message JSX elements to render
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={writeData}>
          <input
            type="text"
            name="message"
            id="message"
            onChange={handleChange}
            value={messageValue}
          />
          <input type="file" name="file" id="file" onChange={handleUpload} />
          <button type="submit">Send</button>
        </form>
        {/* TODO: Add input field and add text input as messages in Firebase */}

        <ol>
          {messages.map((message) => (
            <li key={message.key}>
              {message.val.messageValue +
                " " +
                new Date(message.val.date).toLocaleTimeString() +
                " " }
            
                  
                   <><button type="button" onClick={handleLike}>Like this</button></>
                  
                
            </li>
            // console.log(message)
          ))}
        </ol>
      </header>
    </div>
  );
}

export default App;
