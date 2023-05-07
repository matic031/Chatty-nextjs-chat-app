import styled from "styled-components"
import {auth} from "./firebase"
import { useAuthState } from'react-firebase-hooks/auth'

function Message({user, message}) {
    const [userLoggedIn] = useAuthState(auth);

    const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;

    return (
        <Container>
            <TypeOfMessage><p>{message}</p></TypeOfMessage>
        </Container>
    );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 8px;
  border-radius: 8px;
  margin: 10px;
  min-width: 40px;
  position: relative;
  text-align: right;
  background-color: white;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2), 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #88d461;
`;

const Receiver = styled(MessageElement)`
  text-align: left;
  background-color: whitesmoke;
`;
