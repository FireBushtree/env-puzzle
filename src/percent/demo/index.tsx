import * as React from 'react';
import {Percent} from 'env-puzzle';

const PercentDemo: React.FC = () => {
  return (
    <div
      style={{
        width: 192,
        height: 140,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Percent style={{flex: 1}} title="生活垃圾增长率" value={100} />
    </div>
  );
};

export default PercentDemo;
