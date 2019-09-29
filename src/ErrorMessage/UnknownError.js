
import React from 'react';
import ErrorMessageView from './ErrorMessageView';

export default function UnknownError() {
  return (
    <ErrorMessageView>
      <h2>unknown error occurred</h2>
      <h3>please try again</h3>
    </ErrorMessageView>
  );
}
