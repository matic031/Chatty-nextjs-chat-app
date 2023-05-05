import React from 'react'
import getRecipientEmail from "../utils/getRecipientEmail";
import styled from'styled-components';
import Avatar from '@material-ui/core/Avatar';
import { useAuthState } from'react-firebase-hooks/auth';
import { collection, addDoc, where, query } from "firebase/firestore"; 
import { auth, db } from './firebase';
import { useCollection } from'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';

function Chat({id, users}) {

    const router = useRouter();

    const [user] = useAuthState(auth);
    query(collection(db, "chats"), where('users','array-contains', user.email));
    const [recipientSnapshot] = useCollection(query(collection(db, "users"), where('email', "==", getRecipientEmail(users, user))));

    const enterChat = () => { 
        router.push(`/chat/${id}`);
    }


    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = user ? getRecipientEmail(users, user) : null;


  return (
    <Container onClick ={enterChat}>
        {recipient ? (
            <UserAvatar src={recipient?.photoURL} />
        ) : (
            <UserAvatar>{recipientEmail[0]}</UserAvatar>
        )}
       
        <p>{recipientEmail}</p>
    </Container>
  )
}

export default Chat

const Container = styled.div`
    display:flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    word-break: break-word;

    :hover {
        background-color: #e9eaeb;
    }
`;

const UserAvatar = styled(Avatar)`

    margin: 5px;
    margin-right: 15px;
`;