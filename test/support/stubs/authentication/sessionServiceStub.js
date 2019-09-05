
const stub = {
  getCognitoAuth: () => {},
  processCallback: () => Promise.resolve(),
  signin: () => {},
  signout: () => {},
  isUserSignedIn: () => {}
};

export default stub;
