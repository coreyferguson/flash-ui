
import React from 'react';
import './Construction.scss';
import Image from './Construction.jpg';

export default props => (
  <div className='construction'>
    <img src={Image} />
    <p>this page is under development</p>
    {props.children}
  </div>
);
