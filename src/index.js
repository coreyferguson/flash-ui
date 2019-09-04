
import ReactDOM from 'react-dom';

import Nav from './Nav';

const container = document.getElementById('container');
ReactDOM.render(<Nav/>, container);

// import React from 'react';
// import AWS from 'aws-sdk';
// import { CognitoAuth } from 'amazon-cognito-auth-js';
// import config from 'config';

// class Root extends React.Component {

//   constructor(props) {
//     super(props);
//     this.uploadFile = this.uploadFile.bind(this);
//   }

//   render() {
//     return (
//       <div>
//         <h1>Root</h1>
//         <a href="/signin">Sign in</a>
//         <a href="/signout">Sign out</a>
//         <input onChange={this.uploadFile} type='file' name='image' ref='image' />
//       </div>
//     );
//   }

//   uploadFile(event) {
//     const identityId = AWS.config.credentials.identityId;
//     console.log('identityId:', identityId);
//     const file = this.refs.image.files[0];
//     console.log('file:', file);
//     const key = `${identityId}/${file.name}`;
//     console.log('key:', key);
//     const params = {
//       // ACL: 'public-read',
//       Body: file,
//       Key: key
//     };
//     return window.s3.putObject(params).promise().catch(err => {
//       console.log('error:', err);
//     });
//   }

// }

// const container = document.getElementById('container');
// ReactDOM.render(<Root/>, container);


// const authData = {
//   ClientId: config.auth.userPool.client.id,
//   AppWebDomain: config.auth.userPool.webDomain,
//   TokenScopesArray: [ 'email', 'profile','openid' ],
//   RedirectUriSignIn: config.auth.userPool.client.redirectCallback,
//   RedirectUriSignOut: config.auth.userPool.client.redirectSignout,
//   IdentityProvider: 'Google',
//   UserPoolId: config.auth.userPool.id
// };
// const auth = new CognitoAuth(authData);

// auth.userhandler = {
//   onSuccess: function(result) {
//     console.log('Sign in success', result);
//     window.location.replace('http://localhost:8080');
//   },
//   onFailure: function(err) {
//     console.log('Error!');
//   }
// };

// const path = window.location.pathname;

// console.log('isUserSignedIn', auth.isUserSignedIn());

// if (path === '/signin') {
//   auth.getSession();
// } else if (path === '/oauth/callback') {
//   auth.parseCognitoWebResponse(window.location.href);
// } else if (path === '/signout') {
//   auth.signOut();
// } else if (path === '/oauth/signout') {
//   window.location.replace('http://localhost:8080');
// } else if (auth.isUserSignedIn()) {
//   authenticateWithIdentityService();
// }

// function authenticateWithIdentityService() {
//   const session = auth.getSignInUserSession()
//   const idToken = session.idToken.jwtToken;
//   console.log('idToken:', idToken);

//   const region = 'us-west-2';
//   AWS.config.region = region;

//   AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId : config.auth.identityPoolId,
//     Logins : {
//       [`cognito-idp.${region}.amazonaws.com/${config.auth.userPool.id}`]: idToken
//     }
//   });

//   //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
//   AWS.config.credentials.refresh((error) => {
//     if (error) {
//      console.error(error);
//     } else {
//       console.log('Successfully logged!');

//       window.s3 = new AWS.S3({
//         apiVersion: '2006-03-01',
//         params: { Bucket: config.media.s3Bucket }
//       });

//       const identityId = AWS.config.credentials.identityId;
//       const params = { Bucket: config.media.s3Bucket, Key: `${identityId}/branch-tip-spider.jpg` };
//       const url = window.s3.getSignedUrl('getObject', params);
//       console.log('The URL is', url);

//       const img = document.createElement('img');
//       img.src = url;
//       document.body.appendChild(img);

//     }
//   });

// }
