import React from 'react';
import {ToMap} from 'env-puzzle';

const ToMapDemo: React.FC = () => {
  return (
    <ToMap
      value={{lng: 120.591693, lat: 31.304737}}
      onChange={(point) => {
        console.log(point);
      }}
    />
  );
};

export default ToMapDemo;
