import React from 'react';
import styled from'styled-components';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import { auth, provider } from '../components/firebase';
import { signInWithPopup } from "firebase/auth";
import { FaGoogle } from 'react-icons/fa';



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
            <CustomButton onClick={signIn}>
                <FaGoogle size={25} style={{ marginRight: '0.75em' }} />
                 Sign in with Google
             </CustomButton>
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

const CustomButton = styled.button`
  display: flex;
  align-items: center;
  appearance: none;
  background-color: transparent;
  border: 0.125em solid #1A1A1A;
  border-radius: 0.9375em;
  box-sizing: border-box;
  color: #3B3B3B;
  cursor: pointer;
  font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 3.75em;
  min-width: 0;
  outline: none;
  padding: 1em 2.3em;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: transform;

  &:disabled {
    pointer-events: none;
  }

  &:hover {
    color: #fff;
    background-color: #1A1A1A;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;