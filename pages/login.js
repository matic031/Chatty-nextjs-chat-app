import React from 'react';
import styled from'styled-components';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import { auth, provider } from '../components/firebase';
import { signInWithPopup } from "firebase/auth";


function Login() {

const signIn = () => { 
        signInWithPopup(auth, provider);
    };

  return (
    <Container>
        <Head>
            <title>Login</title>
        </Head>

        <LoginContainer>
            <Logo src = "https://chattyedu.com.br/wp-content/uploads/2022/08/logo-c.png"/>
            <Button onClick={signIn} variant = "outlined">Sign in with Google</Button>
        </LoginContainer>
    </Container>
  )
}

export default Login

const Container = styled.div`
    display: grid;
    place-items:center;
    height: 100vh;
    background-color: whitesmoke;
`;

const LoginContainer = styled.div`
    padding: 100px;
   display: flex;
   flex-direction: column;
   align-items: center;
   background-color: white;
   border-radius: 20px;
   box-shadow: 0px 4px 10px -3px rgba(0,0,0,0.5);
`;

const Logo = styled.img`
    height: 165px;
    width: 328px;
    margin-bottom:40px;
`;