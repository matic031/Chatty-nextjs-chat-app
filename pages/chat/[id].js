import React from 'react'
import styled from'styled-components'
import Sidebar from '../../components/Sidebar'
import Head from 'next/head'
import ChatScreen from '../../components/ChatScreen'
import { collection, doc, query, orderBy, getDocs, getDoc } from 'firebase/firestore'
import { db, auth } from '@/components/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import getRecipientEmail from '@/utils/getRecipientEmail'
import { Helmet } from 'react-helmet';


function Chat({chat, messages}) {

  const [user] = useAuthState(auth);


  return (
    <Container suppressHydrationWarning={true}>
        
        <Helmet>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Helmet>
        <Sidebar />
        <ChatContainer>
          <ChatScreen chat = {chat} messages={messages}/>
        </ChatContainer>
    </Container>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  const ref = doc(collection(db, "chats"), context.query.id);

const messagesRef = collection(ref, "messages");
const q = query(messagesRef, orderBy("timestamp", "asc"));
const messagesQuerySnapshot = await getDocs(q);

const messages = messagesQuerySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp.toDate().getTime(),
}));


    //PREP the chats
    const chatRes = await getDoc(ref);
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    };
    
    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat
    }
  };

 }


const Container = styled.div`
  display:flex;
  `;

  const ChatContainer = styled.div`
     flex:1;
     overflow:hidden;
     height:100vh;

     ::-webkit-scrollbar {
      display: none;
     }
     -ms-overflow-style: none;
     scrollbar-width:none;
      
      `;