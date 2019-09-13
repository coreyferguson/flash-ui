
import React from 'react';
import image from './Construction.jpg';
import './Construction.scss';

export default props => (
  <div className='construction'>
    <img src={image} />
    <p>this page is under development</p>
    {props.children}
  </div>
);
