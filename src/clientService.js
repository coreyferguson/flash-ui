
export class ClientService {

  constructor(options) {
    options = options || {};
    this._window = options.window || window;
  }

  getUrl() {
    return this._window.location.href;
  }

  navigate(path) {
    this._window.location.href = '/';
  }

}

export default new ClientService();
