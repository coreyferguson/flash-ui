
import React from 'react';
import PageContainer from '../../../context/PageContainer';
import PracticeController from './PracticeController';

export default function PracticePage(props) {
  return (
    <PageContainer>
      <React.Fragment>
        <h1>practice</h1>
        <PracticeController {...props} />
      </React.Fragment>
    </PageContainer>
  );
}
