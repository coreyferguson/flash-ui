const credentials = {
  refreshPromise: () => Promise.resolve()
};

class CognitoIdentityCredentials {
  constructor() {
    return credentials;
  }
}

class S3 {
  listObjectsV2() {
    return {
      promise: async () => {}
    };
  }
}

class AWS {
  constructor() {
    this.reset();
  }

  reset() {
    this.config = { credentials };
    this.S3 = S3;
    this.CognitoIdentityCredentials = CognitoIdentityCredentials;
  }
}

module.exports = new AWS();