import React, { useState, useEffect, useRef } from 'react'
import styled from'styled-components'
import { auth,db } from './firebase'
import { useAuthState } from'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import Avatar from "@material-ui/core/Avatar"
import MoreVert from '@mui/icons-material/MoreVert'
import AttachFile from '@mui/icons-material/AttachFile'
import IconButton from '@mui/material/IconButton'
import { collection, where, doc, query, orderBy, setDoc, addDoc, serverTimestamp, useCollection, useCollectionData, getDocs, onSnapshot } from "firebase/firestore"
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import MicIcon from '@mui/icons-material/Mic';
import firebase from "firebase/app";
import Message from "./Message"
import getRecipientEmail from '@/utils/getRecipientEmail'
import SendIcon from '@mui/icons-material/Send';
import TimeAgo from "timeago-react";


function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const router = useRouter();
  const [messagesList, setMessagesList] = useState([]);
  const [recipient, setRecipient] = useState(null);
  const [recipientSnapshot, setRecipientSnapshot] = useState(null);

  const endOfMessagesRef = useRef(null);

  const recipientEmail = getRecipientEmail(chat.users, user);

  useEffect(() => {
    const recipientQuery = query(collection(db, "users"), where("email", "==", recipientEmail));
    const unsubscribe = onSnapshot(recipientQuery, (snapshot) => {
      const recipientData = snapshot.docs.map((doc) => doc.data())[0];
      setRecipient(recipientData);
      setRecipientSnapshot(snapshot);
    });
    return unsubscribe;
  }, [recipientEmail]);

  useEffect(() => {
    const getMessages = async () => {
      const q = query(collection(db, "chats", router.query.id, "messages"), orderBy("timestamp", "asc"));
      const messagesSnapshot = await getDocs(q);
      const messages = messagesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMessagesList(messages);
    };

    getMessages();

    // subscribe to new messages
    const q = query(collection(db, "chats", router.query.id, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMessagesList(messages);
    });

    return unsubscribe;
  }, [router.query.id]);

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  const sendMessage = async (e) => {
    e.preventDefault();

    // UPDATE LAST SEEN
    await setDoc(doc(db, "users", user.uid), {
      lastSeen: serverTimestamp(),
    }, { merge: true });

    // ADD MESSAGE
    await addDoc(collection(db, "chats", router.query.id, "messages"), {
      timestamp: serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
    scrollToBottom();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(e);
    }
  };

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}

        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>Last active: {' '}
            {recipient?.lastSeen.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
            ): "Unavailable"}
            </p>
           ): (
            <p>Loading Last active..</p>
           )
          }
         
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {messagesList.map((message) => (
          <Message
            key={message.id}
            user={message.user}
            message={message.message}
            timestamp={message.timestamp}
          />
        ))}
        <EndOfMessage ref={endOfMessagesRef}/>
      </MessageContainer>

      <InputContainer>
        <InsertEmoticonIcon />
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} // add event listener for "keydown"
        />
        <IconButton disabled={!input} hidden={!input} onClick={sendMessage}>
          <SendIcon />
        </IconButton>
        <MicIcon />
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;


const Container = styled.div``;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  padding: 20px;
  background-color:whitesmoke;
  margin-left: 15px;
  margin-right: 15px;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color:white;
  z-index: 100;
`;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top:0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
  `;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color:gray;
  }

  `;

  const EndOfMessage = styled.div`
    margin-bottom: 50px;
  `;

  const MessageContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    min-height: 90vh;
    
  `;

  const HeaderIcons = styled.div``;