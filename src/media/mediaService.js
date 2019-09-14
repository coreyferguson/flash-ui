
import sessionService from '../../src/authentication/sessionService';
// import AWS from 'aws-sdk';
import config from 'config';

export class MediaService {
  constructor(options) {
    options = options || {};
    this._sessionService = options.sessionService || sessionService;
    this._isAwsConfigured = false;
    this._s3 = undefined;
  }

  async upload(name, file) {
    await this._configureAws();
    const identityId = AWS.config.credentials.identityId;
    const key = `${identityId}/${name}`;
    const params = { Body: file, Key: key };
    return this._s3.putObject(params).promise();
  }

  async getUrl(name) {
    await this._configureAws();
    const identityId = AWS.config.credentials.identityId;
    const params = { Key: `${identityId}/${name}` };
    const url = this._s3.getSignedUrl('getObject', params);
    return url;
  }

  async _configureAws() {
    if (this._isAwsConfigured) return;
    this._isAwsConfigured = true;
    const session = this._sessionService.getSignInUserSession();
    const idToken = session.idToken.jwtToken;
    const region = 'us-west-2';
    AWS.config.region = region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId : config.auth.identityPoolId,
      Logins : {
        [`cognito-idp.${region}.amazonaws.com/${config.auth.userPool.id}`]: idToken
      }
    });
    return AWS.config.credentials.refreshPromise().then(() => {
      this._s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: config.media.s3Bucket }
      });
    });
  }


}

export default new MediaService();
