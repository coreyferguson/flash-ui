
import React from 'react';
import PageContainer from '../../../context/PageContainer';
import PracticeController from './PracticeController';

export default function PracticePage(props) {
  return (
    <PageContainer>
      <React.Fragment>
        <PracticeController {...props} />
      </React.Fragment>
    </PageContainer>
  );
}
