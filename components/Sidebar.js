import React from 'react'
import { Avatar, IconButton, Button} from '@material-ui/core'
import styled from'styled-components'
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from "email-validator";
import { auth, db } from "../pages/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, where, query } from "firebase/firestore"; 
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from './Chat';

function Sidebar() {

  const [user] = useAuthState(auth);
  const userChatRef = query(collection(db, "chats"), where('users','array-contains', user.email));
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = async () => {
    const input = prompt("Please enter an email address of the user you wish to chat with");

    if (!input) return null;

    if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email){

        // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "chats"), {
        users: [user.email, input],
        });

     }

  };

  const chatAlreadyExists = (recipientEmail) => 
    !!chatsSnapshot?.docs.find(
      (chat) =>
       chat.data().users.find((user) => user === recipientEmail)?.length > 0
       
       );
  


  return (
    <Container>
        <Header>
            <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />

            <IconsContainer>
              
            <IconButton>
              <ChatIcon />
            </IconButton>
            
            <IconButton>
               <MoreVertIcon />
            </IconButton>
              
            </IconsContainer>
        </Header>

        <Search>
          <SearchIcon />
          <SearchInput placeholder='Search in chats' />
        </Search>

        <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>



        {/* List of Chats  */}

        {chatsSnapshot?.docs.map(chat => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;

  &&&{
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
  }
  `;

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items:center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
    
    `;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }
`;

const IconsContainer = styled.div``;