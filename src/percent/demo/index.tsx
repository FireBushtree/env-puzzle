import * as React from 'react';
import {Percent} from 'envd';

const PercentDemo: React.FC = () => {
  return (
    <div
      style={{
        width: 364,
        height: 266,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Percent style={{flex: 1}} title="生活垃圾增长率" value={50} />
    </div>
  );
};

export default PercentDemo;
