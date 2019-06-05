
import ReactDOM from 'react-dom';
import React from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';

const oauth = {
  domain: 'auth-api-0c49bda9027b.auth.us-west-2.amazoncognito.com',
  scope: ['email', 'profile', 'openid'],
  redirectSignIn: 'http://localhost:8080/authenticated',
  redirectSignOut: 'http://localhost:8080/signedout',
  responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
};

Auth.configure({
  // // REQUIRED - Amazon Cognito Identity Pool ID
  // identityPoolId: 'us-west-2:3d05d8b3-5c2a-44c5-9371-35706a4d0e24',
  // // REQUIRED - Amazon Cognito Region
  // region: 'us-west-2',
  // OPTIONAL - Amazon Cognito User Pool ID
  userPoolId: 'us-west-2_uGyYSpbdE',
  // OPTIONAL - Amazon Cognito Web Client ID
  userPoolWebClientId: '426nfulfgbruoi1lsm6gicq62e',
  oauth
});

// Amplify.configure({
//     Auth: {
//         // REQUIRED - Amazon Cognito Identity Pool ID
//         identityPoolId: 'us-west-2:3d05d8b3-5c2a-44c5-9371-35706a4d0e24',
//         // REQUIRED - Amazon Cognito Region
//         region: 'us-west-2',
//         // OPTIONAL - Amazon Cognito User Pool ID
//         userPoolId: 'us-west-2_uGyYSpbdE',
//         // OPTIONAL - Amazon Cognito Web Client ID
//         userPoolWebClientId: '426nfulfgbruoi1lsm6gicq62e',
//     }
// });

class Root extends React.Component {

  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          this.setState({ user: data });
          break;
        case "signOut":
          this.setState({ user: null });
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user }))
      .catch(() => console.log("Not signed in"));
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <button onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}>Open Facebook</button>
        <button onClick={() => Auth.federatedSignIn({provider: 'Google'})}>Open Google</button>
        <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>
        {user && <button onClick={() => Auth.signOut()}>Sign Out {user.getUsername()}</button>}
      </div>
    );
  }

}

const container = document.getElementById('container');
ReactDOM.render(<Root/>, container);
