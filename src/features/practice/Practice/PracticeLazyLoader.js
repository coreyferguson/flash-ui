
import React from 'react';
import Interim from '../../../context/Interim';

const PracticePage = React.lazy(() => import(/* webpackChunkName: "PracticePage" */'./PracticePage'));

export default function PracticeLazyLoader() {
  return (
    <React.Suspense fallback={<Interim />}>
      <PracticePage />
    </React.Suspense>
  );
}
