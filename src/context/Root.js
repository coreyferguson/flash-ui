
import React from 'react';
import Router from './Router';
import ReduxContainer from './ReduxContainer';

export default function Root() {
  return <ReduxContainer><Router /></ReduxContainer>;
}
