
import React from 'react';
import Nav from '../Nav';
import './PageContainer.scss';

export default class PageContainer extends React.PureComponent {

  render() {
    return (
      <div>
        <Nav />
        <div className='page-container'>
          {{...this.props.children}}
        </div>
      </div>
    );
  }

}
