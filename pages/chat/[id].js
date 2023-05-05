import React from 'react'
import styled from'styled-components'
import Sidebar from '../../components/Sidebar'
import Head from 'next/head'

function Chat() {
  return (
    <Container>
        <Head>
            <title>Chat</title>
        </Head>
        <Sidebar />
        <ChatContainer>

        </ChatContainer>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display:flex;
  `;

  const ChatContainer = styled.div`
     
      
      `;