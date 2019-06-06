
import ReactDOM from 'react-dom';
import React from 'react';
import Amplify, { Auth, Hub, API, Cache, Storage } from 'aws-amplify';
import AWS from 'aws-sdk';

// Initialize the Amazon Cognito credentials provider
// AWS.config.region = 'us-west-2'; // Region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: 'us-west-2:e6ba2dab-dfcb-41a4-9b64-c7af7b2e0daf'
// });

let s3;

const oauth = {
  domain: 'auth-dev.overattribution.com',
  scope: ['email', 'profile', 'openid'],
  redirectSignIn: 'http://localhost:8080/authenticated',
  redirectSignOut: 'http://localhost:8080/signedout',
  responseType: 'code'
};

Auth.configure({
  identityPoolId: 'us-west-2:e6ba2dab-dfcb-41a4-9b64-c7af7b2e0daf',
  region: 'us-west-2',
  userPoolId: 'us-west-2_rqfqNfmNT',
  userPoolWebClientId: '5dos21v2ruke3diup58afaenjq',
  oauth
});

API.configure({
  endpoints: [
    {
      name: "auth_api",
      endpoint: "https://lbjlned1ph.execute-api.us-west-2.amazonaws.com"
    }
  ],
  region: 'us-west-2'
});

// Storage.configure({
//   level: 'private',
//   AWSS3: {
//     bucket: 'flashcards-media-dev-user-images',
//     region: 'us-west-2',
//   }
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
          this.makeApiCall();
          break;
        case "signOut":
          this.setState({ user: null });
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({ user });
        this.makeApiCall();
      })
      .catch(() => {
        console.log("Not signed in")
        this.makeApiCall();
      });

    Auth.currentCredentials().then(credentials => {
      AWS.config.update({
        credentials,
        region: 'us-west-2'
      });
      s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: {
          Bucket: 'flashcards-media-dev-user-images'
        },
        httpOptions: {
          xhrWithCredentials: true
        }
      });
      // AWS.config.credentials = credentials;
      // AWS.config.region = 'us-west-2';
      console.log('credentials:', credentials);
      return Auth.currentSession();
    }).then(session => {
      console.log('session:', session);
      const sub = session.idToken.payload.sub;
      const params = { Key: `users/${sub}/flower1.jpg` };
      const url = s3.getSignedUrl('getObject', params);
      this.setState({ existing: url });
      console.log('The URL is', url);
    });

    // Auth.currentCredentials().then(credentials => {
    //   console.log('current credentials:', credentials);
    //   const params = { Key: `/users/${credentials.identityId}/`};
    //   const url = s3.getSignedUrl('getObject', params);
    //   console.log('The URL is', url);
    // });

    // Storage.get('flower1.jpg', { expires: 60 }).then(response => {
    //   console.log('existing flower: ', response);
    //   this.setState({ existing: response })
    // });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <input onChange={this.uploadFile.bind(this)} type='file' name='image' ref='image' />
        <button onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}>Open Facebook</button>
        <button onClick={() => Auth.federatedSignIn({provider: 'Google'})}>Open Google</button>
        <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>
        {user && <button onClick={() => Auth.signOut()}>Sign Out {user.getUsername()}</button>}
        {this.state.existing && <img src={this.state.existing} />}
      </div>
    );
  }

  makeApiCall() {
    console.log('making api call');
    // const url = 'https://lbjlned1ph.execute-api.us-west-2.amazonaws.com/dev/unauthenticated';
    // const url = 'https://lbjlned1ph.execute-api.us-west-2.amazonaws.com/dev/authenticated';
    // const config = { credentials: 'include' };
    return API.get('auth_api', '/dev/authenticated').then(response => {
      console.log('response:', response);
    });
    // return fetch(url, config).then(response => response.json()).then(body => {
    //   console.log('response body:', body);
    // });
  }

  uploadFile(event) {
    const file = this.refs.image.files[0];
    Auth.currentSession().then(session => {
      const sub = session.idToken.payload.sub;
      var params = {
        Body: file.body,
        Key: `users/${sub}/flower1.jpg`
      };
      s3.putObject(params, function(err, data) {
        debugger;
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
        /*
        data = {
         ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"",
         ServerSideEncryption: "AES256",
         VersionId: "Ri.vC6qVlA4dEnjgRV4ZHsHoFIjqEMNt"
        }
        */
      });
    });

    // console.log('upload file', event);
    // const file = this.refs.image.files[0];
    // console.log('file:', file);
    // return Storage.put(file.name, file).then(res => {
    //   console.log('successfully uploaded flower', res);
    // });
  }

}

const container = document.getElementById('container');
ReactDOM.render(<Root/>, container);
