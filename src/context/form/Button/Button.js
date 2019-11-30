
import React from 'react';
import { Link } from 'react-router-dom';

export default class Button extends React.PureComponent {
  render() {
    const props = {
      ...this.props,
      className: 'button' + (this.props.className ? ` ${this.props.className}` : '')
    };
    return <Link {...props} />;
  }
}
