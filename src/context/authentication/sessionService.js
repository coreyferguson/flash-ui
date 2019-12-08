
import config from 'appConfig';
import { CognitoAuth } from 'amazon-cognito-auth-js';

export class SessionService {

  constructor() {
    this._auth = undefined;
  }

  getCognitoAuth() {
    if (this._auth) return this._auth;
    const authData = {
      ClientId: config.auth.userPool.client.id,
      AppWebDomain: config.auth.userPool.webDomain,
      TokenScopesArray: [ 'email', 'profile','openid' ],
      RedirectUriSignIn: config.auth.userPool.client.redirectCallback,
      RedirectUriSignOut: config.auth.userPool.client.redirectSignout,
      IdentityProvider: 'Google',
      UserPoolId: config.auth.userPool.id
    };
    this._auth = new CognitoAuth(authData);
    return this._auth;
  }

  processCallback(href) {
    const auth = this.getCognitoAuth();
    return new Promise((resolve, reject) => {
      auth.userhandler = {
        onSuccess: function(result) {
          resolve(result);
        },
        onFailure: function(err) {
          reject(err);
        }
      };
      auth.parseCognitoWebResponse(href);
    });
  }

  signin() {
    const auth = this.getCognitoAuth();
    return new Promise((resolve, reject) => {
      auth.userhandler = {
        onSuccess: function(result) {
          resolve(result);
        },
        onFailure: function(err) {
          reject(err);
        }
      };
      auth.getSession();
    });
  }

  signout() {
    this.getCognitoAuth().signOut();
  }

  isUserSignedIn() {
    return this.getCognitoAuth().isUserSignedIn();
  }

  getSignInUserSession() {
    return this.getCognitoAuth().getSignInUserSession();
  }

}

export default new SessionService();
