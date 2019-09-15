
import React from 'react';
import './Construction.scss';
import config from 'config';

const imageUrl = `${config.assets.domain}/sprout-large-70.jpg`;

export default props => (
  <div className='construction'>
    <img src={imageUrl} />
    <p>this page is under development</p>
    {props.children}
  </div>
);
