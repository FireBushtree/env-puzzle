import React from 'react';
import {ToMap} from 'env-puzzle';

const ToMapDemo: React.FC = () => {
  return (
    <ToMap
      onChange={(point) => {
        console.log(point);
      }}
    />
  );
};

export default ToMapDemo;
