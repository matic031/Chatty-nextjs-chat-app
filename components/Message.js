import styled from "styled-components"
import {auth} from "./firebase"
import { useAuthState } from'react-firebase-hooks/auth'
import moment from "moment"
import { serverTimestamp } from "firebase/firestore"

function Message({user, message}) {
    const [userLoggedIn] = useAuthState(auth);

    const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;

    return (
        <Container>
            <TypeOfMessage>{message}
              <Timestamp>{message ? moment(message.timestamp).format('LT') : '...'}</Timestamp>
            </TypeOfMessage>
        </Container>
    );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  position: relative;
  text-align: right;
  background-color: white;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2), 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const Timestamp = styled.span`
  color: gray;
  margin-bottom: -5px;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;


const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #a0e87b;
`;

const Receiver = styled(MessageElement)`
  text-align: left;
  background-color: whitesmoke;
`;