
import React from 'react';
import Nav from './Nav';

export default class PageContainer extends React.PureComponent {

  render() {
    return (
      <div>
        <Nav />
        <div className='container'>
          {{...this.props.children}}
        </div>
      </div>
    );
  }

}
