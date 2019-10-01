
import mousetrap from 'mousetrap';
import PropTypes from 'prop-types';
import React from 'react';

export default class HotkeyShortcut extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }

  componentDidMount() {
    if (this.props.combination) mousetrap.bind(this.props.combination, () => this.props.callback());
    if (this.props.combinations) {
      for (let combination of this.props.combinations) {
        mousetrap.bind(combination, () => this.props.callback());
      }
    }
  }

  componentWillUnmount() {
    if (this.props.combination) mousetrap.unbind(this.props.combination);
    if (this.props.combinations) {
      for (let combination of this.props.combinations) {
        mousetrap.unbind(combination, () => this.props.callback());
      }
    }
  }

}

HotkeyShortcut.propTypes = {
  combination: PropTypes.string,
  combinations: PropTypes.arrayOf(PropTypes.string),
  callback: PropTypes.func,
  children: PropTypes.element
};
