
const stub = {
  getCognitoAuth: () => {},
  processCallback: () => Promise.resolve(),
  signin: () => Promise.resolve(),
  signout: () => {},
  isUserSignedIn: () => {}
};

export default stub;
