import React from 'react';
import TwitterLogin from 'react-twitter-login';
const TwitterLoginButton = () => {
    const responseTwitter = (response) => {
      console.log(response);
      // Handle the response from Twitter login
    };
  
    return (
        <TwitterLogin
        authCallback={responseTwitter}
        consumerKey="1670996871802761216-nIJ7l2RkedcbcbDrHcgWVYeGXBdsfH"
        consumerSecret="oDIZ2KYpzTIZOoHxZkiEhvoRiS08xbzZkN186s7XJ3fpo"
        callbackUrl="http://localhost:3000" // Replace with your callback URL
      />
    );
  };
  
  export default TwitterLoginButton;
  