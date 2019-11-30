
import React from 'react';
import logger from '../logger';

export default class ErrorBoundary extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = { error: undefined, errorInfo: undefined };
    this._logger = props.logger || logger;
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error: error, errorInfo: errorInfo });
    this._logger.error('unknown error', { error, errorInfo });
  }

  render() {
    return this.showNormalState() || this.showErrorState();
  }

  showNormalState() {
    if (this.state.error) return;
    return this.props.children;
  }

  showErrorState() {
    if (!this.state.error) return;
    return (
      <div>
        <nav className='flash-menu'>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">Flash</a>
          </div>
        </nav>

        <div className='container'>
          <div className='row'>
            <h1>Unknown error</h1>
            <blockquote>{this.state.error.message}</blockquote>
            <a href='/'>Return home</a>
          </div>
        </div>
      </div>
    );
  }

}
