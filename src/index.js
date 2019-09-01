
import ReactDOM from 'react-dom';
import React from 'react';
import AWS from 'aws-sdk';
import { CognitoAuth } from 'amazon-cognito-auth-js';

const Root = () => (
  <div>
    <h1>Root</h1>
    <a href="/signin">Sign in</a>
    <a href="/signout">Sign out</a>
  </div>
);

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
  // AdvancedSecurityDataCollectionFlag : '<TODO: boolean value indicating whether you want to enable advanced security data collection>', // e.g. true
  // Storage: '<TODO the storage object>' // OPTIONAL e.g. new CookieStorage(), to use the specified storage provided
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
}
