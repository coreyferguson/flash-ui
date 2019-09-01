
import ReactDOM from 'react-dom';
import React from 'react';
import AWS from 'aws-sdk';
import { CognitoAuth } from 'amazon-cognito-auth-js';

class Root extends React.Component {

  constructor(props) {
    super(props);
    this.uploadFile = this.uploadFile.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Root</h1>
        <a href="/signin">Sign in</a>
        <a href="/signout">Sign out</a>
        <input onChange={this.uploadFile} type='file' name='image' ref='image' />
      </div>
    );
  }

  uploadFile(event) {
    const identityId = AWS.config.credentials.identityId;
    console.log('identityId:', identityId);
    const file = this.refs.image.files[0];
    console.log('file:', file);
    const params = {
      // ACL: 'public-read',
      Body: file,
      Key: `${identityId}/${file.name}`
    };
    return window.s3.putObject(params).promise().catch(err => {
      console.log('error:', err);
    });
  }

}

const container = document.getElementById('container');
ReactDOM.render(<Root/>, container);


const authData = {
  ClientId : '27vjd6rt86mibpl0j0hfsrpqda', // Your client id here
  AppWebDomain : 'auth.overattribution.com',
  TokenScopesArray : [ 'email', 'profile','openid' ],
  RedirectUriSignIn : 'http://localhost:8080/oauth/callback',
  RedirectUriSignOut : 'http://localhost:8080/oauth/signout',
  IdentityProvider : 'Google',
  UserPoolId : 'us-west-2_MRlZ0BZ1Q'
};
const auth = new CognitoAuth(authData);

auth.userhandler = {
  onSuccess: function(result) {
    console.log('Sign in success', result);
    window.location.replace('http://localhost:8080');
  },
  onFailure: function(err) {
    console.log('Error!');
  }
};

const path = window.location.pathname;

console.log('isUserSignedIn', auth.isUserSignedIn());

if (path === '/signin') {
  auth.getSession();
} else if (path === '/oauth/callback') {
  auth.parseCognitoWebResponse(window.location.href);
} else if (path === '/signout') {
  auth.signOut();
} else if (path === '/oauth/signout') {
  window.location.replace('http://localhost:8080');
} else if (auth.isUserSignedIn()) {
  authenticateWithIdentityService();
}

function authenticateWithIdentityService() {
  const session = auth.getSignInUserSession()
  const idToken = session.idToken.jwtToken;
  console.log('idToken:', idToken);

  const region = 'us-west-2';
  const userPoolId = 'us-west-2_MRlZ0BZ1Q';
  const s3Bucket = 'flashcards-media-5bb171aa-3d43-40e3-b158-efb834f171e6';
  AWS.config.region = region;

  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId : 'us-west-2:c8a4ff17-b8d7-4aa2-818b-62b5eb09653b',
    Logins : {
      [`cognito-idp.${region}.amazonaws.com/${userPoolId}`] : idToken
    }
  });

  //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
  AWS.config.credentials.refresh((error) => {
    if (error) {
     console.error(error);
    } else {
      console.log('Successfully logged!');

      window.s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: s3Bucket }
      });

      const params = { Bucket: s3Bucket, Key: 'us-west-2:546696e8-8824-42c5-89f7-e9f8df4b411f/branch-tip-spider.jpg' };
      const url = window.s3.getSignedUrl('getObject', params);
      console.log('The URL is', url);

      const img = document.createElement('img');
      img.src = url;
      document.body.appendChild(img);

    }
  });

}
