
import sessionService from '../../src/authentication/sessionService';
import config from 'config';
import uuid from 'uuid/v4';

export class MediaService {
  constructor(options) {
    options = options || {};
    this._sessionService = options.sessionService || sessionService;
    this._configureAwsPromise = undefined;
  }

  async upload(file) {
    const id = uuid();
    const name = id + '.jpg';
    const processed_name = id + '_500x300.jpg';
    await this._configureAws();
    const identityId = AWS.config.credentials.identityId;
    const key = `${identityId}/${name}`;
    const params = { Body: file, Key: key };
    await this._getS3().putObject(params).promise();
    return processed_name;
  }

  async getUrl(name) {
    await this._configureAws();
    const identityId = AWS.config.credentials.identityId;
    const params = { Key: `${identityId}/${name}` };
    const url = this._getS3().getSignedUrl('getObject', params);
    return url;
  }

  async _configureAws() {
    if (this._configureAwsPromise) return this._configureAwsPromise;
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
    this._configureAwsPromise = AWS.config.credentials.refreshPromise();
    return this._configureAwsPromise;
  }

  _getS3() {
    return new AWS.S3({
      apiVersion: '2006-03-01',
      region: 'us-west-2',
      params: { Bucket: config.media.s3Bucket }
    });
  }


}

export default new MediaService();
